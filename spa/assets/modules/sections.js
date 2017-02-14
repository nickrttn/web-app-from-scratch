/* eslint-env browser */

class Sections {
	constructor(app) {
		this.app = app;
		this.apikey = 'JrLJKjKw';
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

		if (route.includes('collection')) {
			this.requestArtwork();
		}
	}

	requestArtwork(artwork) {
		const request = artwork ? `https://www.rijksmuseum.nl/api/en/collection/${artwork}?key=${this.apikey}&format=json` : `https://www.rijksmuseum.nl/api/en/collection?key=${this.apikey}&format=json&ps=50`;
		fetch(request)
			.then(response => response.json())
			.then(result => this.renderCollection(result.artObjects));
	}

	renderCollection(collection) {
		console.log(collection);
		const section = this.sections.find(section => section.id === 'collection');
		section.innerHTML += collection.reduce((allArt, artwork) => {
			return allArt + `
				<article>
					<img src="${artwork.headerImage.url}" alt="${artwork.longTitle}" />
				</article>
			`;
		}, '');
	}
}

// <h2>${artwork.title}</h2>

export default Sections;
