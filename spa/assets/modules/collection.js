/* eslint-env browser */
import Render from './render';

class Collection extends Render {
	constructor(app) {
		// Initiate the parent class
		super();

		this.app = app;
		this.collectionNode = this.app.sections.sections.find(section => section.id === 'collection');

		this.app.scroll.listen(
			this.collectionNode,
			this.app.request.fetchCollection,
			(window.innerHeight / 2)
		);
	}

	/**
	 * [render Renders all of the fetched collection artworks into the collection element at once.]
	 * @param  {[Array]} collection [Array of artworks from the Rijksmuseum API]
	 * @return {[Array]}            [The unchanged Array of artworks to be used in a chained .then() call.]
	 */
	render(collection) {
		const placeholder = '/assets/images/placeholder.jpg';

		console.log(collection);

		// Insert all artworks into the collection section
		Collection.renderTemplate(this.collectionNode, collection.reduce((allArt, artwork) => {
			const {longTitle, principalOrFirstMaker, headerImage, objectNumber, title, productionPlaces} = artwork;

			// Don't take multiple production places into account for filtering.
			let place = productionPlaces[0];

			return allArt + `
				<article data-artist=${principalOrFirstMaker.replace(/\s/g, '')} ${place ? `data-place="${place}"` : 'data-place="unknown"'}>
					<img class="blur" src="${placeholder}" alt="${longTitle}" data-guid="${headerImage.guid}" />
					<div class="info">
						<p>${principalOrFirstMaker}</p>
						<h3>${title}</h3>
					</div>
					<a href="#collection/${objectNumber}"></a>
				</article>`;
		}, ''), 'beforeend');

		return collection;
	}
}

export default Collection;
