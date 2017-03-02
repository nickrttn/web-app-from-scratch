/* eslint-env browser */
import Render from './render';

class Article extends Render {
	static render(element, collection) {
		const art = collection;
		const placeholder = '/assets/images/placeholder.jpg';

		if (Array.isArray(art)) {
			art.forEach(artwork => {
				artwork.objectNumber = artwork.objectNumber.replace(/\./g, '');
			});

			const articles = art.filter(artwork => !document.querySelector(`[data-object=${artwork.objectNumber}]`));

			// Insert an article tag after the collection section to render individual artwork in later.
			this.renderTemplate(element, articles.reduce((allArt, artwork) => {
				const {objectNumber, longTitle, webImage, title, links} = artwork;
				return allArt + `<article class="visually-hidden" data-fetched="false" data-object="${objectNumber}">
						<a href="#collection" class="close"><span>&times;</span></a>
						<img class="blur" src="${placeholder}" alt="${longTitle}" data-guid="${webImage.guid}" />
						<h2>${title}</h2>
						<div class="additional-information">
							<p class="external-link"><a href="${links.web}">View on the Rijksmuseum website.</a></p>
						</div>
				</article>`;
			}, ''), 'beforeend');
		} else if (Object.keys(art).find(key => key === 'artObject')) {
			const {objectNumber, longTitle, webImage, title, links} = art.artObject;
			console.log(links);
			// Insert an article tag after the collection section to render individual artwork in later.
			this.renderTemplate(element, `
				<article data-fetched="false" data-object="${objectNumber}">
						<a href="#collection" class="close">&times;</a>
						<img class="blur" src="${placeholder}" alt="${longTitle}" data-guid="${webImage.guid}" />
						<h2>${title}</h2>
						<div class="additional-information">
							<p class="external-link"><a href="${links.web}">View on the Rijksmuseum website.</a></p>
						</div>
				</article>`, 'beforeend');
		}

		return collection;
	}

	static append(data) {
		const object = data.artObject;
		const page = data.artObjectPage;
		const article = document.querySelector(`[data-object="${object.objectNumber}"] .additional-information`);

		super.renderTemplate(article, `
				<p class="meta"><span class="meta-label">Artist</span> <span class="meta-data">${object.principalOrFirstMaker}</span></p>
				<p class="meta"><span class="meta-label">Year</span> <span class="meta-data">${object.dating.year}</span></p>
				<p>${page.plaqueDescription}</p>
				<p>${object.label.description || object.description}</p>
		`, 'beforeend');

		article.dataset.fetched = 'true';

		return data;
	}
}

export default Article;
