/* eslint-env browser */

import Router from './router';
import Sections from './sections';

class App {
	constructor() {
		this.sections = new Sections(this);
		this.router = new Router(this);
	}

	init() {
		this.router.init();
	}
}

export default App;
