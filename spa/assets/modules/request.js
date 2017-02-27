/* eslint-env browser */

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

	fetchCollection() {
		const URL = `${this.baseURL}?key=${this.apikey}&format=json&ps=10&p=${this.page}`;

		this.get(URL)
			.then(data => {
				this.app.collection.createCollectionNodes(data);
				this.fetching = false;
				return data;
			})
			.then(data => this.fetchImages(data))
			.catch(err => this.app.handleError(err));

		// Next time this function is called, request the next page.
		this.page += 1;
	}

	fetchImages(data) {
		const collection = data.artObjects.filter(object => object.hasImage);

		console.log(collection);

		// Pass the collection data on to the web worker
		this.worker.postMessage(collection);

		// Listen for a message event from the worker and pass it on to the Collection class
		this.worker.onmessage = function(event) { // eslint-disable-line space-before-function-paren
			this.app.collection.renderImage(event.data);
		}.bind(this);
	}

	shouldFetchArtwork(artwork) {
		// Did we request this information before?
		const moreInformation = document.querySelector(`#${artwork} .more-information`);
		if (moreInformation) {
			this.app.collection.closeMoreInformation();
			moreInformation.style.display = 'block';
			return;
		}

		this.fetchArtwork(artwork);
	}

	fetchArtwork(artwork) {
		// Did we request this information before?
		const article = document.querySelector(`[data-object="${artwork.objectNumber}"]`);
		if (article) {
			this.closeMoreInformation();
			article.classList.remove = 'visually-hidden';
			return;
		}

		const URL = `${this.baseURL}/${artwork}?key=${this.apikey}&format=json`;
		this.get(URL)
			.then(data => this.app.collection.createArtworkNode(data))
			.catch(err => this.app.handleError(err));
	}
}

export default Request;
