/* eslint-env browser */
import Render from './render';

class Filter {
	constructor() {
		this.menu = document.querySelector('menu');
		this.artists = [];
		this.places = [];
		this.menu.addEventListener('change', event => this.apply(event));
	}

	add(data) {
		this.prepareData(data);

		const filters = {
			maker: this.artists,
			place: this.places
		};

		Object.keys(filters).forEach(key => {
			Render.renderTemplate(this.menu.querySelector(`#${key}`), filters[key].reduce((list, current) => {
				const exists = Boolean(document.querySelector(`[value="${current}"]`));
				return list + (exists ? '' : `<option value="${current.replace(/\s/g, '')}">${current}</option>`);
			}, ''), 'beforeend');
		});

		return data;
	}

	apply(event) {
		const articles = Array.from(document.querySelectorAll('#collection article'));
		articles.forEach(article => article.classList.remove('visually-hidden'));

		if (event.target.value === '') return; // eslint-disable-line curly

		const articlesToHide = articles.filter(article => article.dataset[event.target.id] !== event.target.value);
		articlesToHide.forEach(article => article.classList.add('visually-hidden'));
	}

	prepareData(data) {
		const filters = {
			artists: data.map(artwork => artwork.principalOrFirstMaker),
			places: data.map(artwork => artwork.productionPlaces.length > 0 ? artwork.productionPlaces[0] : 'unknown')
		};

		Object.keys(filters).forEach(key => {
			this[key] = [...this[key], ...filters[key]];
			this[key] = this[key].filter((place, index, array) => array.indexOf(place) === index);
		});
	}
}

export default Filter;
