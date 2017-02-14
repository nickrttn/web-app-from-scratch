(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _app = require('./modules/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	var app = new _app2.default();
	app.init();
})(); /* eslint-env browser */

},{"./modules/app":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-env browser */

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _sections = require('./sections');

var _sections2 = _interopRequireDefault(_sections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.sections = new _sections2.default(this);
		this.router = new _router2.default(this);
	}

	_createClass(App, [{
		key: 'init',
		value: function init() {
			this.router.init();
		}
	}]);

	return App;
}();

exports.default = App;

},{"./router":3,"./sections":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
	function Router(app) {
		_classCallCheck(this, Router);

		this.app = app;
	}

	_createClass(Router, [{
		key: 'init',
		value: function init() {
			var _this = this;

			// This is executed only once on pageload.
			// It checks if the user already has a hash and navigates them there.
			if (window.location.hash) {
				this.app.sections.toggle(window.location.hash);
			}

			// Bind an event listener to the window object and listen for hashchanges.
			// Route if they occur
			window.addEventListener('hashchange', function () {
				// eslint-disable-line no-undef
				var route = window.location.hash; // eslint-disable-line no-undef
				_this.app.sections.toggle(route);
			});
		}
	}]);

	return Router;
}();

exports.default = Router;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-env browser */

var Sections = function () {
	function Sections(app) {
		_classCallCheck(this, Sections);

		this.app = app;
		this.apikey = 'JrLJKjKw';
		this.sections = Array.from(document.querySelectorAll('nav a')).map(function (link) {
			// eslint-disable-line no-undef
			var route = link.dataset.route;
			var element = document.getElementById(route); // eslint-disable-line no-undef
			if (element.id !== 'home') {
				element.classList.add('visually-hidden');
			}
			return element;
		});
	}

	_createClass(Sections, [{
		key: 'toggle',
		value: function toggle(route) {
			this.sections.forEach(function (section) {
				return route.includes(section.id) ? section.classList.remove('visually-hidden') : section.classList.add('visually-hidden');
			});

			if (route.includes('collection')) {
				this.requestArtwork();
			}
		}
	}, {
		key: 'requestArtwork',
		value: function requestArtwork(artwork) {
			var _this = this;

			var request = artwork ? 'https://www.rijksmuseum.nl/api/en/collection/' + artwork + '?key=' + this.apikey + '&format=json' : 'https://www.rijksmuseum.nl/api/en/collection?key=' + this.apikey + '&format=json&ps=50';
			fetch(request).then(function (response) {
				return response.json();
			}).then(function (result) {
				return _this.renderCollection(result.artObjects);
			});
		}
	}, {
		key: 'renderCollection',
		value: function renderCollection(collection) {
			console.log(collection);
			var section = this.sections.find(function (section) {
				return section.id === 'collection';
			});
			section.innerHTML += collection.reduce(function (allArt, artwork) {
				return allArt + ('\n\t\t\t\t<article>\n\t\t\t\t\t<img src="' + artwork.headerImage.url + '" alt="' + artwork.longTitle + '" />\n\t\t\t\t</article>\n\t\t\t');
			}, '');
		}
	}]);

	return Sections;
}();

// <h2>${artwork.title}</h2>

exports.default = Sections;

},{}]},{},[1])
//# sourceMappingURL=bundle.js.map
