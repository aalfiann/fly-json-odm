/* global describe it */
'use strict';
const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

describe('Fuzzy Search test', function () {
  it('should return strings matching "qwe', function () {
    const data = ['test', 'again', 'word', 'something', 'qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('qwe').exec();
    assert.deepStrictEqual(['qwerty', 'qwerty keyboard', 'qrandomwanotherrandomething'], result);
  });

  it('should return strings matching "x"', () => {
    const data = ['x', 'xx', 'xxx', 't', 'f'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('x').exec();
    assert.deepStrictEqual(['x', 'xx', 'xxx'], result);
  });

  it('should search in keys', () => {
    const data = [
      {
        name: 'Betania Ivana Besoli Leiten',
        location: 'El Salvador'
      },
      {
        name: 'Alexandría DCastillo Gayubas',
        location: 'Bolivia'
      }
    ];

    const keys = ['name'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('als', keys).exec();

    assert.deepStrictEqual([
      {
        name: 'Alexandría DCastillo Gayubas',
        location: 'Bolivia'
      }
    ], result);
  });

  it('should search in array keys', () => {
    const data = [
      {
        name: ['Irene', 'Maseras'],
        location: 'Colombia'
      },
      {
        name: ['Itziar', 'Julia', 'Pumarola', 'Duenas'],
        location: 'Chile'
      }
    ];

    const keys = ['name'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('itzi', keys).exec();

    assert.deepStrictEqual([
      {
        name: ['Itziar', 'Julia', 'Pumarola', 'Duenas'],
        location: 'Chile'
      }
    ], result);
  });

  it('should search in array keys containing objects', () => {
    const data = [
      {
        persons: [{ firstname: 'Patricia', lastname: 'Millaruelo' }, { firstname: 'Itziar', lastname: 'Julia' }]
      },
      {
        persons: [{ firstname: 'Alexandría', lastname: 'DCastillo' }, { firstname: 'Gayubas', lastname: 'Pumarola' }]
      }
    ];

    const keys = ['persons.firstname'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('tzia', keys).exec();

    assert.deepStrictEqual([
      {
        persons: [{ firstname: 'Patricia', lastname: 'Millaruelo' }, { firstname: 'Itziar', lastname: 'Julia' }]
      }
    ], result);
  });

  it('should allow to search case sensitive', () => {
    const data = ['Patricia', 'Millaruelo', 'Itziar', 'Julia'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('mill', [], true).exec();
    const result2 = nosql.set(data).fuzzySearch('Mill', [], true).exec();

    assert.deepStrictEqual([], result);
    assert.deepStrictEqual(['Millaruelo'], result2);
  });

  it('should return the whole list with an empty query string', () => {
    const data = ['Patricia', 'Millaruelo', 'Itziar', 'Julia'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('').exec();

    assert.deepStrictEqual(data, result);
  });

  it('should return the whole list with default params', () => {
    const data = ['Patricia', 'Millaruelo', 'Itziar', 'Julia'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch().exec();

    assert.deepStrictEqual(data, result);
  });

  it('should not match repeating letters', () => {
    const data = ['long string', 'string'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('looooooong string').exec();

    assert.deepStrictEqual([], result);
  });

  it('should allow sorting', () => {
    const data = ['a______b______c', 'a__b__c', 'abc'];
    const data2 = ['application/cdfx+xml', 'application/pdf'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('abc', [], false, true).exec();
    const result2 = nosql.set(data2).fuzzySearch('pdf', [], false, true).exec();

    assert.deepStrictEqual(['abc', 'a__b__c', 'a______b______c'], result);
    assert.deepStrictEqual(['application/pdf', 'application/cdfx+xml'], result2);
  });

  it('should boost score if query matches item exactly', () => {
    const data = ['prolog', 'rust', 'r', 'ruby'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('r', [], false, true).exec();

    assert.deepStrictEqual(['r', 'rust', 'ruby', 'prolog'], result);
  });

  it('allows for configuration when the keys parameter is omitted', () => {
    const data = ['a'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('a', [], false, true).exec();

    assert.deepStrictEqual(['a'], result);
  });

  it('should rank words with matching letters close to each other higher', () => {
    const data = ['Alarm Dictionary', 'BO_ALARM_DICTIONARY', 'Dogmatix Board Replacements', 'DOGMATIX_BOARD_REPLACEMENT_V'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('board', [], false, true).exec();

    assert.deepStrictEqual(['Dogmatix Board Replacements', 'DOGMATIX_BOARD_REPLACEMENT_V', 'BO_ALARM_DICTIONARY'], result);
  });

  it('should be able to search by numeric values', () => {
    const data = [1, 2, 11, 12];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch(1).exec();

    assert.deepStrictEqual([1, 11, 12], result);
  });

  it('should rank numbers', () => {
    const data = [12, 11, 1, 2];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch(1, [], false, true).exec();

    assert.deepStrictEqual([1, 12, 11], result);
  });

  it('should sort abbreviation as first', () => {
    const data = ['General Preferences Table', 'Group Preferences Table', 'Prefix User Preferences Table', 'User Preferences Table'];

    const nosql = new FlyJson();
    const result = nosql.set(data).fuzzySearch('upt', [], false, true).exec();

    assert.deepStrictEqual(['User Preferences Table', 'Prefix User Preferences Table', 'Group Preferences Table'], result);
  });
});
