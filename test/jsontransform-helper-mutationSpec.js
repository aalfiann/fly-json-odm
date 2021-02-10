/* global describe it */
const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

const nosql = new FlyJson();

const data = {
  posts: [{
    title: 'title1'
  }]
};

const map = {
  list: 'posts',
  item: {
    name: 'title'
  }
};

describe('json transform mutationSpec test', function () {
  it('should not manipulate the raw data', function () {
    const clone = nosql.deepClone(data);
    nosql.jsonTransform(data, map).make();
    assert.deepStrictEqual(clone, data);
  });

  it('should not manipulate the raw data', function () {
    const clone = nosql.deepClone(map);
    nosql.jsonTransform(data, map).make();
    assert.deepStrictEqual(clone, map);
  });
});
