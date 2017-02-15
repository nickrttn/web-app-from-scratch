/* eslint-env browser */

class Collection {
	constructor(app) {
		this.app = app;
		this.apikey = 'JrLJKjKw';
		this.collectionPresent = false;
	}

	requestArtwork(artwork) {
		if (!artwork && this.collectionPresent) {
			return;
		}

		const request = artwork ? `https://www.rijksmuseum.nl/api/en/collection/${artwork}?key=${this.apikey}&format=json` : `https://www.rijksmuseum.nl/api/en/collection?key=${this.apikey}&format=json&ps=20`;

		this.app.request.get(request)
			.then(response => response.json())
			.then(result => result.artObjects ? this.renderCollection(result.artObjects) : this.renderArtwork(result.artObject))
			.catch(err => this.app.handleError(err));
	}

	renderCollection(collection) {
		const section = this.app.sections.sections.find(section => section.id === 'collection');
		section.insertAdjacentHTML('beforeend', collection.reduce((allArt, artwork) => {
			return allArt + `
				<article id="${artwork.objectNumber}">
					<img src="${artwork.headerImage.url}" alt="${artwork.longTitle}" />
					<h3><a href="#collection/${artwork.objectNumber}">${artwork.title}</a></h3>
				</article>
			`;
		}, ''));

		this.collectionPresent = true;
	}

	renderArtwork(artwork) {
		const article = document.querySelector(`#${artwork.objectNumber}`);
		article.insertAdjacentHTML('beforeend', `
			<section class="more-information">
				<p>${artwork.description}</p>
			</section>
		`);
	}
}

export default Collection;
