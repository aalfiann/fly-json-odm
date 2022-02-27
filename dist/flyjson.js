"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;

    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }

    g.FlyJson = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }

          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }

        return n[i].exports;
      }

      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
        o(t[i]);
      }

      return o;
    }

    return r;
  }()({
    1: [function (require, module, exports) {
      /*! FlyJson v1.17.1 | (c) 2021 M ABD AZIZ ALFIAN | MIT License | https://github.com/aalfiann/fly-json-odm */
      'use strict';

      var Helper = require('./helper');

      var operator = require('./operator');
      /**
       * FlyJson class
       */


      var FlyJson = /*#__PURE__*/function (_Helper) {
        _inherits(FlyJson, _Helper);

        var _super = _createSuper(FlyJson);

        /**
         * Constructor
         */
        function FlyJson() {
          var _this;

          _classCallCheck(this, FlyJson);

          _this = _super.call(this);
          _this.data1 = [];
          _this.data2 = [];
          _this.query = [];
          _this.result = [];
          return _this;
        }
        /**
         * Sort by
         * @param {string} field    this is the key name
         * @param {bool} reverse    reverse means sort descending
         * @param {fn} primer       this is the primer function
         * @return {fn}
         */


        _createClass(FlyJson, [{
          key: "_sortBy",
          value: function _sortBy(field, reverse, primer) {
            var key = primer ? function (x) {
              return primer(x[field]);
            } : function (x) {
              return x[field];
            };
            reverse = !reverse ? 1 : -1;
            return function (a, b) {
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

        }, {
          key: "_findDistinct",
          value: function _findDistinct(source, obj) {
            var _this2 = this;

            var found = false;

            var _loop = function _loop(i) {
              var count = Object.keys(obj).length;
              var recount = 0;

              _this2.foreach(obj, function (v, k) {
                if (source[i][k] === v) {
                  recount++;
                }
              });

              if (count === recount) {
                found = true;
              }
            };

            for (var i = 0; i < source.length; i++) {
              _loop(i);
            }

            return found;
          }
          /**
           * Set Mode for clone array
           * Note: Use this before set(data)
           *
           * @param {string} name     Mode name shallow | deep
           */

        }, {
          key: "setMode",
          value: function setMode(name) {
            this.mode = name.toString().toLowerCase();
            return this;
          }
          /**
           * Set json array as data table
           * @param {array} data      this is json data
           * @return {this}
           */

        }, {
          key: "set",
          value: function set(data) {
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

        }, {
          key: "insert",
          value: function insert(obj) {
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

        }, {
          key: "insertMany",
          value: function insertMany(data) {
            if (this.isArray(data)) {
              var l = data.length;

              for (var i = 0; i < l; i++) {
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

        }, {
          key: "update",
          value: function update(key, value, obj) {
            if (this.isEmpty(key) || this.isEmpty(value)) {
              throw new Error('Key and Value must be defined and value must be unique');
            }

            if (!this.isObject(obj) || this.isEmptyObject(obj)) {
              throw new Error('New value must be an object and not empty');
            }

            var l = this.data1.length;

            for (var i = 0; i < l; i++) {
              if (this.data1[i][key] === value) {
                this.data1.splice(i, 1);
                this.data1.push(Object.assign(_defineProperty({}, key, value), obj));
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

        }, {
          key: "updateMany",
          value: function updateMany(key, data) {
            if (this.isEmpty(key) || !this.isString(key)) {
              throw new Error('Key and Value must be defined and value must be unique');
            }

            if (this.isEmptyArray(data) || !this.isArray(data)) {
              throw new Error('Data to update must be an array object and not empty');
            }

            var l = this.data1.length;
            var len = data.length;
            var newdata = [];
            var result;

            for (var i = 0; i < l; i++) {
              result = false;

              for (var x = 0; x < len; x++) {
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

        }, {
          key: "modify",
          value: function modify(key, value, obj) {
            if (this.isEmpty(key) || this.isEmpty(value)) {
              throw new Error('Key and Value must be defined and value must be unique');
            }

            if (!this.isObject(obj) || this.isEmptyObject(obj)) {
              throw new Error('New value must be an object and not empty');
            }

            var l = this.data1.length;
            var data;

            for (var i = 0; i < l; i++) {
              if (this.data1[i][key] === value) {
                data = this.data1[i];
                this.data1.splice(i, 1);
                this.data1.push(Object.assign(_defineProperty({}, key, value), data, obj));
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

        }, {
          key: "modifyMany",
          value: function modifyMany(key, data) {
            if (this.isEmpty(key) || !this.isString(key)) {
              throw new Error('Key must be defined');
            }

            if (this.isEmptyArray(data) || !this.isArray(data)) {
              throw new Error('Data to modify must be an array object and not empty');
            }

            if (this.mode === 'shallow') {
              throw new Error('Shallow mode is not allowed for modifyMany!');
            }

            var l = this.data1.length;
            var len = data.length;
            var newdata = [];
            var old;
            var result;

            for (var i = 0; i < l; i++) {
              result = false;

              for (var x = 0; x < len; x++) {
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

        }, {
          key: "delete",
          value: function _delete(key, value) {
            if (!this.isEmpty(key) && !this.isEmpty(value)) {
              var l = this.data1.length;

              for (var i = 0; i < l; i++) {
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

        }, {
          key: "deleteMany",
          value: function deleteMany(key, data) {
            if (!this.isEmpty(key) && !this.isEmptyArray(data)) {
              var l = this.data1.length;
              var len = data.length;
              var newdata = [];
              var result = false;

              for (var i = 0; i < l; i++) {
                result = false;

                for (var x = 0; x < len; x++) {
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

        }, {
          key: "select",
          value: function select(key) {
            if (!this.isEmpty(key) && this.isArray(key) && !this.isEmptyArray(key)) {
              var newdata = [];
              var res;
              var l = this.data1.length;
              var dl = key.length;

              for (var i = 0; i < l; i++) {
                res = {};

                for (var x = 0; x < dl; x++) {
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

        }, {
          key: "where",
          value: function where() {
            var result = [];

            if (!this.isEmpty(arguments.length <= 0 ? undefined : arguments[0]) && this.isString(arguments.length <= 0 ? undefined : arguments[0]) && (arguments.length <= 1 ? undefined : arguments[1]) !== undefined) {
              var a;
              var b;
              var c = true;
              var mid;

              if (arguments.length > 2) {
                mid = arguments.length <= 1 ? undefined : arguments[1];
                a = arguments.length <= 0 ? undefined : arguments[0];
                b = arguments.length <= 2 ? undefined : arguments[2];
                if (!this.isEmpty(arguments.length <= 3 ? undefined : arguments[3])) c = arguments.length <= 3 ? undefined : arguments[3];
              } else {
                mid = '===';
                a = arguments.length <= 0 ? undefined : arguments[0];
                b = arguments.length <= 1 ? undefined : arguments[1];
                c = true;
              }

              mid = mid.toString().toLowerCase();

              var search = _defineProperty({}, a, b);

              var v;
              var s;

              var _self = this;

              var data = this.data1.filter(function (o) {
                return Object.keys(search).every(function (k) {
                  v = o[k];
                  s = search[k];

                  if (c === false && mid !== 'regex') {
                    if (!_self.isObject(o[k])) {
                      v = o[k] ? o[k].toString().toLowerCase() : o[k];
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
                      if (_self.isString(v)) {
                        return v.indexOf(s) !== -1;
                      }

                      result = [];

                      if (v) {
                        _self.foreach(v, function (value) {
                          if (c) {
                            if (value === s) {
                              result.push(value);
                            }
                          } else {
                            if (_self.isString(value)) {
                              value = value.toLowerCase();
                            }

                            if (value === s) {
                              result.push(value);
                            }
                          }
                        });
                      }

                      return result.length > 0;

                    case 'in like':
                      if (_self.isString(v)) {
                        return v.indexOf(s) !== -1;
                      }

                      result = [];

                      if (v) {
                        _self.foreach(v, function (value) {
                          if (c) {
                            if (_self.isString(value)) {
                              if (value.toString().indexOf(s) !== -1) {
                                result.push(value);
                              }
                            }
                          } else {
                            if (_self.isString(value)) {
                              value = value.toLowerCase();

                              if (value.indexOf(s) !== -1) {
                                result.push(value);
                              }
                            }
                          }
                        });
                      }

                      return result.length > 0;

                    case 'not in':
                      if (_self.isString(v)) {
                        return v.indexOf(s) === -1;
                      }

                      result = [];

                      if (v && v.length) {
                        _self.foreach(v, function (value) {
                          if (value !== s) {
                            result.push(value);
                          }
                        });

                        return result.length === v.length;
                      } else {
                        if (_self.isObject(v)) {
                          _self.foreach(v, function (value) {
                            if (c) {
                              if (value !== s) {
                                result.push(value);
                              }
                            } else {
                              if (_self.isString(value)) {
                                value = value.toLowerCase();
                              }

                              if (value !== s) {
                                result.push(value);
                              }
                            }
                          });

                          return result.length === Object.keys(v).length;
                        }

                        return false;
                      }

                    case 'not in like':
                      if (_self.isString(v)) {
                        return v.indexOf(s) === -1;
                      }

                      result = [];

                      if (v && v.length) {
                        _self.foreach(v, function (value) {
                          if (value !== null && value !== undefined) {
                            if (!_self.isString(value)) {
                              value = value.toString();
                            }
                          }

                          if (_self.isString(value)) {
                            if (value.indexOf(s) === -1) {
                              result.push(value);
                            }
                          } else {
                            result.push(value);
                          }
                        });

                        return result.length === v.length;
                      } else {
                        if (_self.isObject(v)) {
                          _self.foreach(v, function (value) {
                            if (c) {
                              if (value !== null && value !== undefined) {
                                if (!_self.isString(value)) {
                                  value = value.toString();
                                }
                              }

                              if (_self.isString(value)) {
                                if (value.indexOf(s) === -1) {
                                  result.push(value);
                                }
                              } else {
                                result.push(value);
                              }
                            } else {
                              if (value !== null && value !== undefined) {
                                if (!_self.isString(value)) {
                                  value = value.toString();
                                }
                              }

                              if (_self.isString(value)) {
                                value = value.toLowerCase();

                                if (value.indexOf(s) === -1) {
                                  result.push(value);
                                }
                              } else {
                                result.push(value);
                              }
                            }
                          });

                          return result.length === Object.keys(v).length;
                        }

                        return false;
                      }

                    case 'not':
                      return v !== s;

                    case 'like':
                      return v.indexOf(s) !== -1;

                    case 'not like':
                      return v.indexOf(s) === -1;

                    case 'regex':
                      return s.test(v);

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

        }, {
          key: "begin",
          value: function begin() {
            this.scope = 'query';
            return this;
          }
          /**
           * Add new OR condition
           * @return {this}
           */

        }, {
          key: "or",
          value: function or() {
            if (this.scope === 'query') {
              var l = this.result.length;

              for (var i = 0; i < l; i++) {
                this.query.push(this.result[i]);
              }
            }

            return this;
          }
          /**
           * Ending of build query with condition OR
           * @return {this}
           */

        }, {
          key: "end",
          value: function end() {
            if (this.scope === 'query') {
              var l = this.result.length;

              for (var i = 0; i < l; i++) {
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

        }, {
          key: "distinct",
          value: function distinct(fieldName) {
            fieldName = fieldName === undefined ? '' : fieldName;

            if (!this.isEmpty(fieldName) && !this.isString(fieldName) || this.isArray(fieldName) || this.isObject(fieldName)) {
              throw new Error('Field name must be string.');
            }

            var array = this.data1;
            var unique = [];
            var result = [];
            var li = array.length;

            if (!this.isEmpty(fieldName) && this.isString(fieldName)) {
              for (var i = 0; i < li; i++) {
                if (array[i][fieldName] !== undefined && !unique[array[i][fieldName]]) {
                  result.push(array[i]);
                  unique[array[i][fieldName]] = 1;
                }
              }
            } else {
              for (var _i = 0; _i < li; _i++) {
                if (this._findDistinct(unique, array[_i]) === false) {
                  result.push(array[_i]);
                  unique.push(array[_i]);
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

        }, {
          key: "clean",
          value: function clean() {
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

        }, {
          key: "join",
          value: function join(name, data) {
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

        }, {
          key: "merge",
          value: function merge(a, b) {
            if (this.scope === 'join') {
              if (!this.isEmpty(a) && this.isString(a)) {
                if (!this.isEmpty(b) && this.isString(b)) {
                  var indexB = this.data2.reduce(function (result, item) {
                    result[item[b]] = item;
                    return result;
                  }, {});
                  this.scope = '';
                  this.data1 = this.data1.map(function (item) {
                    return Object.assign(item, indexB[item[a]]);
                  });
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

        }, {
          key: "on",
          value: function on(a, b, nested, caseSensitive) {
            var self = this;
            nested = nested === undefined ? true : nested;
            caseSensitive = caseSensitive === undefined ? true : caseSensitive;

            if (self.scope === 'join') {
              if (!this.isEmpty(a) && this.isString(a)) {
                if (!this.isEmpty(b) && this.isString(b)) {
                  var indexB = self.data2.reduce(function (result, item) {
                    result[item[b]] = item;
                    return result;
                  }, {});
                  var result = [];
                  self.data1.map(function (value, index) {
                    var newdata = {};
                    var arr = Object.keys(self.data1[index]);
                    var l = arr.length;

                    var _loop2 = function _loop2(i) {
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
                    };

                    for (var i = 0; i < l; i++) {
                      _loop2(i);
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

        }, {
          key: "orderBy",
          value: function orderBy(name, desc, primer) {
            desc = desc === undefined ? false : desc;

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

        }, {
          key: "groupDetail",
          value: function groupDetail(name) {
            var groupName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            if (this.isEmpty(name) || !this.isString(name)) {
              throw new Error('name is required and must be string.');
            }

            if (!this.isString(groupName)) {
              throw new Error('group name must be string.');
            }

            var data = this.data1.reduce(function (objectsByKeyValue, obj) {
              var value = obj[name];
              objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
              return objectsByKeyValue;
            }, {});
            var group = [];

            if (groupName) {
              group.push(_defineProperty({}, groupName, data));
            } else {
              group.push(_defineProperty({}, name, data));
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

        }, {
          key: "groupBy",
          value: function groupBy(name) {
            var sumField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            if (this.isEmpty(name) || !this.isString(name)) {
              throw new Error('name is required and must be string.');
            }

            if (!this.isArray(sumField)) {
              throw new Error('field name for sum must be array.');
            }

            var l = sumField.length;
            var data = this.data1.reduce(function (res, obj) {
              obj.item_count = 1;

              if (!(obj[name] in res)) {
                res.__array.push(res[obj[name]] = obj);
              } else {
                for (var i = 0; i < l; i++) {
                  res[obj[name]][sumField[i]] += obj[sumField[i]];
                }

                res[obj[name]].item_count += 1;
              } // average


              for (var _i2 = 0; _i2 < l; _i2++) {
                res[obj[name]]['average_' + sumField[_i2]] = res[obj[name]][sumField[_i2]] / res[obj[name]].item_count;
              }

              return res;
            }, {
              __array: []
            });
            this.data1 = data.__array;
            return this;
          }
          /**
           * Skip data by size
           * @param {string|integer} size
           * @return {this}
           */

        }, {
          key: "skip",
          value: function skip(size) {
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

        }, {
          key: "take",
          value: function take(size) {
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

        }, {
          key: "paginate",
          value: function paginate(page, pageSize) {
            if (!this.isEmpty(page) && !this.isEmpty(pageSize)) {
              page = parseInt(page);
              pageSize = parseInt(pageSize);

              if (this.isInteger(page) && this.isInteger(pageSize)) {
                var count = this.data1.length;
                --page; // because pages logically start with 1, but technically with 0

                this.data1 = this.data1.slice(page * pageSize, (page + 1) * pageSize);
                this.metadata = {
                  page: page + 1,
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

        }, {
          key: "promisify",
          value: function promisify(fn) {
            var self = this;
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

        }, {
          key: "exec",
          value: function exec() {
            this.mode = '';
            return this.data1;
          }
        }]);

        return FlyJson;
      }(Helper);

      module.exports = FlyJson;
    }, {
      "./helper": 2,
      "./operator": 3
    }],
    2: [function (require, module, exports) {
      // The reason we allow eval because for custom function at json transform feature.

      /* eslint no-eval:0 */
      'use strict';
      /**
       * Helper class
       */

      var Helper = /*#__PURE__*/function () {
        function Helper() {
          _classCallCheck(this, Helper);
        }

        _createClass(Helper, [{
          key: "isString",
          value:
          /**
           * Determine value is string
           * @param {*} value
           * @return {bool}
           */
          function isString(value) {
            return typeof value === 'string' || value instanceof String;
          }
          /**
           * Determine value is integer
           * @param {*} value
           * @return {bool}
           */

        }, {
          key: "isInteger",
          value: function isInteger(value) {
            return Number.isInteger(value);
          }
          /**
           * Determine value is boolean
           * @param {*} value
           * @return {bool}
           */

        }, {
          key: "isBoolean",
          value: function isBoolean(value) {
            return typeof value === 'boolean' || _typeof(value) === 'object' && value !== null && typeof value.valueOf() === 'boolean';
          }
          /**
           * Determine value is array
           * @param {*} value
           * @return {bool}
           */

        }, {
          key: "isArray",
          value: function isArray(value) {
            if (value === undefined || value === '') {
              return false;
            }

            return value && value !== '' && _typeof(value) === 'object' && value.constructor === Array;
          }
          /**
           * Determine value is object
           * @param {*} value
           * @return {bool}
           */

        }, {
          key: "isObject",
          value: function isObject(value) {
            if (value === undefined || value === '') {
              return false;
            }

            return value && _typeof(value) === 'object' && value.constructor === Object;
          }
          /**
           * Determine value is empty
           * @param {*} value
           * @return {bool}
           */

        }, {
          key: "isEmpty",
          value: function isEmpty(value) {
            return value === undefined || value === null || value === '';
          }
          /**
           * Determine value is empty and array
           * @param {*} value
           * @return {bool}
           */

        }, {
          key: "isEmptyArray",
          value: function isEmptyArray(value) {
            return value === undefined || value === null || value.length === 0;
          }
          /**
           * Determine object value is empty
           * @param {*} value
           * @return {bool}
           */

        }, {
          key: "isEmptyObject",
          value: function isEmptyObject(value) {
            return value === undefined || value === null || Object.keys(value).length === 0 && value.constructor === Object;
          }
          /**
           * Foreach for an array or object
           * @param {array|object} data
           * @param {callback} callback
           */

        }, {
          key: "foreach",
          value: function foreach(data, callback) {
            if (this.isObject(data)) {
              var keys = Object.keys(data);
              var values = Object.keys(data).map(function (e) {
                return data[e];
              });
              var i = 0;
              var l = keys.length;

              for (i; i < l; i++) {
                callback(values[i], keys[i]);
              }
            } else {
              if (Array.isArray(data)) {
                var _i3 = 0;
                var _l = data.length;

                for (_i3; _i3 < _l; _i3++) {
                  callback(data[_i3], _i3);
                }
              } else {
                throw new Error('Failed to iteration. Data is not an array or object.');
              }
            }
          }
          /**
           * Blocking test for asynchronous
           * @param {integer} ms      this is miliseconds value for event block
           * @return {int}
           */

        }, {
          key: "blockingTest",
          value: function blockingTest() {
            var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
            var start = Date.now();
            var time = start + ms;

            while (Date.now() < time) {// empty progress
            }

            return start;
          }
          /**
           * Safe JSON.stringify to avoid type error converting circular structure to json
           * @param {object} value        this is the json object
           * @param {*} space
           * @return {string}
           */

        }, {
          key: "safeStringify",
          value: function safeStringify(value, space) {
            var cache = [];
            var output = JSON.stringify(value, function (key, value) {
              // filters vue.js internal properties
              if (key && key.length > 0 && (key.charAt(0) === '$' || key.charAt(0) === '_')) {
                return;
              }

              if (_typeof(value) === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                  // Circular reference found, discard key
                  return;
                } // Store value in our collection


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

        }, {
          key: "shallowClone",
          value: function shallowClone(array) {
            return [].concat(array);
          }
          /**
           * Very safe deep clone an array
           * @param {array} array
           * @return {array}
           */

        }, {
          key: "deepClone",
          value: function deepClone(array) {
            var clone, i;
            if (_typeof(array) !== 'object' || !array) return array;

            if (Object.prototype.toString.apply(array) === '[object Array]') {
              clone = [];
              var len = array.length;

              for (i = 0; i < len; i++) {
                clone[i] = this.deepClone(array[i]);
              }

              return clone;
            }

            clone = {};

            for (i in array) {
              if (Object.prototype.hasOwnProperty.call(array, i)) clone[i] = this.deepClone(array[i]);
            }

            return clone;
          }
          /**
           * jsonTransform for restructuring and performing operations on JSON
           * @param {object} data
           * @param {object} map
           * @return {array}
           */

        }, {
          key: "jsonTransform",
          value: function jsonTransform(data, map) {
            var helper = new Helper();
            return {
              defaultOrNull: function defaultOrNull(key) {
                return key && map.defaults ? map.defaults[key] : null;
              },
              getValue: function getValue(obj, key, newKey) {
                if (typeof obj === 'undefined') {
                  return;
                }

                if (key === undefined || key === null || key === '') {
                  return obj;
                }

                var value = obj;
                var keys = null;
                keys = key.split('.');
                var i = 0;
                var l = keys.length;

                for (i; i < l; i++) {
                  if (typeof value !== 'undefined' && keys[i] in value) {
                    value = value[keys[i]];
                  } else {
                    return this.defaultOrNull(newKey);
                  }
                }

                return value;
              },
              setValue: function setValue(obj, key, newValue) {
                if (typeof obj === 'undefined' || key === '' || key === undefined || key == null) {
                  return;
                }

                var keys = key.split('.');
                var target = obj;
                var i = 0;
                var l = keys.length;

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
              getList: function getList() {
                return this.getValue(data, map.list);
              },
              make: function make(context) {
                var value = this.getValue(data, map.list);
                var normalized = [];

                if (!helper.isEmptyObject(value)) {
                  var list = this.getList();
                  normalized = map.item ? list.map(this.iterator.bind(this, map.item)) : list;
                  normalized = this.operate.bind(this, normalized)(context);
                  normalized = this.each(normalized, context);
                  normalized = this.removeAll(normalized);
                }

                return normalized;
              },
              removeAll: function removeAll(data) {
                if (Array.isArray(map.remove)) {
                  helper.foreach(data, this.remove);
                }

                return data;
              },
              remove: function remove(item) {
                var i = 0;
                var l = map.remove.length;

                for (i; i < l; i++) {
                  delete item[map.remove[i]];
                }

                return item;
              },
              operate: function operate(data, context) {
                if (map.operate) {
                  helper.foreach(map.operate, function (method) {
                    data = data.map(function (item) {
                      var fn;

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
              each: function each(data, context) {
                if (map.each) {
                  data.forEach(function (value, index, collection) {
                    return map.each(value, index, collection, context);
                  });
                }

                return data;
              },
              iterator: function iterator(map, item) {
                var obj = {}; // to support simple arrays with recursion

                if (typeof map === 'string') {
                  return this.getValue(item, map);
                }

                helper.foreach(map, function (oldkey, newkey) {
                  if (typeof oldkey === 'string' && oldkey.length > 0) {
                    obj[newkey] = this.getValue(item, oldkey, newkey);
                  } else if (Array.isArray(oldkey)) {
                    var array = oldkey.map(function (item, map) {
                      return this.iterator(map, item);
                    }.bind(this, item)); // need to swap arguments for bind

                    obj[newkey] = array;
                  } else if (_typeof(oldkey) === 'object') {
                    var bound = this.iterator.bind(this, oldkey, item);
                    obj[newkey] = bound();
                  } else {
                    obj[newkey] = '';
                  }
                }.bind(this));
                return obj;
              }
            };
          }
        }]);

        return Helper;
      }();

      module.exports = Helper;
    }, {}],
    3: [function (require, module, exports) {
      // The reason we disable equal strict because we want a no strict for comparisons operator.

      /* eslint eqeqeq:0 */
      'use strict';
      /**
       * Unstrict Operator
       * @param {string} operator
       * @param {*} v     this is the property value
       * @param {*} s     this is the search value
       * @return {bool}
       */

      function unstrict(operator, v, s) {
        switch (operator) {
          case '=':
            return v == s;

          case '==':
            return v == s;

          case '!=':
            return v != s;

          default:
            throw new Error('Comparisons operator is not available!');
        }
      }

      module.exports = {
        unstrict: unstrict
      };
    }, {}]
  }, {}, [1])(1);
});
