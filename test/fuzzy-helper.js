/* global describe it */
'use strict';
const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

describe('Fuzzy Helper test', function () {
  it('should return strings matching "qwe', function () {
    const data = ['test', 'again', 'word', 'something', 'qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething'];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, 'qwe');
    assert.deepStrictEqual(['qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething'], result);
  });

  it('should return strings matching "x"', () => {
    const data = ['x', 'xx', 'xxx', 't', 'f'];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, 'x');
    assert.deepStrictEqual(['x', 'xx', 'xxx'], result);
  });

  it('should allow to search case sensitive', () => {
    const data = ['Patricia', 'Millaruelo', 'Itziar', 'Julia'];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, 'mill', [], true);
    const result2 = nosql.fuzzy(data, 'Mill', [], true);

    assert.deepStrictEqual([], result);
    assert.deepStrictEqual(['Millaruelo'], result2);
  });

  it('should return the whole list with an empty query string', () => {
    const data = ['Patricia', 'Millaruelo', 'Itziar', 'Julia'];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, '');

    assert.deepStrictEqual(data, result);
  });

  it('should return the whole list with default params', () => {
    const data = ['Patricia', 'Millaruelo', 'Itziar', 'Julia'];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data);

    assert.deepStrictEqual(data, result);
  });

  it('should not match repeating letters', () => {
    const data = ['long string', 'string'];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, 'looooooong string');

    assert.deepStrictEqual([], result);
  });

  it('should allow sorting', () => {
    const data = ['a______b______c', 'a__b__c', 'abc'];
    const data2 = ['application/cdfx+xml', 'application/pdf'];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, 'abc', [], false, true);
    const result2 = nosql.fuzzy(data2, 'pdf', [], false, true);

    assert.deepStrictEqual(['abc', 'a__b__c', 'a______b______c'], result);
    assert.deepStrictEqual(['application/pdf', 'application/cdfx+xml'], result2);
  });

  it('should boost score if query matches item exactly', () => {
    const data = ['prolog', 'rust', 'r', 'ruby'];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, 'r', [], false, true);

    assert.deepStrictEqual(['r', 'rust', 'ruby', 'prolog'], result);
  });

  it('allows for configuration when the keys parameter is omitted', () => {
    const data = ['a'];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, 'a', [], false, true);

    assert.deepStrictEqual(['a'], result);
  });

  it('should rank words with matching letters close to each other higher', () => {
    const data = ['Alarm Dictionary', 'BO_ALARM_DICTIONARY', 'Dogmatix Board Replacements', 'DOGMATIX_BOARD_REPLACEMENT_V'];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, 'board', [], false, true);

    assert.deepStrictEqual(['Dogmatix Board Replacements', 'DOGMATIX_BOARD_REPLACEMENT_V', 'BO_ALARM_DICTIONARY'], result);
  });

  it('should be able to search by numeric values', () => {
    const data = [1, 2, 11, 12];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, 1);

    assert.deepStrictEqual([1, 11, 12], result);
  });

  it('should rank numbers', () => {
    const data = [12, 11, 1, 2];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, 1, [], false, true);

    assert.deepStrictEqual([1, 12, 11], result);
  });

  it('should sort abbreviation as first', () => {
    const data = ['General Preferences Table', 'Group Preferences Table', 'Prefix User Preferences Table', 'User Preferences Table'];

    const nosql = new FlyJson();
    const result = nosql.fuzzy(data, 'upt', [], false, true);

    assert.deepStrictEqual(['User Preferences Table', 'Prefix User Preferences Table', 'Group Preferences Table'], result);
  });
});
