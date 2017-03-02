/* eslint-env browser */
import { debounce } from 'lodash'; // eslint-disable-line object-curly-spacing

class Scroll {
	constructor() {
		this.listen = this.listen.bind(this);
		this.trigger = debounce(this.trigger.bind(this), 250, {
			leading: true, trailing: false, maxWait: 250
		});
	}

	listen(element, callback, bounds, offset = 0) {
		element.addEventListener('wheel', () => {
			this.trigger(callback, element, offset);
		}, {passive: true});
	}

	trigger(callback, element, offset) {
		// We need to know how far the right side of the #collection is from the right side of the viewport.
		// Calculate by subtracting the scroll position and the window width from the element width.
		const scrollPosition = element.scrollWidth - element.offsetParent.scrollLeft - window.innerWidth;

		if (scrollPosition <= offset) {
			callback();
		}
	}
}

export default Scroll;
