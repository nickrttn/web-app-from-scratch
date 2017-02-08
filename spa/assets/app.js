'use strict';

class Routes {
	constructor(app) {
		this.app = app;
	}

	init() {
		// Bind an event listener to the window object and listen for hashchanges.
		// Route if they occur
		window.addEventListener('hashchange', () => { // eslint-disable-line no-undef
			const route = window.location.hash; // eslint-disable-line no-undef
			this.app.sections.toggle(route);
		});

		// This is executed only once on pageload.
		// It checks if the user already has a hash and navigates them there.
		if (window.location.hash) {
			this.app.sections.toggle(window.location.hash);
		}
	}
}

class Sections {
	constructor(app) {
		this.app = app;
		this.sections = Array.from(document.querySelectorAll('nav a')).map(link => { // eslint-disable-line no-undef
			const route = link.dataset.route;
			const element = document.getElementById(route); // eslint-disable-line no-undef
			if (element.id !== 'start') {
				element.classList.toggle('visually-hidden');
			}
			return element;
		});
	}

	toggle(route) {
		this.sections.forEach(section => {
			if (route.includes(section.id)) {
				section.classList.remove('visually-hidden');
			} else {
				section.classList.add('visually-hidden');
			}
		});
	}
}

class App {
	constructor() {
		this.sections = new Sections(this);
		this.routes = new Routes(this);
	}

	init() {
		this.routes.init();
	}
}

(() => {
	const app = new App();
	app.init();
})();
