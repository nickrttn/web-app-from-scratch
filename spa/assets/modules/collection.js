/* eslint-env browser */

class Collection {
	constructor(app) {
		this.app = app;
		this.section = document.querySelector('#collection');

		this.app.scroll.listen(
			this.section,
			this.app.request.shouldFetchCollection,
			this.section.getBoundingClientRect(),
			(window.innerHeight / 2)
		);
	}

	renderCollection(data) {
		const collection = data.artObjects;
		const section = this.app.sections.sections.find(section => section.id === 'collection');
		const placeholder = '/assets/images/placeholder.jpg';

		// This might be the most horrible solution imaginable to missing data.
		// It needs a more defensive fallback that will render always as well
		// as deal with contingencies.
		this.renderTemplate(section, collection.reduce((allArt, artwork) => {
			const allPresent = artwork.objectNumber && artwork.longTitle && artwork.headerImage && artwork.title;
			return allPresent ? allArt + `
				<article data-object="${artwork.objectNumber}">
					<img class="blur" src="${placeholder}" alt="${artwork.longTitle}" data-guid="${artwork.headerImage.guid}" />
					<h3><a href="#collection/${artwork.objectNumber}">${artwork.title}</a></h3>
				</article>
			` : '';
		}, ''));
	}

	renderArtwork(artwork) {
		const object = artwork.artObject;

		// Select the right article
		const article = document.querySelector(`[data-object=${object.objectNumber}]`);

		this.closeMoreInformation();

		// Fall back to the regular description, which might be Dutch
		this.renderTemplate(article, `
			<section class="more-information">
				<p>${object.label.description || object.description}</p>
			</section>
		`);
	}

	renderImage(data) {
		// There are potentially multiple records of a single art piece
		const imagesToReplace = document.querySelectorAll(`[data-guid="${data.guid}"]`);
		imagesToReplace.forEach(image => {
			image.classList.remove('blur');
			image.classList.add('no-blur');
			image.src = data.src;
		});
	}

	renderTemplate(element, template) {
		element.insertAdjacentHTML('beforeend', template);
	}

	closeMoreInformation() {
		// Select all open more information divs and close them
		const open = Array.from(document.querySelectorAll('.more-information'));
		open.forEach(openElement => {
			openElement.style.display = 'none';
		});
	}
}

export default Collection;
