# fly-json-odm
[![NPM](https://nodei.co/npm/fly-json-odm.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fly-json-odm/)  
  
[![npm version](https://img.shields.io/npm/v/fly-json-odm.svg?style=flat-square)](https://www.npmjs.org/package/fly-json-odm)
[![Build Status](https://travis-ci.org/aalfiann/fly-json-odm.svg?branch=master)](https://travis-ci.org/aalfiann/fly-json-odm)
[![Coverage Status](https://coveralls.io/repos/github/aalfiann/fly-json-odm/badge.svg?branch=master)](https://coveralls.io/github/aalfiann/fly-json-odm?branch=master)
[![Known Vulnerabilities](https://snyk.io//test/github/aalfiann/fly-json-odm/badge.svg?targetFile=package.json)](https://snyk.io//test/github/aalfiann/fly-json-odm?targetFile=package.json)
[![dependencies Status](https://david-dm.org/aalfiann/fly-json-odm/status.svg)](https://david-dm.org/aalfiann/fly-json-odm)
![License](https://img.shields.io/npm/l/fly-json-odm)
![NPM download/month](https://img.shields.io/npm/dm/fly-json-odm.svg)
![NPM download total](https://img.shields.io/npm/dt/fly-json-odm.svg)  
An Object Document Mapper to handle JSON on the fly for NodeJS


### Background
`fly-json-odm` is the ODM library to handle JSON on the fly like `NOSQL` does. You are able to make manipulation of JSON like ORM. For example is to do `Insert`, `Read`, `Update`, `Modify`, `Delete`, `Join` and `Query`. When you are develop in `microservices` architecture, you will face up that everything should be handle from rest json via each services, because you can not access directly into the database.  

### Limitation
This library was created to handle JSON for `modification`/`manipulation` only and any data will be processed and saved in memory for temporary (`On-The-Fly`). Not support for to use with any database server also we don't provide feature how to read JSON from `file`, `stream` or something like that.

## Install using NPM
```bash
$ npm install fly-json-odm
```

### Usage
```javascript
const FlyJson = require('fly-json-odm');

var nosql = new FlyJson();

// example data json
var data = [
    {user_id:1,name:'budi',age:10},
    {user_id:5,name:'wawan',age:20},
    {user_id:3,name:'tono',age:30}
];

// Synchronous
var result = nosql.set(data)
  .where('id',5)
  .exec();
console.log(result);

// Asynchronous
nosql.promisify((builder) => {return builder}).then((table) => {
  var result = table.set(data)
    .where('id',5)
    .exec();
  console.log(result);
});
```
**Note:**
- Structure Data Table JSON must be an `Array` which is contains `Object` like example above.
- `fly-json-odm` is synchronous as default.

### Documentation
Documentation detail about `CRUD`, `Query`, `Join`, `Transform` and for more example is available at [here](https://github.com/aalfiann/fly-json-odm/wiki).

### Unit Test
If you want more example, you can play around with unit test.
```bash
$ npm test
```