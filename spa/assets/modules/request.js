/* eslint-env browser */

class Request {
	get(url) {
		return fetch(url);
	}
}

export default Request;
