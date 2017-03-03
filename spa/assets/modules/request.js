/* eslint-env browser */
import Article from './article';
import Render from './render';

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

	/**
	 * [shouldFetchCollection This function is only called when we route to #collection.
	 * It checks if we have fetched API pages beyond the first and won't allow new pages to be fetched if we have.]
	 * @return {[type]} [description]
	 */
	shouldFetchCollection() {
		if (!(this.page > 1)) this.fetchCollection(); // eslint-disable-line curly
	}

	shouldFetchArtwork(artwork) {
		// Did we request this information before?
		const article = document.querySelector(`#articles [data-object="${artwork}"]`);

		if (!Boolean(article) || (Boolean(article) && article.dataset.fetched === 'false')) {
			this.fetchArtwork(artwork, Boolean(article));
		}

		return;
	}

	/**
	 * [fetchCollection fetches and handles API data by sending it on to the collection and article classes.]
	 * @return {[type]} [description]
	 */
	fetchCollection() {
		if (this.fetching) return; // eslint-disable-line curly
		const URL = `${this.baseURL}?key=${this.apikey}&format=json&ps=15&p=${this.page}`;

		this.get(URL)
			.then(response => this.filterCollection(response))
			.then(result => this.app.collection.render(result))
			.then(data => Article.render(this.app.sections.find('articles'), data))
			.then(arr => this.app.filter.add(arr))
			.then(collection => this.fetchImages(collection))
			.then(arr => Article.renderImages(arr, 'collection'))
			.then(() => { this.fetching = false; }) // eslint-disable-line brace-style
			.catch(err => this.app.handleError(err));

		// Next time this function is called, request the next page.
		this.page += 1;
	}

	fetchArtwork(artwork, article) {
		const URL = `${this.baseURL}/${artwork}?key=${this.apikey}&format=json`;

		this.get(URL)
			.then(data => article ? data : Article.render(this.app.sections.find('articles'), data))
			.then(data => Article.append(data))
			.then(data => this.fetchImages(data))
			.then(image => Article.renderImages(image, 'articles'))
			.then(() => { this.fetching = false; }) // eslint-disable-line brace-style
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
		const filteredArtworks = data.artObjects.filter(object => object.hasImage && object.headerImage && object.webImage);

		// Remove any dots from the objectnumber as they mess with id-selectors
		filteredArtworks.forEach(artwork => artwork.objectNumber.replace(/\./g, ''));

		return filteredArtworks;
	}
}

export default Request;
