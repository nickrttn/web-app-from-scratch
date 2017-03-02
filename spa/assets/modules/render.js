/* eslint-env browser */

/**
 * Render has both a static and a non-static implementation of the renderTemplate method,
 * because it is used by a static as well as an instantiated class.
 */
class Render {
	static renderTemplate(element, template, insert) {
		element.insertAdjacentHTML(insert, template);
	}

	static renderImages(data, selector) {
		if (Array.isArray(data)) {
			data.forEach(object => renderImage(object));
		} else {
			renderImage(data);
		}

		function renderImage(object) {
			// There are potentially multiple images with the same data-guid.
			const images = document.querySelectorAll(`#${selector} [data-guid="${object.guid}"]`);
			images.forEach(image => {
				image.src = object.src;
				image.classList.remove('blur');
			});
		}

		return data;
	}
}

export default Render;
