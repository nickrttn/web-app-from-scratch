(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _app = require('./modules/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	new _app2.default();
})(); /* eslint-env browser */

},{"./modules/app":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-env browser */


var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _sections = require('./sections');

var _sections2 = _interopRequireDefault(_sections);

var _scroll = require('./scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.sections = new _sections2.default();
		this.request = new _request2.default(this);
		this.scroll = new _scroll2.default();
		this.collection = new _collection2.default(this);
		this.router = new _router2.default(this);
		this.filter = new _filter2.default();
	}

	_createClass(App, [{
		key: 'handleError',
		value: function handleError(error) {
			var body = document.querySelector('body');

			console.error(error);

			body.insertAdjacentHTML('afterbegin', '\n\t\t\t<section class="error">\n\t\t\t\t<h2>Oh no!</h2>\n\t\t\t\t<p>Something went slightly amiss. Please try to refresh.</p>\n\t\t\t\t<p>' + error + '</p>\n\t\t\t</section>\n\t\t');

			this.router.hasError = true;
		}
	}, {
		key: 'removeError',
		value: function removeError() {
			document.querySelector('.error').remove();
			this.router.hasError = false;
		}
	}]);

	return App;
}();

exports.default = App;

},{"./collection":4,"./filter":5,"./request":7,"./router":8,"./scroll":9,"./sections":10}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */


var Article = function (_Render) {
	_inherits(Article, _Render);

	function Article() {
		_classCallCheck(this, Article);

		return _possibleConstructorReturn(this, (Article.__proto__ || Object.getPrototypeOf(Article)).apply(this, arguments));
	}

	_createClass(Article, null, [{
		key: 'render',
		value: function render(element, collection) {
			var art = collection;
			var placeholder = '/assets/images/placeholder.jpg';

			if (Array.isArray(art)) {
				art.forEach(function (artwork) {
					artwork.objectNumber = artwork.objectNumber.replace(/\./g, '');
				});

				var articles = art.filter(function (artwork) {
					return !document.querySelector('[data-object=' + artwork.objectNumber + ']');
				});

				// Insert an article tag after the collection section to render individual artwork in later.
				this.renderTemplate(element, articles.reduce(function (allArt, artwork) {
					var objectNumber = artwork.objectNumber,
					    longTitle = artwork.longTitle,
					    webImage = artwork.webImage,
					    title = artwork.title,
					    links = artwork.links;

					return allArt + ('<article class="visually-hidden" data-fetched="false" data-object="' + objectNumber + '">\n\t\t\t\t\t\t<a href="#collection" class="close"><span>&times;</span></a>\n\t\t\t\t\t\t<img class="blur" src="' + placeholder + '" alt="' + longTitle + '" data-guid="' + webImage.guid + '" />\n\t\t\t\t\t\t<h2>' + title + '</h2>\n\t\t\t\t\t\t<div class="additional-information">\n\t\t\t\t\t\t\t<p class="external-link"><a href="' + links.web + '">View on the Rijksmuseum website.</a></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t</article>');
				}, ''), 'beforeend');
			} else if (Object.keys(art).find(function (key) {
				return key === 'artObject';
			})) {
				var _art$artObject = art.artObject,
				    objectNumber = _art$artObject.objectNumber,
				    longTitle = _art$artObject.longTitle,
				    webImage = _art$artObject.webImage,
				    title = _art$artObject.title,
				    links = _art$artObject.links;

				console.log(links);
				// Insert an article tag after the collection section to render individual artwork in later.
				this.renderTemplate(element, '\n\t\t\t\t<article data-fetched="false" data-object="' + objectNumber + '">\n\t\t\t\t\t\t<a href="#collection" class="close">&times;</a>\n\t\t\t\t\t\t<img class="blur" src="' + placeholder + '" alt="' + longTitle + '" data-guid="' + webImage.guid + '" />\n\t\t\t\t\t\t<h2>' + title + '</h2>\n\t\t\t\t\t\t<div class="additional-information">\n\t\t\t\t\t\t\t<p class="external-link"><a href="' + links.web + '">View on the Rijksmuseum website.</a></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t</article>', 'beforeend');
			}

			return collection;
		}
	}, {
		key: 'append',
		value: function append(data) {
			var object = data.artObject;
			var page = data.artObjectPage;
			var article = document.querySelector('[data-object="' + object.objectNumber + '"] .additional-information');

			_get(Article.__proto__ || Object.getPrototypeOf(Article), 'renderTemplate', this).call(this, article, '\n\t\t\t\t<p class="meta"><span class="meta-label">Artist</span> <span class="meta-data">' + object.principalOrFirstMaker + '</span></p>\n\t\t\t\t<p class="meta"><span class="meta-label">Year</span> <span class="meta-data">' + object.dating.year + '</span></p>\n\t\t\t\t<p>' + page.plaqueDescription + '</p>\n\t\t\t\t<p>' + (object.label.description || object.description) + '</p>\n\t\t', 'beforeend');

			article.dataset.fetched = 'true';

			return data;
		}
	}]);

	return Article;
}(_render2.default);

exports.default = Article;

},{"./render":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */


var Collection = function (_Render) {
	_inherits(Collection, _Render);

	function Collection(app) {
		_classCallCheck(this, Collection);

		var _this = _possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this));
		// Initiate the parent class


		_this.app = app;
		_this.collectionNode = _this.app.sections.sections.find(function (section) {
			return section.id === 'collection';
		});

		_this.app.scroll.listen(_this.collectionNode, _this.app.request.fetchCollection, window.innerHeight / 2);
		return _this;
	}

	/**
  * [render Renders all of the fetched collection artworks into the collection element at once.]
  * @param  {[Array]} collection [Array of artworks from the Rijksmuseum API]
  * @return {[Array]}            [The unchanged Array of artworks to be used in a chained .then() call.]
  */


	_createClass(Collection, [{
		key: 'render',
		value: function render(collection) {
			var placeholder = '/assets/images/placeholder.jpg';

			// Insert all artworks into the collection section
			Collection.renderTemplate(this.collectionNode, collection.reduce(function (allArt, artwork) {
				var longTitle = artwork.longTitle,
				    principalOrFirstMaker = artwork.principalOrFirstMaker,
				    headerImage = artwork.headerImage,
				    objectNumber = artwork.objectNumber,
				    title = artwork.title;


				return allArt + ('\n\t\t\t\t<article data-artist=' + principalOrFirstMaker.replace(/\s/g, '') + '>\n\t\t\t\t\t<img class="blur" src="' + placeholder + '" alt="' + longTitle + '" data-guid="' + headerImage.guid + '" />\n\t\t\t\t\t<div class="info">\n\t\t\t\t\t\t<p>' + principalOrFirstMaker + '</p>\n\t\t\t\t\t\t<h3>' + title + '</h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<a href="#collection/' + objectNumber + '"></a>\n\t\t\t\t</article>');
			}, ''), 'beforeend');

			return collection;
		}
	}]);

	return Collection;
}(_render2.default);

exports.default = Collection;

},{"./render":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-env browser */


var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function () {
	function Filter() {
		var _this = this;

		_classCallCheck(this, Filter);

		this.select = document.getElementById('maker');
		this.artists = [];
		this.select.addEventListener('change', function (event) {
			return _this.apply(event);
		});
	}

	_createClass(Filter, [{
		key: 'add',
		value: function add(data) {
			// Get the artists from the data
			var artistsToAdd = data.map(function (artwork) {
				return artwork.principalOrFirstMaker;
			});

			// Concat the new artists to the existing array.
			var newArtists = this.artists.concat(artistsToAdd);

			// Filter the artists so they occur only once.
			var uniqueArtists = newArtists.filter(function (artist, index, array) {
				return array.indexOf(artist) === index;
			});

			this.artists = uniqueArtists;

			_render2.default.renderTemplate(this.select, this.artists.reduce(function (list, current) {
				var exists = Boolean(document.querySelector('[value="' + current + '"]'));
				return list + (exists ? '' : '<option value="' + current.replace(/\s/g, '') + '">' + current + '</option>');
			}, ''), 'beforeend');

			return data;
		}
	}, {
		key: 'apply',
		value: function apply(event) {
			var articles = Array.from(document.querySelectorAll('#collection article'));
			articles.forEach(function (article) {
				return article.classList.remove('visually-hidden');
			});

			if (event.target.value === '') return; // eslint-disable-line curly

			var articlesToHide = articles.filter(function (article) {
				return article.dataset.artist !== event.target.value;
			});
			articlesToHide.forEach(function (article) {
				return article.classList.add('visually-hidden');
			});
		}
	}]);

	return Filter;
}();

exports.default = Filter;

},{"./render":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-env browser */

/**
 * Render has both a static and a non-static implementation of the renderTemplate method,
 * because it is used by a static as well as an instantiated class.
 */
var Render = function () {
	function Render() {
		_classCallCheck(this, Render);
	}

	_createClass(Render, null, [{
		key: 'renderTemplate',
		value: function renderTemplate(element, template, insert) {
			element.insertAdjacentHTML(insert, template);
		}
	}, {
		key: 'renderImages',
		value: function renderImages(data, selector) {
			if (Array.isArray(data)) {
				data.forEach(function (object) {
					return renderImage(object);
				});
			} else {
				renderImage(data);
			}

			function renderImage(object) {
				// There are potentially multiple images with the same data-guid.
				var images = document.querySelectorAll('#' + selector + ' [data-guid="' + object.guid + '"]');
				images.forEach(function (image) {
					image.src = object.src;
					image.classList.remove('blur');
				});
			}

			return data;
		}
	}]);

	return Render;
}();

exports.default = Render;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-env browser */


var _article = require('./article');

var _article2 = _interopRequireDefault(_article);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function () {
	function Request(app) {
		_classCallCheck(this, Request);

		this.page = 1;
		this.app = app;
		this.apikey = 'JrLJKjKw';
		this.baseURL = 'https://www.rijksmuseum.nl/api/en/collection';
		this.fetching = false;

		// Create a new Web Worker
		this.worker = new Worker('/assets/image-worker.js');

		this.shouldFetchCollection = this.shouldFetchCollection.bind(this);
		this.fetchCollection = this.fetchCollection.bind(this);
	}

	_createClass(Request, [{
		key: 'get',
		value: function get(url) {
			this.fetching = true;
			return fetch(url).then(function (response) {
				return response.json();
			});
		}

		/**
   * [shouldFetchCollection This function is only called when we route to #collection.
   * It checks if we have fetched API pages beyond the first and won't allow new pages to be fetched if we have.]
   * @return {[type]} [description]
   */

	}, {
		key: 'shouldFetchCollection',
		value: function shouldFetchCollection() {
			if (!(this.page > 1)) this.fetchCollection(); // eslint-disable-line curly
		}
	}, {
		key: 'shouldFetchArtwork',
		value: function shouldFetchArtwork(artwork) {
			// Did we request this information before?
			var article = document.querySelector('#articles [data-object="' + artwork + '"]');

			if (!article) {
				this.fetchArtwork(artwork);
				return;
			}

			if (article.dataset.fetched === 'false') {
				this.fetchArtwork(artwork);
			}

			return;
		}

		/**
   * [fetchCollection fetches and handles API data by sending it on to the collection and article classes.]
   * @return {[type]} [description]
   */

	}, {
		key: 'fetchCollection',
		value: function fetchCollection() {
			var _this = this;

			if (this.fetching) return; // eslint-disable-line curly
			var URL = this.baseURL + '?key=' + this.apikey + '&format=json&ps=15&p=' + this.page;

			this.get(URL).then(function (response) {
				return _this.filterCollection(response);
			}).then(function (result) {
				return _this.app.collection.render(result);
			}).then(function (data) {
				return _article2.default.render(_this.app.sections.find('articles'), data);
			}).then(function (arr) {
				return _this.app.filter.add(arr);
			}).then(function (collection) {
				return _this.fetchImages(collection);
			}).then(function (arr) {
				return _article2.default.renderImages(arr, 'collection');
			}).then(function () {
				_this.fetching = false;
			}) // eslint-disable-line brace-style
			.catch(function (err) {
				return _this.app.handleError(err);
			});

			// Next time this function is called, request the next page.
			this.page += 1;
		}
	}, {
		key: 'fetchArtwork',
		value: function fetchArtwork(artwork) {
			var _this2 = this;

			var article = document.querySelector('#articles [data-object="' + artwork + '"]');
			var URL = this.baseURL + '/' + artwork + '?key=' + this.apikey + '&format=json';

			this.get(URL).then(function (data) {
				return article ? data : _article2.default.render(_this2.app.sections.find('articles'), data);
			}).then(function (data) {
				return _article2.default.append(data);
			}).then(function (data) {
				return _this2.fetchImages(data);
			}).then(function (image) {
				return _article2.default.renderImages(image, 'articles');
			}).then(function () {
				_this2.fetching = false;
			}) // eslint-disable-line brace-style
			.catch(function (err) {
				return _this2.app.handleError(err);
			});
		}
	}, {
		key: 'fetchImages',
		value: function fetchImages(data) {
			var _this3 = this;

			// Pass the collection data on to the web worker
			this.worker.postMessage(data);

			return new Promise(function (resolve) {
				// Listen for a message event from the worker and set blob with its data.
				_this3.worker.onmessage = function (event) {
					resolve(event.data);
				};
			});
		}
	}, {
		key: 'filterCollection',
		value: function filterCollection(data) {
			// Only display objects that have images as well as header images
			var filteredArtworks = data.artObjects.filter(function (object) {
				return object.hasImage && object.headerImage && object.webImage;
			});

			// Remove any dots from the objectnumber as they mess with id-selectors
			filteredArtworks.forEach(function (artwork) {
				return artwork.objectNumber.replace(/\./g, '');
			});

			return filteredArtworks;
		}
	}]);

	return Request;
}();

exports.default = Request;

},{"./article":3,"./render":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-env browser */


var _riotRoute = require('riot-route');

var _riotRoute2 = _interopRequireDefault(_riotRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
	function Router(app) {
		var _this = this;

		_classCallCheck(this, Router);

		this.app = app;
		this.hasError = false;

		(0, _riotRoute2.default)(function (route, artwork) {
			return _this.navigate(route, artwork);
		});
		_riotRoute2.default.start(true);
	}

	_createClass(Router, [{
		key: 'navigate',
		value: function navigate(route, artwork) {
			// remove errors if we previously rendered any
			if (this.hasError) {
				this.app.removeError();
			}

			if (route === 'collection' && !artwork) {
				this.app.request.shouldFetchCollection();
			}

			if (artwork) {
				this.app.sections.toggle('articles', artwork);
				this.app.request.shouldFetchArtwork(artwork);
			}

			this.app.sections.toggle(route, artwork);
		}
	}]);

	return Router;
}();

exports.default = Router;

},{"riot-route":24}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// eslint-disable-line object-curly-spacing

/* eslint-env browser */
var Scroll = function () {
	function Scroll() {
		_classCallCheck(this, Scroll);

		this.listen = this.listen.bind(this);
		this.trigger = (0, _debounce3.default)(this.trigger.bind(this), 250, {
			leading: true, trailing: false, maxWait: 250
		});
	}

	_createClass(Scroll, [{
		key: 'listen',
		value: function listen(element, callback) {
			var _this = this;

			var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			element.addEventListener('wheel', function () {
				_this.trigger(callback, element, offset);
			}, { passive: true });
		}
	}, {
		key: 'trigger',
		value: function trigger(callback, element, offset) {
			// We need to know how far the right side of the #collection is from the right side of the viewport.
			// Calculate by subtracting the scroll position and the window width from the element width.
			var scrollPosition = element.scrollWidth - element.offsetParent.scrollLeft - window.innerWidth;

			if (scrollPosition <= offset) {
				callback();
			}
		}
	}]);

	return Scroll;
}();

exports.default = Scroll;

},{"lodash/debounce":17}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-env browser */
var Sections = function () {
	function Sections() {
		_classCallCheck(this, Sections);

		this.sections = Array.from(document.querySelectorAll('nav a')).map(function (link) {
			var route = link.dataset.route;
			var element = document.getElementById(route);
			if (element.id !== 'home') {
				element.classList.add('visually-hidden');
			}
			return element;
		});

		// The articles section is not in the navigation but I need it in the sections Array regardlessly.
		this.sections.push(document.querySelector('#articles'));
	}

	_createClass(Sections, [{
		key: 'find',
		value: function find(id) {
			return this.sections.find(function (section) {
				return section.id === id;
			});
		}
	}, {
		key: 'toggle',
		value: function toggle(route, artwork) {
			if (!route) return; // eslint-disable-line curly

			if (artwork) {
				this.toggleArtwork(artwork);
				return;
			}

			this.toggleSection(route);
		}
	}, {
		key: 'toggleSection',
		value: function toggleSection(route) {
			this.sections.forEach(function (section) {
				return route.includes(section.id) ? section.classList.remove('visually-hidden') : section.classList.add('visually-hidden');
			});
		}
	}, {
		key: 'toggleArtwork',
		value: function toggleArtwork(artwork) {
			var articlesSection = this.sections.find(function (section) {
				return section.id === 'articles';
			});
			var articles = articlesSection.querySelectorAll('article');

			// Toggle the individual article
			articles.forEach(function (article) {
				return article.dataset.object === artwork ? article.classList.remove('visually-hidden') : article.classList.add('visually-hidden');
			});

			// Toggle the articles section
			this.sections.forEach(function (section) {
				return section.id === 'articles' ? section.classList.remove('visually-hidden') : section.classList.add('visually-hidden');
			});
		}
	}]);

	return Sections;
}();

exports.default = Sections;

},{}],11:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":16}],12:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":11,"./_getRawTag":14,"./_objectToString":15}],13:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],14:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":11}],15:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],16:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":13}],17:[function(require,module,exports){
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":18,"./now":21,"./toNumber":22}],18:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],19:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],20:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":12,"./isObjectLike":19}],21:[function(require,module,exports){
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":16}],22:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":18,"./isSymbol":20}],23:[function(require,module,exports){
;(function(window, undefined) {var observable = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {}

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          (callbacks[event] = callbacks[event] || []).push(fn)
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) callbacks = {}
        else {
          if (fn) {
            var arr = callbacks[event]
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) arr.splice(i--, 1)
            }
          } else delete callbacks[event]
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on)
          fn.apply(el, arguments)
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {

        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i

        for (i = 0; i < arglen; i++) {
          args[i] = arguments[i + 1] // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0)

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args)
        }

        if (callbacks['*'] && event != '*')
          el.trigger.apply(el, ['*', event].concat(args))

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  })

  return el

}
  /* istanbul ignore next */
  // support CommonJS, AMD & browser
  if (typeof exports === 'object')
    module.exports = observable
  else if (typeof define === 'function' && define.amd)
    define(function() { return observable })
  else
    window.observable = observable

})(typeof window != 'undefined' ? window : undefined);
},{}],24:[function(require,module,exports){
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var observable = _interopDefault(require('riot-observable'));

/**
 * Simple client-side router
 * @module riot-route
 */

var RE_ORIGIN = /^.+?\/\/+[^\/]+/;
var EVENT_LISTENER = 'EventListener';
var REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER;
var ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER;
var HAS_ATTRIBUTE = 'hasAttribute';
var POPSTATE = 'popstate';
var HASHCHANGE = 'hashchange';
var TRIGGER = 'trigger';
var MAX_EMIT_STACK_LEVEL = 3;
var win = typeof window != 'undefined' && window;
var doc = typeof document != 'undefined' && document;
var hist = win && history;
var loc = win && (hist.location || win.location);
var prot = Router.prototype;
var clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click';
var central = observable();

var started = false;
var routeFound = false;
var debouncedEmit;
var base;
var current;
var parser;
var secondParser;
var emitStack = [];
var emitStackLevel = 0;

/**
 * Default parser. You can replace it via router.parser method.
 * @param {string} path - current path (normalized)
 * @returns {array} array
 */
function DEFAULT_PARSER(path) {
  return path.split(/[/?#]/)
}

/**
 * Default parser (second). You can replace it via router.parser method.
 * @param {string} path - current path (normalized)
 * @param {string} filter - filter string (normalized)
 * @returns {array} array
 */
function DEFAULT_SECOND_PARSER(path, filter) {
  var f = filter
    .replace(/\?/g, '\\?')
    .replace(/\*/g, '([^/?#]+?)')
    .replace(/\.\./, '.*');
  var re = new RegExp(("^" + f + "$"));
  var args = path.match(re);

  if (args) { return args.slice(1) }
}

/**
 * Simple/cheap debounce implementation
 * @param   {function} fn - callback
 * @param   {number} delay - delay in seconds
 * @returns {function} debounced function
 */
function debounce(fn, delay) {
  var t;
  return function () {
    clearTimeout(t);
    t = setTimeout(fn, delay);
  }
}

/**
 * Set the window listeners to trigger the routes
 * @param {boolean} autoExec - see route.start
 */
function start(autoExec) {
  debouncedEmit = debounce(emit, 1);
  win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit);
  win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
  doc[ADD_EVENT_LISTENER](clickEvent, click);
  if (autoExec) { emit(true); }
}

/**
 * Router class
 */
function Router() {
  this.$ = [];
  observable(this); // make it observable
  central.on('stop', this.s.bind(this));
  central.on('emit', this.e.bind(this));
}

function normalize(path) {
  return path.replace(/^\/|\/$/, '')
}

function isString(str) {
  return typeof str == 'string'
}

/**
 * Get the part after domain name
 * @param {string} href - fullpath
 * @returns {string} path from root
 */
function getPathFromRoot(href) {
  return (href || loc.href).replace(RE_ORIGIN, '')
}

/**
 * Get the part after base
 * @param {string} href - fullpath
 * @returns {string} path from base
 */
function getPathFromBase(href) {
  return base[0] === '#'
    ? (href || loc.href || '').split(base)[1] || ''
    : (loc ? getPathFromRoot(href) : href || '').replace(base, '')
}

function emit(force) {
  // the stack is needed for redirections
  var isRoot = emitStackLevel === 0;
  if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) { return }

  emitStackLevel++;
  emitStack.push(function() {
    var path = getPathFromBase();
    if (force || path !== current) {
      central[TRIGGER]('emit', path);
      current = path;
    }
  });
  if (isRoot) {
    var first;
    while (first = emitStack.shift()) { first(); } // stack increses within this call
    emitStackLevel = 0;
  }
}

function click(e) {
  if (
    e.which !== 1 // not left click
    || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
    || e.defaultPrevented // or default prevented
  ) { return }

  var el = e.target;
  while (el && el.nodeName !== 'A') { el = el.parentNode; }

  if (
    !el || el.nodeName !== 'A' // not A tag
    || el[HAS_ATTRIBUTE]('download') // has download attr
    || !el[HAS_ATTRIBUTE]('href') // has no href attr
    || el.target && el.target !== '_self' // another window or frame
    || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) === -1 // cross origin
  ) { return }

  if (el.href !== loc.href
    && (
      el.href.split('#')[0] === loc.href.split('#')[0] // internal jump
      || base[0] !== '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
      || base[0] === '#' && el.href.split(base)[0] !== loc.href.split(base)[0] // outside of #base
      || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
    )) { return }

  e.preventDefault();
}

/**
 * Go to the path
 * @param {string} path - destination path
 * @param {string} title - page title
 * @param {boolean} shouldReplace - use replaceState or pushState
 * @returns {boolean} - route not found flag
 */
function go(path, title, shouldReplace) {
  // Server-side usage: directly execute handlers for the path
  if (!hist) { return central[TRIGGER]('emit', getPathFromBase(path)) }

  path = base + normalize(path);
  title = title || doc.title;
  // browsers ignores the second parameter `title`
  shouldReplace
    ? hist.replaceState(null, title, path)
    : hist.pushState(null, title, path);
  // so we need to set it manually
  doc.title = title;
  routeFound = false;
  emit();
  return routeFound
}

/**
 * Go to path or set action
 * a single string:                go there
 * two strings:                    go there with setting a title
 * two strings and boolean:        replace history with setting a title
 * a single function:              set an action on the default route
 * a string/RegExp and a function: set an action on the route
 * @param {(string|function)} first - path / action / filter
 * @param {(string|RegExp|function)} second - title / action
 * @param {boolean} third - replace flag
 */
prot.m = function(first, second, third) {
  if (isString(first) && (!second || isString(second))) { go(first, second, third || false); }
  else if (second) { this.r(first, second); }
  else { this.r('@', first); }
};

/**
 * Stop routing
 */
prot.s = function() {
  this.off('*');
  this.$ = [];
};

/**
 * Emit
 * @param {string} path - path
 */
prot.e = function(path) {
  this.$.concat('@').some(function(filter) {
    var args = (filter === '@' ? parser : secondParser)(normalize(path), normalize(filter));
    if (typeof args != 'undefined') {
      this[TRIGGER].apply(null, [filter].concat(args));
      return routeFound = true // exit from loop
    }
  }, this);
};

/**
 * Register route
 * @param {string} filter - filter for matching to url
 * @param {function} action - action to register
 */
prot.r = function(filter, action) {
  if (filter !== '@') {
    filter = '/' + normalize(filter);
    this.$.push(filter);
  }
  this.on(filter, action);
};

var mainRouter = new Router();
var route = mainRouter.m.bind(mainRouter);

/**
 * Create a sub router
 * @returns {function} the method of a new Router object
 */
route.create = function() {
  var newSubRouter = new Router();
  // assign sub-router's main method
  var router = newSubRouter.m.bind(newSubRouter);
  // stop only this sub-router
  router.stop = newSubRouter.s.bind(newSubRouter);
  return router
};

/**
 * Set the base of url
 * @param {(str|RegExp)} arg - a new base or '#' or '#!'
 */
route.base = function(arg) {
  base = arg || '#';
  current = getPathFromBase(); // recalculate current path
};

/** Exec routing right now **/
route.exec = function() {
  emit(true);
};

/**
 * Replace the default router to yours
 * @param {function} fn - your parser function
 * @param {function} fn2 - your secondParser function
 */
route.parser = function(fn, fn2) {
  if (!fn && !fn2) {
    // reset parser for testing...
    parser = DEFAULT_PARSER;
    secondParser = DEFAULT_SECOND_PARSER;
  }
  if (fn) { parser = fn; }
  if (fn2) { secondParser = fn2; }
};

/**
 * Helper function to get url query as an object
 * @returns {object} parsed query
 */
route.query = function() {
  var q = {};
  var href = loc.href || current;
  href.replace(/[?&](.+?)=([^&]*)/g, function(_, k, v) { q[k] = v; });
  return q
};

/** Stop routing **/
route.stop = function () {
  if (started) {
    if (win) {
      win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit);
      win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
      doc[REMOVE_EVENT_LISTENER](clickEvent, click);
    }
    central[TRIGGER]('stop');
    started = false;
  }
};

/**
 * Start routing
 * @param {boolean} autoExec - automatically exec after starting if true
 */
route.start = function (autoExec) {
  if (!started) {
    if (win) {
      if (document.readyState === 'complete') { start(autoExec); }
      // the timeout is needed to solve
      // a weird safari bug https://github.com/riot/route/issues/33
      else { win[ADD_EVENT_LISTENER]('load', function() {
        setTimeout(function() { start(autoExec); }, 1);
      }); }
    }
    started = true;
  }
};

/** Prepare the router **/
route.base();
route.parser();

module.exports = route;

},{"riot-observable":23}]},{},[1])
//# sourceMappingURL=bundle.js.map
