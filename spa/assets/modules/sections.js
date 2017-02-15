/* eslint-env browser */
class Sections {
	constructor(app) {
		this.app = app;
		this.sections = Array.from(document.querySelectorAll('nav a')).map(link => { // eslint-disable-line no-undef
			const route = link.dataset.route;
			const element = document.getElementById(route); // eslint-disable-line no-undef
			if (element.id !== 'home') {
				element.classList.add('visually-hidden');
			}
			return element;
		});
	}

	toggle(route) {
		this.sections.forEach(section => route.includes(section.id) ?
				section.classList.remove('visually-hidden') :
				section.classList.add('visually-hidden'));
	}
}

export default Sections;
