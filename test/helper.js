/* global describe it */

// The reason we allow new constructor for boolean is just for test case only
/* eslint no-new-wrappers:0 */
const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

describe('helper function test', function () {
  const nosql = new FlyJson();

  it('is string', function () {
    assert.strictEqual(nosql.isString('abc'), true);
    assert.strictEqual(nosql.isString(''), true);
    assert.strictEqual(nosql.isString(1), false);
    assert.strictEqual(nosql.isString([]), false);
    assert.strictEqual(nosql.isString({}), false);
  });

  it('is integer', function () {
    assert.strictEqual(nosql.isInteger(1), true);
    assert.strictEqual(nosql.isInteger(0), true);
    assert.strictEqual(nosql.isInteger(-1), true);
    assert.strictEqual(nosql.isInteger(-1.56), false);
    assert.strictEqual(nosql.isInteger(1.56), false);
    assert.strictEqual(nosql.isInteger('2'), false);
    assert.strictEqual(nosql.isInteger('-2'), false);
    assert.strictEqual(nosql.isInteger('02'), false);
    assert.strictEqual(nosql.isInteger('2.56'), false);
    assert.strictEqual(nosql.isInteger('-2.56'), false);
    assert.strictEqual(nosql.isInteger([1, 2, 3]), false);
    assert.strictEqual(nosql.isInteger([]), false);
    assert.strictEqual(nosql.isInteger({}), false);
    assert.strictEqual(nosql.isInteger(''), false);
  });

  it('is boolean', function () {
    assert.strictEqual(nosql.isBoolean(true), true);
    assert.strictEqual(nosql.isBoolean(false), true);
    assert.strictEqual(nosql.isBoolean(new Boolean(true)), true); // with new wrappers
    assert.strictEqual(nosql.isBoolean(new Boolean(false)), true); // with new wrappers
    assert.strictEqual(nosql.isBoolean(Boolean(true)), true);
    assert.strictEqual(nosql.isBoolean(Boolean(false)), true);
    assert.strictEqual(nosql.isBoolean(undefined), false);
    assert.strictEqual(nosql.isBoolean(null), false);
    assert.strictEqual(nosql.isBoolean(1), false);
    assert.strictEqual(nosql.isBoolean(0), false);
    assert.strictEqual(nosql.isBoolean('true'), false);
    assert.strictEqual(nosql.isBoolean('false'), false);
  });

  it('is array', function () {
    assert.strictEqual(nosql.isArray([1, 2, 3]), true);
    assert.strictEqual(nosql.isArray([]), true);
    assert.strictEqual(nosql.isArray({}), false);
    assert.strictEqual(nosql.isArray(1), false);
    assert.strictEqual(nosql.isArray(''), false);
  });

  it('is object', function () {
    assert.strictEqual(nosql.isObject({ id: 1, name: 'abc' }), true);
    assert.strictEqual(nosql.isObject({}), true);
    assert.strictEqual(nosql.isObject([]), false);
    assert.strictEqual(nosql.isObject(''), false);
    assert.strictEqual(nosql.isObject(1), false);
  });

  it('is empty string', function () {
    assert.strictEqual(nosql.isEmpty(undefined), true);
    assert.strictEqual(nosql.isEmpty(null), true);
    assert.strictEqual(nosql.isEmpty(''), true);
    assert.strictEqual(nosql.isEmpty('abc'), false);
    assert.strictEqual(nosql.isEmpty(1), false);
    assert.strictEqual(nosql.isEmpty([]), false);
    assert.strictEqual(nosql.isEmpty({}), false);
  });

  it('is empty array', function () {
    assert.strictEqual(nosql.isEmptyArray(undefined), true);
    assert.strictEqual(nosql.isEmptyArray(null), true);
    assert.strictEqual(nosql.isEmptyArray([]), true);
    assert.strictEqual(nosql.isEmptyArray({}), false);
    assert.strictEqual(nosql.isEmptyArray({ id: 1 }), false);
    assert.strictEqual(nosql.isEmptyArray('1'), false);
    assert.strictEqual(nosql.isEmptyArray(1), false);
    assert.strictEqual(nosql.isEmptyArray([1, 2, 3]), false);
  });

  it('is empty object', function () {
    assert.strictEqual(nosql.isEmptyObject(undefined), true);
    assert.strictEqual(nosql.isEmptyObject(null), true);
    assert.strictEqual(nosql.isEmptyObject({}), true);
    assert.strictEqual(nosql.isEmptyObject([]), false);
    assert.strictEqual(nosql.isEmptyObject(1), false);
    assert.strictEqual(nosql.isEmptyObject({ id: 1 }), false);
    assert.strictEqual(nosql.isEmptyObject('1'), false);
    assert.strictEqual(nosql.isEmptyObject([1, 2, 3]), false);
  });

  it('is empty object parameter value must hasOwnProperty', function () {
    const obj = Object.create({ name: 'inherited' });
    assert.strictEqual(true, nosql.isEmptyObject(obj));
  });

  it('safeStringify success to avoid type error converting circular', function () {
    const o = {};
    o.o = o;
    o.o.o = null;
    const result = JSON.parse(nosql.safeStringify(o));
    assert.strictEqual(true, nosql.isObject(result));
  });

  it('safeStringify success to avoid type error converting circular in vue.js', function () {
    const o = {};
    o.o = o;
    o._ = '1234';
    const result = JSON.parse(nosql.safeStringify(o));
    assert.strictEqual(true, nosql.isObject(result));
  });

  it('object circular is not empty and is object', function () {
    const o = {};
    o.o = o;
    assert.strictEqual(true, (!nosql.isEmpty(o) && nosql.isObject(o)));
  });

  it('shallow clone array is not reflect to original', function () {
    const array1 = [1, 2, 3];
    let array2 = [6, 7, 8];
    array2 = nosql.shallowClone(array1);
    array2[0] = 10;
    assert.strictEqual(array1[0], 1);
  });

  it('shallow clone with deep array is reflect to original', function () {
    const array1 = [[1], [2], [3]];
    let array2 = [[6], [7], [8]];
    array2 = nosql.shallowClone(array1);
    array2[0].push(10);
    assert.deepStrictEqual(array1[0], [1, 10]);
  });

  it('deep clone array is not reflect to original', function () {
    const array1 = [1, 2, 3];
    let array2 = [6, 7, 8];
    array2 = nosql.deepClone(array1);
    array2[0] = 10;
    assert.strictEqual(array1[0], 1);
  });

  it('deep clone without hasOwnProperty will not copied', function () {
    const obj = Object.create({ name: 'inherited' });
    assert.deepStrictEqual(nosql.deepClone(obj), {});
  });

  it('deep clone with deep array is not reflect to original', function () {
    const array1 = [[1], [2], [3]];
    let array2 = [[6], [7], [8]];
    array2 = nosql.deepClone(array1);
    array2[0].push(10);
    assert.deepStrictEqual(array1[0], [1]);
  });

  it('foreach an array', function () {
    const array1 = [1, 2, 3];
    const result = [];
    nosql.foreach(array1, function (value) {
      result.push(value);
    });
    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  it('foreach an object', function () {
    const obj = { id: 1, name: 'john', age: 20 };
    const result = [];
    nosql.foreach(obj, function (value) {
      result.push(value);
    });
    assert.deepStrictEqual(result, [1, 'john', 20]);
  });

  it('foreach except an array or object will throw Error', function () {
    const name = 'my name is john';
    assert.throws(() => {
      nosql.foreach(name, function (value) {
        console.log(value);
      });
    }, Error);
  });
});
