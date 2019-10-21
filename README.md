# MailerLite SDK for Node.js

#### **Many thanks to Filipe Oliveira for the API v1 implementation which this fork was created from.**

[![NPM package][nodei-image]][nodei-url]
[![NPM package][npm-image]][npm-url]
[![Travis Build][travis-image]][travis-url]
[![Travis Build][coveralls-image]][coveralls-url]

Node.js wrapper for MailerLite API, supporting versions 1 and 2.

## Usage

Install with npm: `npm install --save mailerlite-mailerlite`.

_Terrible name, I know, but needed to get uniqueness :)_

### Browse your lists (API v1):

```js
var MailerLite = require('mailerlite');
var ML = new MailerLite(apiKey);
ML.Lists.getAll()
  .then(function(data) {
    console.log(data);
  });
```

### Browse your groups ( API v2):

```js
var MailerLite = require('mailerlite');
var ML = new MailerLite(apiKey, 2);
ML.Groups.getAll()
  .then(function(data) {
    console.log(data);
  });
```

Refer to the test cases for more detail.

## Compatibility

All methods will return promises.

## Documentation

* API documentation:
  * [v1](https://docs.mailerlite.com)  
  * [v2](https://developers.mailerlite.com/reference)  

## License
MIT.

[nodei-url]: https://nodei.co/npm/mailerlite/
[nodei-image]: https://nodei.co/npm/mailerlite.png?mini=true

[npm-url]: https://npmjs.com/package/mailerlite/
[npm-image]: https://img.shields.io/npm/dt/mailerlite.svg

[travis-url]: https://travis-ci.org/fmoliveira/mailerlite-sdk-nodejs
[travis-image]: https://api.travis-ci.org/fmoliveira/mailerlite-sdk-nodejs.svg

[coveralls-url]: https://coveralls.io/github/fmoliveira/mailerlite-sdk-nodejs?branch=master
[coveralls-image]: https://coveralls.io/repos/github/fmoliveira/mailerlite-sdk-nodejs/badge.svg?branch=master
