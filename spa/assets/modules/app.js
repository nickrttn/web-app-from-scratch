/* eslint-env browser */
import Collection from './collection';
import Request from './request';
import Router from './router';
import Sections from './sections';
import Scroll from './scroll';
import Filter from './filter';

class App {
	constructor() {
		this.sections = new Sections(this);
		this.request = new Request(this);
		this.scroll = new Scroll(this);
		this.collection = new Collection(this);
		this.router = new Router(this);
		this.filter = new Filter();
	}

	handleError(error) {
		const body = document.querySelector('body');

		console.error(error);

		body.insertAdjacentHTML('afterbegin', `
			<section class="error">
				<h2>Oh no!</h2>
				<p>Something went slightly amiss. Please try to refresh.</p>
				<p>${error}</p>
			</section>
		`);

		this.router.hasError = true;
	}

	removeError() {
		document.querySelector('.error').remove();
		this.router.hasError = false;
	}
}

export default App;
