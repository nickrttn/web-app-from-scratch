/* eslint-env browser */
import { debounce } from 'lodash'; // eslint-disable-line object-curly-spacing

class Scroll {
	constructor() {
		this.listen = this.listen.bind(this);
		this.trigger = debounce(this.trigger.bind(this), 250, {
			leading: false, trailing: true, maxWait: 250
		});
	}

	listen(element, callback, bounds, offset = 0) {
		element.addEventListener('wheel', () => {
			this.trigger(callback, element.getBoundingClientRect(), offset);
		}, {passive: true});
	}

	trigger(callback, bounds, offset) {
		if (bounds.bottom - window.innerWidth <= offset) {
			callback();
		}
	}
}

export default Scroll;
