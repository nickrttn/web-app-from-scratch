# Pros and cons of single page web applications

## Advantages

- **Less chatty** Meaning it communicates with the server a whole lot less. A well set-up SPA just requests new data when required. All of the assets are already present on the client and much of the data handling like templating is done on the client.
- **Faster page loads** As the SPA only has to request new data, it may be able to render new data to the user much faster.
- **Loosely coupled** Enables you to iterate on your front-end separately, without requiring changes in your data delivery mechanism, whether a 3<sup>rd</sup> party API or a static JSON file.
- **Can be offlined** An SPA can be made available offline through service workers and LocalStorage/IndexedDB. It will not be able to receive new data, but users can work with the data that is already cached.
- **More storytelling potential** You can guide the user through your content on a single page.

## Disadvantages

- **JavaScript** Without JS, your user is lost.
- **Client-side performance** SPA can get rather big, especially when everything is handled on the client. This might negatively impact a clients' performance, certainly on mobile devices.
- **Routing** There are no ‘real’ URLs. The routing is handled in your SPA using JavaScript. This can be solved, but it does add complexity to your application.
- **SEO Sucks** Only recently search engine crawlers have started rendering client-side JavaScript applications and content is often rendered incorrectly.

### Sources

- [Stack Overflow](https://stackoverflow.com/questions/21862054/single-page-application-advantages-and-disadvantages)
- [UX Stack Exchange](https://ux.stackexchange.com/questions/28737/pros-and-cons-of-a-single-page-site-versus-a-multi-page-site)
-
