/* eslint-env browser */

class Collection {
	constructor(app) {
		this.app = app;
		this.collectionNode = this.app.sections.sections.find(section => section.id === 'collection');

		this.app.scroll.listen(
			this.collectionNode,
			this.app.request.shouldFetchCollection,
			this.collectionNode.getBoundingClientRect(),
			(window.innerHeight / 2)
		);
	}

	render(collection) {
		const placeholder = '/assets/images/placeholder.jpg';

		// Insert all artworks into the collection section
		this.renderTemplate(this.collectionNode, collection.reduce((allArt, artwork) => {
			return allArt + `
				<article>
					<img class="blur" src="${placeholder}" alt="${artwork.longTitle}" data-guid="${artwork.headerImage.guid}" />
					<h3><a href="#collection/${artwork.objectNumber}">${artwork.title}</a></h3>
				</article>`;
		}, ''), 'beforeend');

		return collection;
	}

	renderImages(data) {
		data.forEach(object => {
			// There are potentially multiple images with the same data-guid.
			const images = document.querySelectorAll(`#collection [data-guid="${object.guid}"]`);
			images.forEach(image => {
				image.classList.remove('blur');
				image.src = object.src;
			});
		});
	}

	renderTemplate(element, template, insert) {
		element.insertAdjacentHTML(insert, template);
	}
}

export default Collection;
