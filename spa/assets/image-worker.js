/* eslint-env browser, worker */
onmessage = function (event) {
	const collection = event.data;
	collection.forEach(object => {
		// fetch the image
		fetch(object.headerImage.url)
			.then(response => response.blob())
			.then(blob => postMessage({
				guid: object.headerImage.guid,
				src: URL.createObjectURL(blob)
			}))
			.catch(err => postMessage({
				guid: object.headerImage.guid,
				error: err
			}));
	});
};
