/* eslint-env browser */
import route from 'riot-route';

class Router {
	constructor(app) {
		this.app = app;
		this.init = this.init.bind(this);
		this.hasError = false;
	}

	init() {
		route((route, artwork) => this.navigate(route, artwork));
		route.start(true);
	}

	navigate(route, artwork) {
		// remove errors if we previously rendered any
		if (this.hasError) {
			this.app.removeError();
		}

		if (route === 'collection' && !artwork) {
			this.app.request.shouldFetchCollection();
		}

		if (route === 'collection' && artwork) {
			this.app.request.shouldFetchArtwork(artwork);
		}

		this.app.sections.toggle(route);
	}
}

export default Router;
