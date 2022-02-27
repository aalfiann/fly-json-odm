# fly-json-odm
[![NPM](https://nodei.co/npm/fly-json-odm.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fly-json-odm/)
[![js-semistandard-style](https://raw.githubusercontent.com/standard/semistandard/master/badge.svg)](https://github.com/standard/semistandard)  
  
[![npm version](https://img.shields.io/npm/v/fly-json-odm.svg?style=flat-square)](https://www.npmjs.org/package/fly-json-odm)
[![Build Status](https://app.travis-ci.com/aalfiann/fly-json-odm.svg?branch=master)](https://app.travis-ci.com/aalfiann/fly-json-odm)
[![Coverage Status](https://coveralls.io/repos/github/aalfiann/fly-json-odm/badge.svg?branch=master)](https://coveralls.io/github/aalfiann/fly-json-odm?branch=master)
[![Known Vulnerabilities](https://snyk.io//test/github/aalfiann/fly-json-odm/badge.svg?targetFile=package.json)](https://snyk.io//test/github/aalfiann/fly-json-odm?targetFile=package.json)
![License](https://img.shields.io/npm/l/fly-json-odm)
![NPM download/month](https://img.shields.io/npm/dm/fly-json-odm.svg)
![NPM download total](https://img.shields.io/npm/dt/fly-json-odm.svg)
[![](https://data.jsdelivr.com/v1/package/npm/fly-json-odm/badge)](https://www.jsdelivr.com/package/npm/fly-json-odm)  
An Object Document Mapper to handle JSON on the fly for NodeJS or Browser.

`fly-json-odm` is the ODM library to handle JSON on the fly like `NOSQL` does. You are able to make manipulation of JSON like ORM. For example is to do `Insert`, `Read`, `Update`, `Modify`, `Delete`, `Join`, `Query` and `Transform`.

### Install using NPM
```bash
$ npm install fly-json-odm
```

**Or simply use in Browser with CDN**
```html
<!-- Always get the latest version -->
<!-- Not recommended for production sites! -->
<script src="https://cdn.jsdelivr.net/npm/fly-json-odm/dist/flyjson.min.js"></script>

<!-- Get minor updates and patch fixes within a major version -->
<script src="https://cdn.jsdelivr.net/npm/fly-json-odm@1/dist/flyjson.min.js"></script>

<!-- Get patch fixes within a minor version -->
<script src="https://cdn.jsdelivr.net/npm/fly-json-odm@1.17/dist/flyjson.min.js"></script>

<!-- Get a specific version -->
<!-- Recommended for production sites! -->
<script src="https://cdn.jsdelivr.net/npm/fly-json-odm@1.17.1/dist/flyjson.min.js"></script>
```

### Usage
```javascript
const FlyJson = require('fly-json-odm'); // in browser doesn't need this line

var nosql = new FlyJson();

// example data json
var data = [
    {user_id:1,name:'budi',age:10},
    {user_id:5,name:'wawan',age:20},
    {user_id:3,name:'tono',age:30}
];

// Synchronous
var result = nosql.set(data)
  .where('age', '>', 10)
  .orderBy('age', true)
  .exec();
console.log(result);

// Asynchronous
nosql.promisify((builder) => {return builder}).then((table) => {
  var result = table.set(data)
    .where('name', '==', 'wawan')
    .exec();
  console.log(result);
});
```
**Note:**
- Structure Data Table JSON must be an `Array` which is contains `Object` like example above.
- `fly-json-odm` is synchronous as default.

### Documentation
Documentation is available in our [Wiki](https://github.com/aalfiann/fly-json-odm/wiki).

### Unit Test
If you want to play around with unit test.
```bash
$ npm test
```