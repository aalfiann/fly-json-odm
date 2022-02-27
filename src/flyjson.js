/*! FlyJson v1.17.1 | (c) 2021 M ABD AZIZ ALFIAN | MIT License | https://github.com/aalfiann/fly-json-odm */

'use strict';

const Helper = require('./helper');
const operator = require('./operator');

/**
 * FlyJson class
 */
class FlyJson extends Helper {
  /**
   * Constructor
   */
  constructor () {
    super();
    this.data1 = [];
    this.data2 = [];
    this.query = [];
    this.result = [];
  }

  /**
   * Sort by
   * @param {string} field    this is the key name
   * @param {bool} reverse    reverse means sort descending
   * @param {fn} primer       this is the primer function
   * @return {fn}
   */
  _sortBy (field, reverse, primer) {
    const key = primer
      ? function (x) { return primer(x[field]); }
      : function (x) { return x[field]; };
    reverse = !reverse ? 1 : -1;
    return (a, b) => {
      a = key(a);
      b = key(b);
      return reverse * ((a > b) - (b > a));
    };
  }

  /**
   * Find disctint in all objects
   * @param {array object} source     this is an array objects
   * @param {object} obj              this is the single current object
   * @return {boolean}
   */
  _findDistinct (source, obj) {
    let found = false;
    for (let i = 0; i < source.length; i++) {
      const count = Object.keys(obj).length;
      let recount = 0;
      this.foreach(obj, function (v, k) {
        if (source[i][k] === v) {
          recount++;
        }
      });
      if (count === recount) {
        found = true;
      }
    }
    return found;
  }

  /**
   * Set Mode for clone array
   * Note: Use this before set(data)
   *
   * @param {string} name     Mode name shallow | deep
   */
  setMode (name) {
    this.mode = name.toString().toLowerCase();
    return this;
  }

  /**
   * Set json array as data table
   * @param {array} data      this is json data
   * @return {this}
   */
  set (data) {
    if (this.isArray(data)) {
      if (this.mode === 'shallow') {
        this.data1 = this.shallowClone(data);
      } else {
        this.data1 = this.deepClone(data);
      }
    } else {
      throw new Error('Set data must be an array contains object.');
    }
    return this;
  }

  /**
   * Insert new data into data table
   * @param {object} obj      this is the object data
   * @return {this}
   */
  insert (obj) {
    if (this.isObject(obj) && !this.isEmptyObject(obj)) {
      this.data1.push(obj);
    } else {
      throw new Error('New value must be an object and not empty');
    }
    return this;
  }

  /**
   * Insert many new data into data table
   * @param {array} data      this is the data array object
   * @return {this}
   */
  insertMany (data) {
    if (this.isArray(data)) {
      const l = data.length;
      for (let i = 0; i < l; i++) {
        if (this.isObject(data[i]) && !this.isEmptyObject(data[i])) {
          this.data1.push(data[i]);
        } else {
          throw new Error('New value must be an object and not empty');
        }
      }
    } else {
      throw new Error('Data must be an array object');
    }
    return this;
  }

  /**
   * Update single data in data table
   * @param {string} key      this is the key name
   * @param {*} value         this is the value of key name
   * @param {object} obj      this is the new value to replace all old data
   * @return {this}
   */
  update (key, value, obj) {
    if (this.isEmpty(key) || this.isEmpty(value)) {
      throw new Error('Key and Value must be defined and value must be unique');
    }
    if (!this.isObject(obj) || this.isEmptyObject(obj)) {
      throw new Error('New value must be an object and not empty');
    }
    const l = this.data1.length;
    for (let i = 0; i < l; i++) {
      if (this.data1[i][key] === value) {
        this.data1.splice(i, 1);
        this.data1.push(Object.assign({ [key]: value }, obj));
        break;
      }
    }
    return this;
  }

  /**
   * Update many data in data table
   * @param {string} key      this is the key name
   * @param {array} data      this is the data array object for update
   * @return {this}
   */
  updateMany (key, data) {
    if (this.isEmpty(key) || !this.isString(key)) {
      throw new Error('Key and Value must be defined and value must be unique');
    }
    if (this.isEmptyArray(data) || !this.isArray(data)) {
      throw new Error('Data to update must be an array object and not empty');
    }
    const l = this.data1.length;
    const len = data.length;
    const newdata = [];
    let result;
    for (let i = 0; i < l; i++) {
      result = false;
      for (let x = 0; x < len; x++) {
        if (this.data1[i][key] === data[x][key]) {
          result = true;
          newdata.push(data[x]);
        }
      }
      if (result === false) {
        newdata.push(this.data1[i]);
      }
    }
    this.data1 = newdata;
    return this;
  }

  /**
   * Modify single data in data table
   * @param {string} key      this is the key name
   * @param {*} value         this is the value of key name
   * @param {object} obj      this is the new value to add or modify old data
   * @return {this}
   */
  modify (key, value, obj) {
    if (this.isEmpty(key) || this.isEmpty(value)) {
      throw new Error('Key and Value must be defined and value must be unique');
    }
    if (!this.isObject(obj) || this.isEmptyObject(obj)) {
      throw new Error('New value must be an object and not empty');
    }
    const l = this.data1.length;
    let data;
    for (let i = 0; i < l; i++) {
      if (this.data1[i][key] === value) {
        data = this.data1[i];
        this.data1.splice(i, 1);
        this.data1.push(Object.assign({ [key]: value }, data, obj));
        break;
      }
    }
    return this;
  }

  /**
   * Modify many data in data table
   * @param {string} key      this is the key name
   * @param {array} data      this is the data array object for modify
   * @return {this}
   */
  modifyMany (key, data) {
    if (this.isEmpty(key) || !this.isString(key)) {
      throw new Error('Key must be defined');
    }
    if (this.isEmptyArray(data) || !this.isArray(data)) {
      throw new Error('Data to modify must be an array object and not empty');
    }
    if (this.mode === 'shallow') {
      throw new Error('Shallow mode is not allowed for modifyMany!');
    }
    const l = this.data1.length;
    const len = data.length;
    const newdata = [];
    let old; let result;
    for (let i = 0; i < l; i++) {
      result = false;
      for (let x = 0; x < len; x++) {
        if (this.data1[i][key] === data[x][key]) {
          result = true;
          old = this.data1[i];
          newdata.push(Object.assign(old, data[x]));
        }
      }
      if (result === false) {
        newdata.push(this.data1[i]);
      }
    }
    this.data1 = newdata;
    return this;
  }

  /**
   * Delete single data in data table
   * @param {string} key      this is the key name
   * @param {*} value         this is the value of key name
   * @return {this}
   */
  delete (key, value) {
    if (!this.isEmpty(key) && !this.isEmpty(value)) {
      const l = this.data1.length;
      for (let i = 0; i < l; i++) {
        if (this.data1[i][key] === value) {
          this.data1.splice(i, 1);
          break;
        }
      }
    } else {
      throw new Error('Key and Value must be defined also remember that Value must be unique.');
    }
    return this;
  }

  /**
   * Delete many data in data table
   * @param {string} key      this is the key name
   * @param {array} data      this is the array of key value to be deleted
   * @return {this}
   */
  deleteMany (key, data) {
    if (!this.isEmpty(key) && !this.isEmptyArray(data)) {
      const l = this.data1.length;
      const len = data.length;
      const newdata = [];
      let result = false;
      for (let i = 0; i < l; i++) {
        result = false;
        for (let x = 0; x < len; x++) {
          if (this.data1[i][key] === data[x]) {
            result = true;
          }
        }
        if (result === false) {
          newdata.push(this.data1[i]);
        }
      }
      this.data1 = newdata;
    } else {
      throw new Error('Key and Data array of key value must be defined.');
    }
    return this;
  }

  /**
   * Filter data by select name key
   * @param {array} key
   * @return {this}
   */
  select (key) {
    if (!this.isEmpty(key) && this.isArray(key) && !this.isEmptyArray(key)) {
      const newdata = [];
      let res;
      const l = this.data1.length;
      const dl = key.length;
      for (let i = 0; i < l; i++) {
        res = {};
        for (let x = 0; x < dl; x++) {
          if (this.data1[i][key[x]] !== undefined) {
            res[key[x]] = this.data1[i][key[x]];
          }
        }
        newdata.push(res);
      }
      this.data1 = newdata;
    }
    return this;
  }

  /**
   * Filter data by where
   * @param  {*} args
   * @return {this}
   */
  where (...args) {
    let result = [];
    if (!this.isEmpty(args[0]) && this.isString(args[0]) && (args[1] !== undefined)) {
      let a;
      let b;
      let c = true;
      let mid;
      if (args.length > 2) {
        mid = args[1];
        a = args[0];
        b = args[2];
        if (!this.isEmpty(args[3])) c = args[3];
      } else {
        mid = '===';
        a = args[0];
        b = args[1];
        c = true;
      }
      mid = mid.toString().toLowerCase();
      const search = { [a]: b };
      let v; let s;
      const self = this;
      const data = this.data1.filter(function (o) {
        return Object.keys(search).every(function (k) {
          v = o[k];
          s = search[k];
          if (c === false && mid !== 'regex') {
            if (!self.isObject(o[k])) {
              v = (o[k]) ? o[k].toString().toLowerCase() : o[k];
            }
            s = search[k].toString().toLowerCase();
          }

          switch (mid) {
            case '=':
              return operator.unstrict(mid, v, s);
            case '!==':
              return v !== s;
            case '==':
              return operator.unstrict(mid, v, s);
            case '!=':
              return operator.unstrict(mid, v, s);
            case '>':
              return v > s;
            case '>=':
              return v >= s;
            case '<':
              return v < s;
            case '<=':
              return v <= s;
            case 'in':
              if (self.isString(v)) {
                return (v.indexOf(s) !== -1);
              }
              result = [];
              if (v) {
                self.foreach(v, function (value) {
                  if (c) {
                    if (value === s) {
                      result.push(value);
                    }
                  } else {
                    if (self.isString(value)) {
                      value = value.toLowerCase();
                    }
                    if (value === s) {
                      result.push(value);
                    }
                  }
                });
              }
              return (result.length > 0);
            case 'in like':
              if (self.isString(v)) {
                return (v.indexOf(s) !== -1);
              }
              result = [];
              if (v) {
                self.foreach(v, function (value) {
                  if (c) {
                    if (self.isString(value)) {
                      if (value.toString().indexOf(s) !== -1) {
                        result.push(value);
                      }
                    }
                  } else {
                    if (self.isString(value)) {
                      value = value.toLowerCase();
                      if (value.indexOf(s) !== -1) {
                        result.push(value);
                      }
                    }
                  }
                });
              }
              return (result.length > 0);
            case 'not in':
              if (self.isString(v)) {
                return (v.indexOf(s) === -1);
              }
              result = [];
              if (v && v.length) {
                self.foreach(v, function (value) {
                  if (value !== s) {
                    result.push(value);
                  }
                });
                return (result.length === v.length);
              } else {
                if (self.isObject(v)) {
                  self.foreach(v, function (value) {
                    if (c) {
                      if (value !== s) {
                        result.push(value);
                      }
                    } else {
                      if (self.isString(value)) {
                        value = value.toLowerCase();
                      }
                      if (value !== s) {
                        result.push(value);
                      }
                    }
                  });
                  return (result.length === Object.keys(v).length);
                }
                return false;
              }
            case 'not in like':
              if (self.isString(v)) {
                return (v.indexOf(s) === -1);
              }
              result = [];
              if (v && v.length) {
                self.foreach(v, function (value) {
                  if (value !== null && value !== undefined) {
                    if (!self.isString(value)) {
                      value = value.toString();
                    }
                  }
                  if (self.isString(value)) {
                    if (value.indexOf(s) === -1) {
                      result.push(value);
                    }
                  } else {
                    result.push(value);
                  }
                });
                return (result.length === v.length);
              } else {
                if (self.isObject(v)) {
                  self.foreach(v, function (value) {
                    if (c) {
                      if (value !== null && value !== undefined) {
                        if (!self.isString(value)) {
                          value = value.toString();
                        }
                      }
                      if (self.isString(value)) {
                        if (value.indexOf(s) === -1) {
                          result.push(value);
                        }
                      } else {
                        result.push(value);
                      }
                    } else {
                      if (value !== null && value !== undefined) {
                        if (!self.isString(value)) {
                          value = value.toString();
                        }
                      }
                      if (self.isString(value)) {
                        value = value.toLowerCase();
                        if (value.indexOf(s) === -1) {
                          result.push(value);
                        }
                      } else {
                        result.push(value);
                      }
                    }
                  });
                  return (result.length === Object.keys(v).length);
                }
                return false;
              }
            case 'not':
              return v !== s;
            case 'like':
              return (v.indexOf(s) !== -1);
            case 'not like':
              return (v.indexOf(s) === -1);
            case 'regex':
              return (s.test(v));
            case 'func':
              return s(v);
            case 'function':
              return s(v);
            default:
              return v === s;
          }
        });
      });
      if (this.scope === 'query') {
        this.result = data;
      } else {
        this.data1 = data;
      }
    }
    return this;
  }

  /**
   * Beginning to build query with condition OR
   * @return {this}
   */
  begin () {
    this.scope = 'query';
    return this;
  }

  /**
   * Add new OR condition
   * @return {this}
   */
  or () {
    if (this.scope === 'query') {
      const l = this.result.length;
      for (let i = 0; i < l; i++) {
        this.query.push(this.result[i]);
      }
    }
    return this;
  }

  /**
   * Ending of build query with condition OR
   * @return {this}
   */
  end () {
    if (this.scope === 'query') {
      const l = this.result.length;
      for (let i = 0; i < l; i++) {
        this.query.push(this.result[i]);
      }
      this.data1 = this.query;
      this.query = [];
      this.result = [];
      this.scope = '';
    }
    return this;
  }

  /**
   * Distinct Data
   * @param {string} fieldName    [Optional] Finding duplicate data by fieldname
   * @return {this}
   */
  distinct (fieldName) {
    fieldName = (fieldName === undefined) ? '' : fieldName;
    if ((!this.isEmpty(fieldName) && !this.isString(fieldName)) || this.isArray(fieldName) || this.isObject(fieldName)) {
      throw new Error('Field name must be string.');
    }
    const array = this.data1;
    const unique = [];
    const result = [];
    const li = array.length;
    if (!this.isEmpty(fieldName) && this.isString(fieldName)) {
      for (let i = 0; i < li; i++) {
        if (array[i][fieldName] !== undefined && !unique[array[i][fieldName]]) {
          result.push(array[i]);
          unique[array[i][fieldName]] = 1;
        }
      }
    } else {
      for (let i = 0; i < li; i++) {
        if (this._findDistinct(unique, array[i]) === false) {
          result.push(array[i]);
          unique.push(array[i]);
        }
      }
    }
    this.data1 = result;
    return this;
  }

  /**
   * Cleanup all temporary object
   * @return {this}
   */
  clean () {
    this.data1 = [];
    this.data2 = [];
    this.query = [];
    this.result = [];
    this.metadata = {};
    this.scope = '';
    this.mode = '';
    this.name = '';
    return this;
  }

  /**
   * Joining two data table
   * @param {string} name     this is the name key for joined data
   * @param {array} data      this is the array of data table
   * @return {this}
   */
  join (name, data) {
    if (!this.isEmpty(name) && this.isString(name)) {
      if (this.isArray(data)) {
        if (this.mode === 'shallow') {
          this.data2 = this.shallowClone(data);
        } else {
          this.data2 = this.deepClone(data);
        }
        this.name = name;
        this.scope = 'join';
      } else {
        throw new Error('Data must be an array object.');
      }
    } else {
      throw new Error('Name is required and it must be string.');
    }
    return this;
  }

  /**
   * Merge two data table
   * @param {string} a    this is identifier key name of data table 1
   * @param {string} b    this is identifier key name of data table 2
   * @return {this}
   */
  merge (a, b) {
    if (this.scope === 'join') {
      if (!this.isEmpty(a) && this.isString(a)) {
        if (!this.isEmpty(b) && this.isString(b)) {
          const indexB = this.data2.reduce((result, item) => {
            result[item[b]] = item;
            return result;
          }, {});
          this.scope = '';
          this.data1 = this.data1.map(item => Object.assign(item, indexB[item[a]]));
        } else {
          throw new Error('Unique identifier key for table 2 is required.');
        }
      } else {
        throw new Error('Unique identifier key for table 1 is required.');
      }
    } else {
      throw new Error('You should join first before doing merge.');
    }
    return this;
  }

  /**
   * Set identifier to joining two data table
   * @param {string} a            this is identifier key name of data table 1
   * @param {string} b            this is identifier key name of data table 2
   * @param {bool} nested         this will make the joined data nested or as array
   * @param {bool} caseSensitive  this will filter the joined data (only work if nested is false)
   * @return {this}
   */
  on (a, b, nested, caseSensitive) {
    const self = this;
    nested = (nested === undefined ? true : nested);
    caseSensitive = (caseSensitive === undefined ? true : caseSensitive);
    if (self.scope === 'join') {
      if (!this.isEmpty(a) && this.isString(a)) {
        if (!this.isEmpty(b) && this.isString(b)) {
          const indexB = self.data2.reduce((result, item) => {
            result[item[b]] = item;
            return result;
          }, {});

          const result = [];
          self.data1.map(function (value, index) {
            const newdata = {};
            const arr = Object.keys(self.data1[index]);
            const l = arr.length;
            for (let i = 0; i < l; i++) {
              if (arr[i] === a) {
                if (self.name === arr[i]) {
                  if (nested) {
                    newdata[arr[i]] = indexB[self.data1[index][arr[i]]];
                  } else {
                    newdata[arr[i]] = self.data2.filter(function (item) {
                      if (caseSensitive) {
                        return item[b] === value[arr[i]];
                      } else {
                        if (self.isString(item[b]) && self.isString(value[arr[i]])) {
                          return item[b].toLowerCase() === value[arr[i]].toLowerCase();
                        }
                        return item[b] === value[arr[i]];
                      }
                    });
                  }
                } else {
                  if (nested) {
                    newdata[self.name] = indexB[self.data1[index][arr[i]]];
                  } else {
                    newdata[self.name] = self.data2.filter(function (item) {
                      if (caseSensitive) {
                        return item[b] === value[arr[i]];
                      } else {
                        if (self.isString(item[b]) && self.isString(value[arr[i]])) {
                          return item[b].toLowerCase() === value[arr[i]].toLowerCase();
                        }
                        return item[b] === value[arr[i]];
                      }
                    });
                  }
                  newdata[arr[i]] = value[arr[i]];
                }
              } else {
                newdata[arr[i]] = value[arr[i]];
              }
            }
            return result.push(newdata);
          });
          self.scope = '';
          self.data1 = result;
        } else {
          throw new Error('Unique identifier key for table 2 is required.');
        }
      } else {
        throw new Error('Unique identifier key for table 1 is required.');
      }
    } else {
      throw new Error('You should join first before doing join on.');
    }
    return this;
  }

  /**
   * Sort data ascending or descending by key name
   * @param {string} name     this is the name key
   * @param {bool} desc       this is the sort order
   * @param {primer} primer   this is the primer function
   * @return {this}
   */
  orderBy (name, desc, primer) {
    desc = (desc === undefined ? false : desc);
    if (!this.isEmpty(name) && this.isString(name) && this.isBoolean(desc)) {
      this.data1.sort(this._sortBy(name, desc, primer));
    }
    return this;
  }

  /**
   * Group detail data by key name
   * @param {string} name
   * @param {string} groupName
   * @return {this}
   */
  groupDetail (name, groupName = '') {
    if (this.isEmpty(name) || !this.isString(name)) {
      throw new Error('name is required and must be string.');
    }
    if (!this.isString(groupName)) {
      throw new Error('group name must be string.');
    }
    const data = this.data1.reduce((objectsByKeyValue, obj) => {
      const value = obj[name];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
    const group = [];
    if (groupName) {
      group.push({ [groupName]: data });
    } else {
      group.push({ [name]: data });
    }
    this.data1 = group;
    return this;
  }

  /**
   * Group data by name or with sum by field name
   * @param {string} name
   * @param {array} sumField
   * @return {this}
   */
  groupBy (name, sumField = []) {
    if (this.isEmpty(name) || !this.isString(name)) {
      throw new Error('name is required and must be string.');
    }
    if (!this.isArray(sumField)) {
      throw new Error('field name for sum must be array.');
    }
    const l = sumField.length;
    const data = this.data1.reduce(function (res, obj) {
      obj.item_count = 1;
      if (!(obj[name] in res)) {
        res.__array.push(res[obj[name]] = obj);
      } else {
        for (let i = 0; i < l; i++) {
          res[obj[name]][sumField[i]] += obj[sumField[i]];
        }
        res[obj[name]].item_count += 1;
      }
      // average
      for (let i = 0; i < l; i++) {
        res[obj[name]]['average_' + sumField[i]] = (res[obj[name]][sumField[i]] / res[obj[name]].item_count);
      }
      return res;
    }, { __array: [] });
    this.data1 = data.__array;
    return this;
  }

  /**
   * Skip data by size
   * @param {string|integer} size
   * @return {this}
   */
  skip (size) {
    if (!this.isEmpty(size) && this.isInteger(size)) {
      this.data1 = this.data1.slice(size);
    }
    return this;
  }

  /**
   * Take data by size
   * @param {string|integer} size
   * @return {this}
   */
  take (size) {
    if (!this.isEmpty(size)) {
      size = parseInt(size);
      if (this.isInteger(size)) {
        if (this.data1.length > size) {
          this.data1.length = size;
        }
      }
    }
    return this;
  }

  /**
   * Paginate data by page and pageSize
   * @param {string|integer} size
   * @return {this}
   */
  paginate (page, pageSize) {
    if (!this.isEmpty(page) && !this.isEmpty(pageSize)) {
      page = parseInt(page);
      pageSize = parseInt(pageSize);
      if (this.isInteger(page) && this.isInteger(pageSize)) {
        const count = this.data1.length;
        --page; // because pages logically start with 1, but technically with 0
        this.data1 = this.data1.slice(page * pageSize, (page + 1) * pageSize);
        this.metadata = {
          page: (page + 1),
          page_size: pageSize,
          total_page: Math.ceil(count / pageSize),
          total_records: count
        };
      }
    }
    return this;
  }

  /**
   * Make asynchronous process with Promise
   * @param {*} fn
   * @return {this}
   */
  promisify (fn) {
    const self = this;
    return new Promise(function (resolve, reject) {
      try {
        resolve(fn.call(self, self));
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Return output data table
   * @return {array}
   */
  exec () {
    this.mode = '';
    return this.data1;
  }
}

module.exports = FlyJson;
