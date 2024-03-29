/* global describe it */
'use strict';
const assert = require('assert');
const FlyJson = require('../src/flyjson.js');
const operator = require('../src/operator');

const rightTable = [
  { user_id: 1, name: 'budi', age: 10 },
  { user_id: 5, name: 'wawan', age: 20 },
  { user_id: 3, name: 'tono', age: 30 }
];

const wrongTable = {
  user: [
    { user_id: 1, name: 'budi', age: 10 },
    { user_id: 5, name: 'wawan', age: 20 },
    { user_id: 3, name: 'tono', age: 30 }
  ]
};

const bigObjectTable = [];
const bigNumberTable = [];
const bigStringTable = [];

const start = 1;
const end = 1000;

for (let i = start; i <= end; i++) {
  bigObjectTable.push({ id: i });
  bigNumberTable.push(i);
  bigStringTable.push('test' + i);
}

const emptyTable = [];
const stringTable = ['hello', 'world', 'welcome', 'to', 'my', 'life'];
const numberTable = [1, 2, 3, 4, 5];
const brokenTable1 = [{ name: 'budi' }, 1, 'hello'];
const brokenTable2 = [{ name: 'budi' }, { name: 'wawan' }, 'hello'];
const brokenTable3 = [{ name: 'budi' }, { name: 'wawan' }, { name: 'wawan' }, 'hello'];
const brokenTable4 = [{ name: 'budi' }, 1, { name: 'wawan' }, { name: 'wawan' }, { name: 'wawan' }];
const brokenTable5 = [{ name: 'budi' }, { name: 'wawan' }, { name: 'wawan' }, 1, { name: 'wawan' }];

describe('intentional failure condition test', function () {
  it('table must be an array', function () {
    const nosql = new FlyJson();
    assert.strictEqual(nosql.fastCheckArrayObject(rightTable), true);
    assert.strictEqual(nosql.fastCheckArrayObject(emptyTable), true);
    assert.strictEqual(nosql.fastCheckArrayObject(bigObjectTable), true);
    assert.strictEqual(nosql.fastCheckArrayObject(bigNumberTable), false);
    assert.strictEqual(nosql.fastCheckArrayObject(bigStringTable), false);
    assert.strictEqual(nosql.fastCheckArrayObject(stringTable), false);
    assert.strictEqual(nosql.fastCheckArrayObject(numberTable), false);
    assert.strictEqual(nosql.fastCheckArrayObject(brokenTable1), false);
    assert.strictEqual(nosql.fastCheckArrayObject(brokenTable2), false);
    assert.strictEqual(nosql.fastCheckArrayObject(brokenTable3), false);
    assert.strictEqual(nosql.fastCheckArrayObject(brokenTable4), false);
    assert.strictEqual(nosql.fastCheckArrayObject(brokenTable5), false);
    assert.throws(function () { nosql.set(wrongTable); }, Error);
  });

  it('set table with not array object', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(wrongTable); }, Error);
  });

  it('select + empty where will not filtered', function () {
    const nosql = new FlyJson();
    const data = nosql.set(rightTable)
      .select(['user_id', 'name'])
      .where()
      .exec();
    assert.strictEqual(data.length, 3);
  });

  it('select + where + or + where without begin then or will filtered as and', function () {
    const nosql = new FlyJson();
    const data = nosql.set(rightTable)
      .select(['user_id', 'name'])
      .where('name', 'like', 'u')
      .or()
      .where('name', '===', 'tono')
      .end()
      .exec();
    assert.strictEqual(data.length, 0);
  });

  it('select + where + or + where without begin and end then or will filtered as and', function () {
    const nosql = new FlyJson();
    const data = nosql.set(rightTable)
      .select(['user_id', 'name'])
      .where('name', 'like', 'u')
      .or()
      .where('name', '===', 'tono')
      .exec();
    assert.strictEqual(data.length, 0);
  });

  it('select + where + or + where without end will not filtered', function () {
    const nosql = new FlyJson();
    const data = nosql.set(rightTable)
      .select(['user_id', 'name'])
      .begin()
      .where('name', 'like', 'u')
      .or()
      .where('name', '===', 'budi')
      .exec();
    assert.strictEqual(data.length, 3);
  });

  it('set table with empty parameter in orderby will not filtered', function () {
    const nosql = new FlyJson();
    assert.strictEqual(nosql.set(rightTable).orderBy().exec().length, 3);
  });

  it('set table with empty parameter in skip will not filtered', function () {
    const nosql = new FlyJson();
    assert.strictEqual(nosql.set(rightTable).skip().exec().length, 3);
  });

  it('select with empty parameter in skip will not filtered', function () {
    const nosql = new FlyJson();
    assert.strictEqual(nosql.set(rightTable).skip(true, false).exec().length, 3);
  });

  it('set table with empty parameter in take will not filtered', function () {
    const nosql = new FlyJson();
    assert.strictEqual(nosql.set(rightTable).take().exec().length, 3);
  });

  it('select with empty parameter in take will not filtered', function () {
    const nosql = new FlyJson();
    assert.strictEqual(nosql.set(rightTable).take(true, false).exec().length, 3);
  });

  it('set table with empty parameter in pagination will not filtered', function () {
    const nosql = new FlyJson();
    assert.strictEqual(nosql.set(rightTable).paginate().exec().length, 3);
  });

  it('select with empty parameter in pagination will not filtered', function () {
    const nosql = new FlyJson();
    assert.strictEqual(nosql.set(rightTable).paginate(true, false).exec().length, 3);
  });

  it('join with wrong name parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).join(); }, Error);
  });

  it('join with wrong table parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).join('data', wrongTable); }, Error);
  });

  it('join on with wrong name in first parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).join('data', rightTable).on(); }, Error);
  });

  it('join on with wrong name in second parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).join('data', rightTable).on('id'); }, Error);
  });

  it('on without join', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).on('id', 'id'); }, Error);
  });

  it('join merge with wrong name in first parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).join('data', rightTable).merge(); }, Error);
  });

  it('join merge with wrong name in second parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).join('data', rightTable).merge('id'); }, Error);
  });

  it('merge without join', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).merge('id', 'id'); }, Error);
  });

  it('promisify with catch error', function () {
    const nosql = new FlyJson();
    nosql.promisify().then(function (table) {

    }, function (err) {
      return err;
    });
  });

  it('select with empty array', function () {
    const nosql = new FlyJson();
    const data = nosql.set(rightTable).select([]).exec();
    assert.deepStrictEqual(rightTable, data);
  });

  it('select + distinct with wrong fieldname type (not string)', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).select([]).distinct(['abc']).exec(); }, Error);
  });

  it('insert data with empty parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).insert(); }, Error);
  });

  it('insert many data with empty parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).insertMany(); }, Error);
  });

  it('insert many data with wrong array', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).insertMany([1, 2, 3]); }, Error);
  });

  it('update data with no name key', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).update(); }, Error);
  });

  it('update data with no value', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).update('user_id'); }, Error);
  });

  it('update data with no object', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).update('user_id', 1); }, Error);
  });

  it('update many data with no name key', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).updateMany(); }, Error);
  });

  it('update many data with no data object', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).updateMany('user_id'); }, Error);
  });

  it('modify data with no name key', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).modify(); }, Error);
  });

  it('modify data with no value', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).modify('user_id'); }, Error);
  });

  it('modify data with no object', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).modify('user_id', 1); }, Error);
  });

  it('modify many data with no name key', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).modifyMany(); }, Error);
  });

  it('modify many data with no data object', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).modifyMany('user_id'); }, Error);
  });

  it('delete data with no value', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).delete('id'); }, Error);
  });

  it('delete many data with no value', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).deleteMany('id'); }, Error);
  });

  it('groupBy with no any parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).groupBy(); }, Error);
  });

  it('groupBy with wrong sumField parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).groupBy('name', {}); }, Error);
  });

  it('groupDetail with no any parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).groupDetail(); }, Error);
  });

  it('groupBy with wrong groupName parameter', function () {
    const nosql = new FlyJson();
    assert.throws(function () { nosql.set(rightTable).groupDetail('name', {}); }, Error);
  });

  it('Comparisons operator not available', function () {
    assert.throws(function () {
      operator.unstrict('===', 'abc', 'abc');
    }, Error);
  });
});
