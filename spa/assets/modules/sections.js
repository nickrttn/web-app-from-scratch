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
		this.sections.forEach(section => section.classList.add('visually-hidden'));
		const article = document.querySelector(`[data-object="${artwork}"]`);
		article.classList.remove('visually-hidden');
	}
}

export default Sections;
