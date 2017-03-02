/* eslint-env browser */
class Sections {
	constructor(app) {
		this.app = app;
		this.sections = Array.from(document.querySelectorAll('nav a')).map(link => {
			const route = link.dataset.route;
			const element = document.getElementById(route);
			if (element.id !== 'home') {
				element.classList.add('visually-hidden');
			}
			return element;
		});

		// The articles section is not in the navigation but I need it in the sections Array regardlessly.
		this.sections.push(document.querySelector('#articles'));
	}

	find(id) {
		return this.sections.find(section => section.id === id);
	}

	toggle(route, artwork) {
		if (!route) return; // eslint-disable-line curly

		if (artwork) {
			this.toggleArtwork(artwork);
			return;
		}

		this.toggleSection(route);
	}

	toggleSection(route) {
		this.sections.forEach(section => route.includes(section.id) ?
			section.classList.remove('visually-hidden') :
			section.classList.add('visually-hidden'));
	}

	toggleArtwork(artwork) {
		const articlesSection = this.sections.find(section => section.id === 'articles');
		const articles = articlesSection.querySelectorAll('article');

		// Toggle the individual article
		articles.forEach(article => article.dataset.object === artwork ?
			article.classList.remove('visually-hidden') :
			article.classList.add('visually-hidden')
		);

		// Toggle the articles section
		this.sections.forEach(section => section.id === 'articles' ?
			section.classList.remove('visually-hidden') :
			section.classList.add('visually-hidden'));
	}
}

export default Sections;
