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
    greeting: 'title'
  },
  operate: [{
    run: function customFn (item, context) {
      return context.intro + item;
    },
    on: 'greeting'
  }]
};

// const mapEach = {
//   list: 'posts',
//   item: {
//     greeting: 'title'
//   },
//   each: function eachFn (item, index, collection, context) {
//     item.greeting = context.intro + item;
//     return item;
//   }
// };

describe('json transform ContextSpec test', function () {
  it('should pass the context to operate.run', function () {
    const dataTransform = nosql.jsonTransform(nosql.deepClone(data), map);

    const context = {
      intro: 'Hi '
    };

    assert.deepStrictEqual(dataTransform.make(context), [{
      greeting: 'Hi title1'
    }]);
  });

  it('should pass the context to each', function () {
    const dataTransform = nosql.jsonTransform(nosql.deepClone(data), map);

    const context = {
      intro: 'Hi '
    };

    assert.deepStrictEqual(dataTransform.make(context), [{
      greeting: 'Hi title1'
    }]);
  });

  it('should always return an array', function () {
    const dataTransform = nosql.jsonTransform({}, {});
    assert.deepStrictEqual(Array.isArray(dataTransform.make()), true);
  });
});
