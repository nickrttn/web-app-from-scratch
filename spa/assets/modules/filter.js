/* eslint-env browser */
import Render from './render';

class Filter {
	constructor() {
		this.select = document.getElementById('maker');
		this.artists = [];
		this.select.addEventListener('change', event => this.apply(event));
	}

	add(data) {
		// Get the artists from the data
		const artistsToAdd = data.map(artwork => artwork.principalOrFirstMaker);

		// Concat the new artists to the existing array.
		const newArtists = this.artists.concat(artistsToAdd);

		// Filter the artists so they occur only once.
		const uniqueArtists = newArtists.filter((artist, index, array) => array.indexOf(artist) === index);

		this.artists = uniqueArtists;

		Render.renderTemplate(this.select, this.artists.reduce((list, current) => {
			const exists = Boolean(document.querySelector(`[value="${current}"]`));
			return list + (exists ? '' : `<option value="${current.replace(/\s/g, '')}">${current}</option>`);
		}, ''), 'beforeend');

		return data;
	}

	apply(event) {
		const articles = Array.from(document.querySelectorAll('#collection article'));
		if (event.target.value !== '') {
			articles.forEach(article => console.log(article.dataset));
			const articlesToHide = articles.filter(article => article.dataset.artist !== event.target.value);
			articlesToHide.forEach(article => article.classList.add('visually-hidden'));
			return;
		}

		articles.forEach(article => article.classList.remove('visually-hidden'));
	}
}

export default Filter;
