/* eslint-env browser, worker */
onmessage = event => {
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
};
