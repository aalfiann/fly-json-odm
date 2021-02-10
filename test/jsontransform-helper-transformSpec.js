/* global describe it */

// The reason we allow duplicate keys is for test case only
/* eslint no-dupe-keys:0 */
const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

const nosql = new FlyJson();

const data = {
  posts: [{
    title: 'title1',
    description: 'description1',
    blog: 'This is a blog.',
    date: '11/4/2013',
    clearMe: 'text to remove',
    extra: {
      link: 'http://goo.cm'
    },
    list1: [{
      name: 'mike'
    }],
    list2: [{
      item: 'thing'
    }]
  }]
};

const map = {
  list: 'posts',
  item: {
    name: 'title',
    info: 'description',
    text: 'blog',
    date: 'date',
    link: 'extra.link',
    info: 'list1.0.name'
  },
  operate: [{
    run: 'Date.parse',
    on: 'date'
  }, {
    run: function customFn (item) {
      if (typeof item === 'string') { return item.toUpperCase(); }
      return item.toString().toUpperCase();
    },
    on: 'name'
  }]
};

describe('json transform Spec test', function () {
  it('should extract values', function () {
    const dataTransform = nosql.jsonTransform(nosql.deepClone(data), map);

    assert.deepStrictEqual(dataTransform.getValue(data, 'posts.0.description'), 'description1');
  });

  it('should transform data', function () {
    const dataTransform = nosql.jsonTransform(nosql.deepClone(data), map);

    assert.deepStrictEqual(dataTransform.make(), [{
      name: 'TITLE1',
      info: 'description1',
      text: 'This is a blog.',
      date: Date.parse('11/4/2013'),
      link: 'http://goo.cm',
      info: 'mike'
    }]);
  });

  it('should transform data asynchronously', function (done) {
    this.timeout(10000);
    nosql.promisify((builder) => { return builder; }).then((table) => {
      table.blockingTest(3000);
      const dataTransform = table.jsonTransform(table.deepClone(data), map);
      const result = dataTransform.make();
      assert.deepStrictEqual(result, [{
        name: 'TITLE1',
        info: 'description1',
        text: 'This is a blog.',
        date: Date.parse('11/4/2013'),
        link: 'http://goo.cm',
        info: 'mike'
      }]);
      done();
    });
  });

  it('should allow you to clear out fields', function () {
    // Add a map item to  clear out the "clearMe" field.
    const newMap = Object.assign({}, map);
    newMap.item = nosql.deepClone(map.item);
    newMap.item.clearMe = '';

    const dataTransform = nosql.jsonTransform(nosql.deepClone(data), newMap);

    assert.deepStrictEqual(dataTransform.make(), [{
      name: 'TITLE1',
      info: 'description1',
      text: 'This is a blog.',
      date: Date.parse('11/4/2013'),
      link: 'http://goo.cm',
      info: 'mike',
      clearMe: ''
    }]);
  });

  it('should allow you to set fields', function () {
    // Add a map item to  clear out the "clearMe" field.
    const newMap = Object.assign({}, map);
    newMap.item = nosql.deepClone(map.item);
    newMap.item.fieldThatDoesntExist = '';

    const dataTransform = nosql.jsonTransform(nosql.deepClone(data), newMap);

    assert.deepStrictEqual(dataTransform.make(), [{
      name: 'TITLE1',
      text: 'This is a blog.',
      date: Date.parse('11/4/2013'),
      link: 'http://goo.cm',
      info: 'mike',
      fieldThatDoesntExist: ''
    }]);
  });

  it('should allow you to map arrays', function () {
    // Add a map item to  clear out the "clearMe" field.
    const newMap = {
      list: 'posts',
      item: {
        fieldGroup: ['title', 'description', 'blog', 'extra']
      }
    };

    const dataTransform = nosql.jsonTransform(nosql.deepClone(data), newMap);

    assert.deepStrictEqual(dataTransform.make(), [{
      fieldGroup: [
        'title1',
        'description1',
        'This is a blog.', {
          link: 'http://goo.cm'
        }
      ]
    }]);
  });

  it('should allow you to pass arrays without specifying a list', function () {
    // Add a map item to  clear out the "clearMe" field.
    const newMap = {
      item: {
        fieldGroup: ['title', 'description', 'blog', 'extra']
      }
    };

    const data = [{
      title: 'title1',
      description: 'description1',
      blog: 'This is a blog.',
      date: '11/4/2013',
      clearMe: 'text to remove',
      extra: {
        link: 'http://goo.cm'
      },
      list1: [{
        name: 'mike'
      }],
      list2: [{
        item: 'thing'
      }]
    }];

    const dataTransform = nosql.jsonTransform(nosql.deepClone(data), newMap);

    assert.deepStrictEqual(dataTransform.make(), [{
      fieldGroup: [
        'title1',
        'description1',
        'This is a blog.', {
          link: 'http://goo.cm'
        }
      ]
    }]);
  });

  it('should allow you to use custom functions as operators', function () {
    const newMap = nosql.deepClone(map);

    newMap.operate = [{
      run: function (val) {
        return val + ' more info';
      },
      on: 'info'
    }];

    const dataTransform = nosql.jsonTransform(data, newMap);

    const result = dataTransform.make();
    assert.deepStrictEqual(result, [{
      name: 'title1',
      info: 'mike more info',
      text: 'This is a blog.',
      date: '11/4/2013',
      link: 'http://goo.cm'
    }]);
  });

  it('should allow multiple operators', function () {
    const newMap = nosql.deepClone(map);

    newMap.operate = [
      {
        run: function (val) {
          return val + ' more info';
        },
        on: 'info'
      },
      {
        run: function (val) {
          return val + ' more text';
        },
        on: 'text'
      }
    ];

    const dataTransform = nosql.jsonTransform(data, newMap);

    const result = dataTransform.make();
    assert.deepStrictEqual(result, [{
      name: 'title1',
      info: 'mike more info',
      text: 'This is a blog. more text',
      date: '11/4/2013',
      link: 'http://goo.cm'
    }]);
  });

  it('should allow each function to run on all items', function () {
    const data = {
      posts: [
        { name: 'peter' },
        { name: 'paul' },
        { name: 'marry' }
      ]
    };

    const map = {
      list: 'posts',
      each: function (item) {
        item.iterated = true;
        return item;
      }
    };

    const dataTransform = nosql.jsonTransform(data, map);

    const result = dataTransform.make();
    assert.deepStrictEqual(result, [
      { name: 'peter', iterated: true },
      { name: 'paul', iterated: true },
      { name: 'marry', iterated: true }
    ]);
  });

  it('should be able to combine mapping with each', function () {
    const data = {
      posts: [
        { name: 'peter' },
        { name: 'paul' },
        { name: 'marry' }
      ]
    };

    const map = {
      list: 'posts',
      item: {
        title: 'name'
      },
      each: function (item) {
        item.iterated = true;
        return item;
      }
    };

    const dataTransform = nosql.jsonTransform(data, map);

    const result = dataTransform.make();
    assert.deepStrictEqual(result, [
      { title: 'peter', iterated: true },
      { title: 'paul', iterated: true },
      { title: 'marry', iterated: true }
    ]);
  });

  it('should delete attributes', function () {
    const data = {
      posts: [
        { name: 'peter', unwanted: true },
        { name: 'paul', unwanted: true },
        { name: 'marry', unwanted: true }
      ]
    };

    const map = {
      list: 'posts',
      remove: ['unwanted']
    };

    const dataTransform = nosql.jsonTransform(data, map);

    const result = dataTransform.make();

    assert.deepStrictEqual(result, [
      { name: 'peter' },
      { name: 'paul' },
      { name: 'marry' }
    ]);
  });

  it('should use default attributes for missing data', function () {
    const data = {
      posts: [
        { name: 'peter', valid: true },
        { name: 'paul', valid: true },
        { name: 'marry' }
      ]
    };

    const map = {
      list: 'posts',
      item: {
        verified: 'valid',
        name: 'name'
      },
      defaults: {
        verified: false
      }
    };

    const dataTransform = nosql.jsonTransform(data, map);

    const result = dataTransform.make();

    assert.deepStrictEqual(result, [
      { name: 'peter', verified: true },
      { name: 'paul', verified: true },
      { name: 'marry', verified: false }
    ]);
  });

  it('should exclude data if not specified', function () {
    const data = {
      posts: [
        { name: 'peter', unwanted: true },
        { name: 'paul', unwanted: true },
        { name: 'marry', unwanted: true }
      ]
    };

    const map = {
      list: 'posts',
      item: {
        name: 'name'
      }
    };

    const dataTransform = nosql.jsonTransform(data, map);

    const result = dataTransform.make();

    assert.deepStrictEqual(result, [
      { name: 'peter' },
      { name: 'paul' },
      { name: 'marry' }
    ]);
  });
});
