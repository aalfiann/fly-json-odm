// The reason we allow eval because for custom function at json transform feature.
/* eslint no-eval:0 */

'use strict';

/**
 * Helper class
 */
class Helper {
  /**
   * Determine value is string
   * @param {*} value
   * @return {bool}
   */
  isString (value) {
    return typeof value === 'string' || value instanceof String;
  }

  /**
   * Determine value is integer
   * @param {*} value
   * @return {bool}
   */
  isInteger (value) {
    return Number.isInteger(value);
  }

  /**
   * Determine value is boolean
   * @param {*} value
   * @return {bool}
   */
  isBoolean (value) {
    return typeof value === 'boolean' || (typeof value === 'object' && value !== null && typeof value.valueOf() === 'boolean');
  }

  /**
   * Determine value is array
   * @param {*} value
   * @return {bool}
   */
  isArray (value) {
    if (value === undefined || value === '') {
      return false;
    }
    return value && value !== '' && typeof value === 'object' && value.constructor === Array;
  }

  /**
   * Determine value is an array object based 5 part items.
   * We don't check all items to keep maintain performance.
   * @param {*} value
   * @returns {bool}
   */
  fastCheckArrayObject (value) {
    if (!this.isArray(value)) return false;
    const count = value.length;
    if (count > 0) {
      const first = 0;
      const middle = Math.floor(count / 2);
      const last = (count - 1);
      const fquarter = Math.floor(middle / 2);
      const lquarter = Math.floor((middle + last) / 2);
      if (typeof value[first] !== 'object') return false;
      if ((fquarter > first) && typeof value[fquarter] !== 'object') return false;
      if ((middle > fquarter) && typeof value[middle] !== 'object') return false;
      if ((lquarter > middle) && typeof value[lquarter] !== 'object') return false;
      if (typeof value[last] !== 'object') return false;
    }
    return true;
  }

  /**
   * Determine value is object
   * @param {*} value
   * @return {bool}
   */
  isObject (value) {
    if (value === undefined || value === '') {
      return false;
    }
    return value && typeof value === 'object' && value.constructor === Object;
  }

  /**
   * Determine value is empty
   * @param {*} value
   * @return {bool}
   */
  isEmpty (value) {
    return (value === undefined || value === null || value === '');
  }

  /**
   * Determine value is empty and array
   * @param {*} value
   * @return {bool}
   */
  isEmptyArray (value) {
    return (value === undefined || value === null || value.length === 0);
  }

  /**
   * Determine object value is empty
   * @param {*} value
   * @return {bool}
   */
  isEmptyObject (value) {
    return (value === undefined || value === null || (Object.keys(value).length === 0 && value.constructor === Object));
  }

  /**
   * Foreach for an array or object
   * @param {array|object} data
   * @param {callback} callback
   */
  foreach (data, callback) {
    if (this.isObject(data)) {
      const keys = Object.keys(data);
      const values = Object.keys(data).map(function (e) {
        return data[e];
      });
      let i = 0; const l = keys.length;
      for (i; i < l; i++) {
        callback(values[i], keys[i]);
      }
    } else {
      if (Array.isArray(data)) {
        let i = 0; const l = data.length;
        for (i; i < l; i++) {
          callback(data[i], i);
        }
      } else {
        throw new Error('Failed to iteration. Data is not an array or object.');
      }
    }
  }

  /**
   * Blocking test for asynchronous
   * @param {integer} ms      [Optional] this is miliseconds value for event block. Default value is 1000 ms.
   * @return {int}
   */
  blockingTest (ms) {
    ms = (ms === undefined ? 1000 : ms);
    const start = Date.now();
    const time = start + ms;
    while (Date.now() < time) {
      // empty progress
    }
    return start;
  }

  /**
   * Safe JSON.stringify to avoid type error converting circular structure to json
   * @param {object} value        this is the json object
   * @param {*} space
   * @return {string}
   */
  safeStringify (value, space) {
    let cache = [];

    const output = JSON.stringify(value, function (key, value) {
      // filters vue.js internal properties
      if (key && key.length > 0 && (key.charAt(0) === '$' || key.charAt(0) === '_')) {
        return;
      }

      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }

      return value;
    }, space);

    cache = null; // Enable garbage collection

    return output;
  }

  /**
   * Shallow clone an array
   * @param {array} array
   * @return {array}
   */
  shallowClone (array) {
    return [...array];
  }

  /**
   * Very safe deep clone an array
   * @param {array} array
   * @return {array}
   */
  deepClone (array) {
    let clone, i;
    if (typeof array !== 'object' || !array) return array;
    if (Object.prototype.toString.apply(array) === '[object Array]') {
      clone = [];
      const len = array.length;
      for (i = 0; i < len; i++) clone[i] = this.deepClone(array[i]);
      return clone;
    }
    clone = {};
    for (i in array) if (Object.prototype.hasOwnProperty.call(array, i)) clone[i] = this.deepClone(array[i]);
    return clone;
  }

  /**
   * jsonTransform for restructuring and performing operations on JSON
   * @param {object} data
   * @param {object} map
   * @return {array}
   */
  jsonTransform (data, map) {
    const helper = new Helper();
    return {

      defaultOrNull: function (key) {
        return key && map.defaults ? map.defaults[key] : null;
      },

      getValue: function (obj, key, newKey) {
        if (typeof obj === 'undefined') {
          return;
        }

        if (key === undefined || key === null || key === '') {
          return obj;
        }

        let value = obj;
        let keys = null;

        keys = key.split('.');
        let i = 0;
        const l = keys.length;
        for (i; i < l; i++) {
          if (typeof (value) !== 'undefined' && keys[i] in value) {
            value = value[keys[i]];
          } else {
            return this.defaultOrNull(newKey);
          }
        }

        return value;
      },

      setValue: function (obj, key, newValue) {
        if (typeof obj === 'undefined' || key === '' || key === undefined || key == null) {
          return;
        }

        const keys = key.split('.');
        let target = obj;
        let i = 0;
        const l = keys.length;
        for (i; i < l; i++) {
          if (i === keys.length - 1) {
            target[keys[i]] = newValue;
            return;
          }

          if (keys[i] in target) {
            target = target[keys[i]];
          } else {
            return;
          }
        }
      },

      getList: function () {
        return this.getValue(data, map.list);
      },

      make: function (context) {
        const value = this.getValue(data, map.list);
        let normalized = [];

        if (!helper.isEmptyObject(value)) {
          const list = this.getList();
          normalized = map.item ? list.map(this.iterator.bind(this, map.item)) : list;
          normalized = this.operate.bind(this, normalized)(context);
          normalized = this.each(normalized, context);
          normalized = this.removeAll(normalized);
        }

        return normalized;
      },

      removeAll: function (data) {
        if (Array.isArray(map.remove)) {
          helper.foreach(data, this.remove);
        }
        return data;
      },

      remove: function (item) {
        let i = 0;
        const l = map.remove.length;
        for (i; i < l; i++) {
          delete item[map.remove[i]];
        }
        return item;
      },

      operate: function (data, context) {
        if (map.operate) {
          helper.foreach(map.operate, function (method) {
            data = data.map(function (item) {
              let fn;
              if (typeof method.run === 'string') {
                fn = eval(method.run);
              } else {
                fn = method.run;
              }
              this.setValue(item, method.on, fn(this.getValue(item, method.on), context));
              return item;
            }.bind(this));
          }.bind(this));
        }
        return data;
      },

      each: function (data, context) {
        if (map.each) {
          data.forEach(function (value, index, collection) {
            return map.each(value, index, collection, context);
          });
        }
        return data;
      },

      iterator: function (map, item) {
        const obj = {};

        // to support simple arrays with recursion
        if (typeof map === 'string') {
          return this.getValue(item, map);
        }

        helper.foreach(map, function (oldkey, newkey) {
          if (typeof oldkey === 'string' && oldkey.length > 0) {
            obj[newkey] = this.getValue(item, oldkey, newkey);
          } else if (Array.isArray(oldkey)) {
            const array = oldkey.map(function (item, map) { return this.iterator(map, item); }.bind(this, item));// need to swap arguments for bind
            obj[newkey] = array;
          } else if (typeof oldkey === 'object') {
            const bound = this.iterator.bind(this, oldkey, item);
            obj[newkey] = bound();
          } else {
            obj[newkey] = '';
          }
        }.bind(this));

        return obj;
      }

    };
  }

  /**
   * Get Descendant Property in json object
   * @param {array|object} object
   * @param {string} path
   * @param {array} list
   * @returns {array}
   */
  getDescendantProperty (object, path, list = []) {
    let firstSegment;
    let remaining;
    let dotIndex;
    let value;
    let index;
    let length;
    if (path) {
      dotIndex = path.indexOf('.');
      if (dotIndex === -1) {
        firstSegment = path;
      } else {
        firstSegment = path.slice(0, dotIndex);
        remaining = path.slice(dotIndex + 1);
      }
      value = object[firstSegment];
      if (value !== null && typeof value !== 'undefined') {
        if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
          list.push(value);
        } else if (Object.prototype.toString.call(value) === '[object Array]') {
          for (index = 0, length = value.length; index < length; index++) {
            this.getDescendantProperty(value[index], remaining, list);
          }
        } else if (remaining) {
          this.getDescendantProperty(value, remaining, list);
        }
      }
    } else {
      list.push(object);
    }
    return list;
  }

  /**
   * Fuzzy
   * @param {array} haystack        List data array or object.
   * @param {string|number} query   [Optional] Text or number to search.
   * @param {array} keys            [Optional] Keys is required if the list is array object. Default is empty array.
   * @param {boolean} caseSensitive [Optional] Search with match case sensitive. Default is false.
   * @param {boolean} sort          [Optional] When true it will sort the results by best match. Default is false.
   * @returns {array}
   */
  fuzzy (haystack, query = '', keys = [], caseSensitive = false, sort = false) {
    if (query === '') return haystack;
    const results = [];
    for (let i = 0; i < haystack.length; i++) {
      const item = haystack[i];
      if (keys.length === 0) {
        const score = this._fuzzyIsMatch(item, query, caseSensitive);
        if (score) {
          results.push({ item, score });
        }
      } else {
        for (let y = 0; y < keys.length; y++) {
          const propertyValues = this.getDescendantProperty(item, keys[y]);
          let found = false;
          for (let z = 0; z < propertyValues.length; z++) {
            const score = this._fuzzyIsMatch(propertyValues[z], query, caseSensitive);
            if (score) {
              found = true;
              results.push({ item, score });
              break;
            }
          }
          if (found) {
            break;
          }
        }
      }
    }
    if (sort) {
      results.sort((a, b) => a.score - b.score);
    }
    return results.map(result => result.item);
  }

  /**
   * Is Match: Giving score depend on best matches.
   * @param {string|number} item    Value from data list
   * @param {string|number} query   Value from search
   * @param {boolean} caseSensitive Search with match case sensitive.
   * @returns {number}
   */
  _fuzzyIsMatch (item, query, caseSensitive) {
    item = String(item);
    query = String(query);
    if (!caseSensitive) {
      item = item.toLocaleLowerCase();
      query = query.toLocaleLowerCase();
    }
    const indexes = this._fuzzyNearestIndexesFor(item, query);
    if (!indexes) {
      return false;
    }
    // Exact matches should be first.
    if (item === query) {
      return 1;
    }
    // If we hit abbreviation it should go before others (except exact match).
    const abbreviationIndicies = [0];
    for (let i = 0; i < item.length; i++) {
      if (item[i] === ' ') abbreviationIndicies.push(i + 1);
    }
    if (indexes.reduce((accumulator, currentValue) => abbreviationIndicies.includes(currentValue) && accumulator, true)) {
      return 2 + indexes.reduce((accumulator, currentValue, i) => {
        return accumulator + abbreviationIndicies.indexOf(currentValue);
      }, 0);
    }
    // If we have more than 2 letters, matches close to each other should be first.
    if (indexes.length > 1) {
      return 3 + (indexes[indexes.length - 1] - indexes[0]);
    }
    // Matches closest to the start of the string should be first.
    return 3 + indexes[0];
  }

  /**
   * Nearest Indexed For Value and Search
   * @param {string} item   Value from data list
   * @param {string} query  Value from search
   * @returns {array} number
   */
  _fuzzyNearestIndexesFor (item, query) {
    const letters = query.split('');
    let indexes = [];
    const indexesOfFirstLetter = this._fuzzyIndexesOfFirstLetter(item, query);
    indexesOfFirstLetter.forEach((startingIndex, loopingIndex) => {
      let index = startingIndex + 1;
      indexes[loopingIndex] = [startingIndex];
      for (let i = 1; i < letters.length; i++) {
        const letter = letters[i];
        index = item.indexOf(letter, index);
        if (index === -1) {
          indexes[loopingIndex] = false;
          break;
        }
        indexes[loopingIndex].push(index);
        index++;
      }
    });
    indexes = indexes.filter(letterIndexes => letterIndexes !== false);
    if (!indexes.length) {
      return false;
    }
    return indexes.sort((a, b) => {
      if (a.length === 1) {
        return a[0] - b[0];
      }
      a = a[a.length - 1] - a[0];
      b = b[b.length - 1] - b[0];
      return a - b;
    })[0];
  }

  /**
   * Indexes Of First Letter
   * @param {string} item   Value from data list
   * @param {string} query  Value from search
   * @returns {array} number
   */
  _fuzzyIndexesOfFirstLetter (item, query) {
    const match = query[0];
    return item.split('').map((letter, index) => {
      if (letter !== match) {
        return false;
      }
      return index;
    }).filter(index => index !== false);
  }
}

module.exports = Helper;
