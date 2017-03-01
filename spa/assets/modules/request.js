/* eslint-env browser */
import Article from './article';

class Request {
	constructor(app) {
		this.page = 1;
		this.app = app;
		this.apikey = 'JrLJKjKw';
		this.baseURL = 'https://www.rijksmuseum.nl/api/en/collection';
		this.fetching = false;

		// Create a new Web Worker
		this.worker = new Worker('/assets/image-worker.js');

		this.shouldFetchCollection = this.shouldFetchCollection.bind(this);
		this.fetchCollection = this.fetchCollection.bind(this);
	}

	get(url) {
		this.fetching = true;
		return fetch(url).then(response => response.json());
	}

	shouldFetchCollection() {
		if (!this.fetching) {
			this.fetchCollection();
		}
	}

	shouldFetchArtwork(artwork) {
		// Did we request this information before?
		const article = document.querySelector(`#articles [data-object="${artwork}"]`);

		if (article && article.dataset.fetched === 'false') {
			this.fetchArtwork(artwork);
			return;
		}

		return;
	}

	fetchCollection() {
		const URL = `${this.baseURL}?key=${this.apikey}&format=json&ps=10&p=${this.page}`;

		this.get(URL)
			.then(response => this.filterCollection(response))
			.then(result => this.app.collection.render(result))
			// .then(data => Article.render(this.app.sections.sections.find(section => section.id === 'articles'), data))
			.then(collection => this.fetchImages(collection))
			.then(arr => this.app.collection.renderImages(arr))
			.then(() => { this.fetching = false; }) // eslint-disable-line brace-style
			.catch(err => this.app.handleError(err));

		// Next time this function is called, request the next page.
		this.page += 1;
	}

	fetchArtwork(artwork) {
		const URL = `${this.baseURL}/${artwork}?key=${this.apikey}&format=json`;
		this.get(URL)
			.then(data => this.fetchImages(data))
			.catch(err => this.app.handleError(err));
	}

	fetchImages(data) {
		// Pass the collection data on to the web worker
		this.worker.postMessage(data);

		return new Promise(resolve => {
			// Listen for a message event from the worker and set blob with its data.
			this.worker.onmessage = event => {
				resolve(event.data);
			};
		});
	}

	filterCollection(data) {
		// Only display objects that have images as well as header images
		return data.artObjects.filter(object => (object.headerImage && object.headerImage.guid) && object.hasImage);
	}
}

export default Request;
