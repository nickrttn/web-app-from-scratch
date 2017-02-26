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
		if (this.hasError) {
			this.app.removeError();
		}

		if (route === 'collection') {
			this.app.collection.requestArtwork();
		}

		if (artwork) {
			this.app.collection.requestArtwork(artwork);
			return;
		}

		this.app.sections.toggle(route);
	}
}

export default Router;
