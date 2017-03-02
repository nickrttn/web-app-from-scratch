# Web App from Scratch: Rijksmuseum

This web app exists to explore loads and loads of the Rijksmuseums' art fast. It has a minimal interface and allows you to find things you like visually. Check it out at: [webappfromscratch.surge.sh](http://webappfromscratch.surge.sh/).

## Features

This application is:

- Modular with ES2015 classes (converted to ES5 with Babel until browser support matures).
- Using the Fetch API for API requests.
- Using a Web Worker for requesting and blobbing images.
- Infinitely side-scrolling.
- Using ES6 string templating instead of a templating engine.
- Using only 2 external libraries, a router and lodash.
- Using static ES6 classes for things that do not need an instance, like a renderer.
-

## Wishlist

- Better performance.
- More filters and sorting (not hard to implement, just takes time).
- Nicer design for the detail page.
- Service worker for API request caching.

## Sources

- [Rijksmuseum API](https://rijksmuseum.github.io)
- [MDN](https://developer.mozilla.org/)
- [Stack Overflow](https://stackoverflow.com)
- Fronteers #js (for a little help on nested Promises combined w/ Web Workers, thanks guys!)

## This repo uses

- [XO by Sindre Sorhus](https://github.com/sindresorhus/xo) XO is a wrapper around ESLint, which makes the console output prettier and defines a set of default linting rules. It's used in combination with [sindresorhus/sublimelinter-contrib-xo](https://github.com/sindresorhus/sublimelinter-contrib-xo), which integrates XO into Sublime Text.
- [Surge](https://surge.sh) Surge is a simple CLI deployment tool for static websites.
- [riot-route](https://github.com/riot/route) A callback-based router.
- [lodash](https://lodash.com/) A utility functions library.

Surge is a tool designed to easily deploy static websites.

## License

MIT &copy; [Nick Rutten](https://twitter.com/nickrttn)
