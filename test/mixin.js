/* global describe it */
'use strict';
const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

describe('mixin test', function () {
  it('should be working fine if we don\'t use any mixins', function () {
    const data = [{ name: 'Antony' }, { name: 'Patricia' }];

    const nosql = new FlyJson();
    const result = nosql.set(data).exec();

    assert.deepStrictEqual(data, result);
  });

  it('should be an object variable with value as anonymous function or throw an error is not function', function () {
    const nosql1 = new FlyJson('abc');
    const nosql2 = new FlyJson(0);

    function test () {
      // do nothing
    }

    const nosql3 = new FlyJson(test());
    const nosql4 = new FlyJson([test()]);
    const nosql5 = new FlyJson({
      test: test()
    });

    assert.throws(function () { nosql1.abc(); }, Error);
    assert.throws(function () { nosql2[0](); }, Error);
    assert.throws(function () { nosql3.test(); }, Error);
    assert.throws(function () { nosql4.test(); }, Error);
    assert.throws(function () { nosql5.test(); }, Error);
  });

  it('add "test" function just to remove the first data on the list', function () {
    const data = [{ name: 'abc' }, { name: 'def' }];

    function removeFirstElement (self) {
      // get current list from nosql
      const data = self.list();
      // remove first element
      data.shift();
      // return with this new modified data;
      self.set(data);
    }

    const nosql = new FlyJson({
      test: () => {
        removeFirstElement(nosql);
      }
    });

    const result = nosql.set(data).test().exec();
    assert.deepStrictEqual([{ name: 'def' }], result);
  });

  it('add "foo" function just to replace the current list', function () {
    const data = [{ name: 'abc' }, { name: 'def' }];

    function modifyData (nosql, name) {
      nosql.set([{ name: 'new user: ' + name }]);
    }

    const nosql = new FlyJson({
      foo: (name) => {
        modifyData(nosql, name);
      }
    });

    const result = nosql.set(data).where('name', 'abc').foo('bar').exec();
    assert.deepStrictEqual([{ name: 'new user: bar' }], result);
  });

  it('should able to modify "list()" function by mixins which is "list()" is a built-in function', function () {
    const data = [{ name: 'abc' }, { name: 'def' }];

    function modifyData (nosql, name) {
      nosql.set([{ name: 'new user: ' + name }]);
    }

    const nosql = new FlyJson({
      list: (name) => {
        modifyData(nosql, name);
      }
    });

    const result = nosql.set(data).where('name', 'abc').list('bar').exec();
    assert.deepStrictEqual([{ name: 'new user: bar' }], result);
  });

  it('should support multiple custom function', function () {
    const data = [{ name: 'abc' }, { name: 'def' }];

    function foo (nosql) {
      const newdt = nosql.list();
      newdt.push({ name: 'foo' });
      nosql.set(newdt);
    }

    function bar (nosql) {
      const newdt = nosql.list();
      newdt.push({ name: 'bar' });
      nosql.set(newdt);
    }

    const nosql = new FlyJson({
      foo: () => {
        foo(nosql);
      },
      bar: () => {
        bar(nosql);
      }
    });

    const result = nosql.set(data)
      // look for name abc
      .where('name', 'abc')
      // add foo
      .foo()
      // add bar
      .bar()
      // execute
      .exec();
    assert.deepStrictEqual([{ name: 'abc' }, { name: 'foo' }, { name: 'bar' }], result);
  });
});
