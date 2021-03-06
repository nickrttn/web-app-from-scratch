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

## Object Model

This model shows the relation between classes in the application.

![Object Model](https://github.com/nickrttn/web-app-from-scratch/raw/master/spa/object-model.png)

## Control Flows

These flowcharts show the call stack that occurs when a user routes to certain pages.

### Route `/`

This is the root route. Navigating to it instantiates the application.

![Root route](https://github.com/nickrttn/web-app-from-scratch/raw/master/spa/root.png)

### Route `/#collection`

This is the collection route. Navigating to it first fetches 15 pieces of artwork from the Rijksmuseum API and then attaches a scroll handler to the `#collection` element to be able to fetch more.

![Collection route](https://github.com/nickrttn/web-app-from-scratch/raw/master/spa/collection.png)

### Route `/#collection/{artwork}`

This is the collection route. Navigating to it either fetches the entire article or only additional content and the image from the Rijksmuseum API, depending on whether the article was already fetched.

![Detail route](https://github.com/nickrttn/web-app-from-scratch/raw/master/spa/detail.png)

## Wishlist

- Better performance.
- Search by title.
- Filters that work concurrently.
- Sorting by year (this is a hard one as the year of production is only in detail page API requests).
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
