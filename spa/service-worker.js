// eslint-env serviceworker
importScripts('assets/lib/sw-toolbox/sw-toolbox.js');

toolbox.precache(['/index.html', '/assets/style.css', '/assets/images/placeholder.jpg']);
toolbox.router.get(/^https:\/\/www.rijksmuseum.nl\/api\/en\//, toolbox.cacheFirst);
toolbox.router.get(/^http:\/\/lh[0-9].ggpht.com\//, toolbox.fastest);
