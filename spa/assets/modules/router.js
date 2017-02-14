class Router {
	constructor(app) {
		this.app = app;
	}

	init() {
		// This is executed only once on pageload.
		// It checks if the user already has a hash and navigates them there.
		if (window.location.hash) {
			this.app.sections.toggle(window.location.hash);
		}

		// Bind an event listener to the window object and listen for hashchanges.
		// Route if they occur
		window.addEventListener('hashchange', () => { // eslint-disable-line no-undef
			const route = window.location.hash; // eslint-disable-line no-undef
			this.app.sections.toggle(route);
		});
	}
}

export default Router;
