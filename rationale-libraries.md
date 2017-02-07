# Pros and cons of JavaScript frameworks and libraries

Using JavaScript frameworks and libraries has its advantages and disadvantages. The pros and cons you might see floating around the web are often very much informed by an author's general opinion about frameworks. In the Dutch front-enders community a general dislike of JavaScript frameworks seems to exist. Growing up as a front-end designer in a community like that, it is hard to be *and stay* unbiased towards one side or the other.

While frameworks might not be everyone's cup of tea, they do form and drive the paradigms behind current and new JavaScript and browser specs. As such, it is important to recognize at least the general contributions a library/framework can bring to future browser specs. For instance, React, whether you love it or hate it, has helped our fields' understanding of component-based working and developer ergonomics. Libraries like jQuery and Underscore.js, while deprecated in most daily practices, have driven the recognition of the need for browser vendors and the W3C to add support for many new methods in native JS language features, like `Array.reduce()` and `Object.assign()`, in ES2015. Not the technology but its paradigms (*why* it works how it works), might be beneficial to the spec in years to come. Other frameworks and libraries may have contributed in similar ways.

Discounting that long-run beneficial effect of frameworks and looking at the more relevant pros and cons for picking one (or not), I came up with the following list.

## Advantages

- **Efficiency** Most frameworks and libraries, when learned, help a developer to write code much faster, because pre-written functions for often repeated tasks exist. Some frameworks add on a standard way to structure your application or components, further increasing the speed and ease at which they can be built and iterated upon.
- **Security** Frameworks and libraries often have thousands of users. Each and every one of those users is a pair of eyes that looks at the code used in the framework. Together, given time, they will often find the most egregious security errors or vulnerabilities in the framework. If you are lucky, even some of the more arcane ones.
- **Cost** Most popular frameworks are free as well as open-source. With the added efficiency noted above this can result in a reduction of cost for both agency and client.
- **Support** As libraries/frameworks have thousands of users, they also have a huge community that is there for you to ask questions. Chances are, someone's had your problem before and knows exactly how to fix it. They might even have already published a package for it on npm. Most decent frameworks also have thorough documentation where you can find at least the API for the library and often tutorials and rationale.

## Disadvantages

- **You learn the framework** This is the most important con. When you have worked with a framework for a couple of years, you might find it very hard to unlearn the practices you've worked so hard to learn when something new comes around. When your company suddenly scales very fast and you need to adapt the framework to be able to handle that, you won't know the language on which it's been built. You just know the framework.
- **Limitation** It is often hard to modify the way a framework works. Doing so requires you to update your monkey patch for each new version of the framework and will cost significant manpower.
- **Code is public** Frameworks/libraries are available to everyone, also people who mean harm. They might study the code and find vulnerabilities they can use to steal your users' or your data.
- **Portability** A lot of community effort is put into writing modules for frameworks that might not be around in a couple of years, without thinking to abstract the functionality into plain JavaScript modules.
- **Page load speeds** Adding a framework/library means a defacto increase of asset load times, while potentially blocking the first meaningful paint.

I think the most important argument here is

> You learn the framework, not the language

Learning a single framework might make you a very fast and efficient developer. In that one framework. It will not help you in the long run. If anything, the web has proven it can iterate fast and brutally. Frameworks die or never take off and you will be stuck with it. It also reduces your ability to reason about the language and its features in general. It abstracts hard things away from you. Knowing these things will make you a better developer. They are also scary, at the start. Deal with it.

### Sources

- [1<sup>st</sup> webdesigner](http://1stwebdesigner.com/web-frameworks/)
- [Why I write plain JavaScript modules](https://ponyfoo.com/articles/why-i-write-plain-javascript-modules)
- [The Progressive Web](https://ponyfoo.com/articles/progressive-web)
-
