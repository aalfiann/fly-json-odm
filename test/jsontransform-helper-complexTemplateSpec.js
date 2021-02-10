/* global describe it */
const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

const map = {
  list: 'items',
  item: {
    id: 'id',
    sku: 'sku',
    zero: 'zero',
    toReplace: 'sku',
    errorReplace: 'notFound',
    simpleArray: ['id', 'sku', 'sku'],
    complexArray: [{ node: 'id' }, { otherNode: 'sku' }, { toReplace: 'sku' }],
    subObject: {
      node1: 'id',
      node2: 'sku',
      subSubObject: {
        node1: 'id',
        node2: 'sku'
      }
    }
  },
  operate: [{
    run: (val) => 'replacement',
    on: 'subObject.subSubObject.node1'
  },
  {
    run: (val) => 'replacement',
    on: 'errorReplace'
  },
  {
    run: (val) => 'replacement',
    on: 'toReplace'
  },
  {
    run: (val) => 'replacement',
    on: 'simpleArray.2'
  },
  {
    run: (val) => 'replacement',
    on: 'complexArray.2.toReplace'
  },
  {
    // if target is undefined then will not processed
    run: (val) => 'replacement',
    on: 'complexArray.3.toReplace'
  }]
};

const object = {
  items: [
    {
      id: 'books',
      zero: 0,
      sku: '10234-12312'
    }
  ]
};

describe('json transform complexTemplateSpec test', function () {
  it('should extract values', function () {
    const expected = [
      {
        id: 'books',
        sku: '10234-12312',
        zero: 0,
        toReplace: 'replacement',
        errorReplace: 'replacement',
        simpleArray: [
          'books',
          '10234-12312',
          'replacement'
        ],
        complexArray: [
          {
            node: 'books'
          },
          {
            otherNode: '10234-12312'
          },
          {
            toReplace: 'replacement'
          }
        ],
        subObject: {
          node1: 'books',
          node2: '10234-12312',
          subSubObject: {
            node1: 'replacement',
            node2: '10234-12312'
          }
        }
      }
    ];

    const nosql = new FlyJson();
    const result = nosql.jsonTransform(object, map).make();
    assert.deepStrictEqual(expected, result);
  });
});
