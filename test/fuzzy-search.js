/* global describe it */
'use strict';
const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

describe('Fuzzy Search test', function () {
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

  it('should throw error if query is not string or number', function () {
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

    const nosql = new FlyJson();
    assert.throws(() => {
      nosql.set(data).fuzzySearch(null).exec();
    }, Error);
    assert.throws(() => {
      nosql.set(data).fuzzySearch(undefined).exec();
    }, Error);
    assert.throws(() => {
      nosql.set(data).fuzzySearch('oliv', null).exec();
    }, Error);
    assert.throws(() => {
      nosql.set(data).fuzzySearch('oliv', undefined).exec();
    }, Error);
    assert.throws(() => {
      nosql.set(data).fuzzySearch('oliv', []).exec();
    }, Error);

    // this will work
    const result = nosql.set(data).fuzzySearch('', ['name']).exec();
    const result2 = nosql.set(data).fuzzySearch('oli', ['name']).exec();
    assert.deepStrictEqual(data, result);
    assert.deepStrictEqual([{ name: 'Betania Ivana Besoli Leiten', location: 'El Salvador' }], result2);
  });
});
