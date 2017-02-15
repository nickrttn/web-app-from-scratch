/* eslint-env browser */

import Collection from './collection';
import Request from './request';
import Router from './router';
import Sections from './sections';

class App {
	constructor() {
		this.collection = new Collection(this);
		this.sections = new Sections(this);
		this.router = new Router(this);
		this.request = new Request();
	}

	init() {
		this.router.init();
	}

	handleError(error) {
		const body = document.querySelector('body');

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
