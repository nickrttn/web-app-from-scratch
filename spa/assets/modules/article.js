/* eslint-env browser */

class Article {
	static render(element, collection) {
		const placeholder = '/assets/images/placeholder.jpg';

		// Insert an article tag after the collection section to render individual artwork in later.
		this.renderTemplate(element, collection.reduce((allArt, artwork) => {
			return allArt + `<article class="visually-hidden" data-fetched="false" data-object="${artwork.objectNumber}">
					<img class="blur" src="${placeholder}" alt="${artwork.longTitle}" data-guid="${artwork.headerImage.guid}" />
					<h2>${artwork.longTitle}</h2>
					<a href="#collection" class="close"><span>&times;</span> Back to collection</a>
			</article>`;
		}, ''), 'beforeend');

		return collection;
	}

	static replaceImage(data) {
		const image = document.querySelector(`#articles [data-guid="${data.guid}"]`);
		image.classList.remove('blur');
		image.classList.add('no-blur');
		image.src = data.src;
	}

	static renderTemplate(element, template, insert) {
		element.insertAdjacentHTML(insert, template);
	}
}

export default Article;
