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

	toggle(route) {
		if (!route) return;

		this.sections.forEach(section => route.includes(section.id) ?
				section.classList.remove('visually-hidden') :
				section.classList.add('visually-hidden'));
	}
}

export default Sections;
