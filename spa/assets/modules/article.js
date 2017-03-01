/* eslint-env browser */

class Article {
	static render(element, collection) {
		const placeholder = '/assets/images/placeholder.jpg';

		const objects = collection;

		objects.forEach(artwork => {
			artwork.objectNumber = artwork.objectNumber.replace(/\./g, '');
		});

		const articles = objects.filter(artwork => !document.querySelector(`[data-object=${artwork.objectNumber}]`));

		// Insert an article tag after the collection section to render individual artwork in later.
		this.renderTemplate(element, articles.reduce((allArt, artwork) => {
			return allArt + `<article class="visually-hidden" data-fetched="false" data-object="${artwork.objectNumber}">
					<a href="#collection" class="close"><span>&times;</span> Back to collection</a>
					<img class="blur" src="${placeholder}" alt="${artwork.longTitle}" data-guid="${artwork.webImage.guid}" />
					<h2>${artwork.title}</h2>
			</article>`;
		}, ''), 'beforeend');

		return collection;
	}

	static append(data) {
		const object = data.artObject;
		const article = document.querySelector(`[data-object="${object.objectNumber}"]`);

		this.renderTemplate(article, `<p>${object.label.description || object.description}</p>`, 'beforeend');

		article.dataset.fetched = 'true';

		return data;
	}

	static replaceImage(data) {
		const image = document.querySelector(`#articles [data-guid="${data.guid}"]`);
		image.classList.remove('blur');
		image.src = data.src;
	}

	static renderTemplate(element, template, insert) {
		element.insertAdjacentHTML(insert, template);
	}
}

export default Article;
