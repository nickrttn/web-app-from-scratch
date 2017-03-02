/* eslint-env browser, worker */
onmessage = event => {
	if (Array.isArray(event.data)) {
		const collection = event.data;

		const fetches = collection.map(object => new Promise(resolve =>
		fetch(object.headerImage.url)
			.then(response => response.blob())
			.then(blob => ({
				guid: object.headerImage.guid,
				src: URL.createObjectURL(blob)
			}))
			.then(obj => resolve(obj))
		));

		Promise.all(fetches)
			.then(images => postMessage(images));
	} else if (isObject(event.data)) {
		const object = event.data.artObject;

		fetch(object.webImage.url)
			.then(response => response.blob())
			.then(blob => postMessage({
				guid: object.webImage.guid,
				src: URL.createObjectURL(blob)
			}));
	}
};

// https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript#8511350
function isObject(val) {
	return val && typeof val === 'object';
}
