# [ES6-CacheManager](https://github.com/eserozvataf/es6-cachemanager)

[![npm version][npm-image]][npm-url]
[![npm download][download-image]][npm-url]
[![dependencies][dep-image]][dep-url]
[![license][license-image]][license-url]


## What is the ES6-CacheManager?

ES6-CacheManager is a basic cache manager implementation.


## Quick start

Execute `npm install es6-cachemanager` to install es6-cachemanager and its dependencies into your project directory.


## Usage

To cache a function result:

```js
import { cacheManager } from 'es6-cachemanager';

const dateFunc = () => cacheManager.get('cachedDate', () => new Date());

console.log(await dateFunc());
console.log(await dateFunc());
```

Alternatively, to decorate a function with caching layer:
```js
import { cacheManager } from 'es6-cachemanager';

@cacheManager.cached('cachedDateFunc', 200)
function dateFunc() {
    return new Date();
}

console.log(await dateFunc());
console.log(await dateFunc());
```


## Todo List

See [GitHub Projects](https://github.com/eserozvataf/es6-cachemanager/projects) for more.


## Requirements

* node.js (https://nodejs.org/)


## License

Apache 2.0, for further details, please see [LICENSE](LICENSE) file


## Contributing

See [contributors.md](contributors.md)

It is publicly open for any contribution. Bugfixes, new features and extra modules are welcome.

* To contribute to code: Fork the repo, push your changes to your fork, and submit a pull request.
* To report a bug: If something does not work, please report it using [GitHub Issues](https://github.com/eserozvataf/es6-cachemanager/issues).


## To Support

[Visit my patreon profile at patreon.com/eserozvataf](https://www.patreon.com/eserozvataf)


[npm-image]: https://img.shields.io/npm/v/es6-cachemanager.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/es6-cachemanager
[download-image]: https://img.shields.io/npm/dt/es6-cachemanager.svg?style=flat-square
[dep-image]: https://img.shields.io/david/eserozvataf/es6-cachemanager.svg?style=flat-square
[dep-url]: https://github.com/eserozvataf/es6-cachemanager
[license-image]: https://img.shields.io/npm/l/es6-cachemanager.svg?style=flat-square
[license-url]: https://github.com/eserozvataf/es6-cachemanager/blob/master/LICENSE
