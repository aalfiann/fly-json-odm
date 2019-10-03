const Helper = require('./helper.js');
const _sortBy = Symbol('_sortBy');

/**
 * FlyJson class
 */
'use strict';
class FlyJson extends Helper {

    /**
     * Constructor
     */
    constructor() {
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
    [_sortBy](field, reverse, primer) {
        var key = primer ? 
            function(x) {return primer(x[field])} : 
            function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }

    /**
     * Set json array as data table
     * @param {array} data      this is json data
     * @return {this} 
     */
    set(data) {
        if(this.isArray(data)) {
            this.data1 = this.deepClone(data);
        } else {
            throw new Error('Set data must be an array contains object.')
        }
        return this;
    };

    /**
     * Insert new data into data table
     * @param {object} obj      this is the object data
     * @return {this}
     */
    insert(obj) {
        if(this.isObject(obj) && !this.isEmptyObject(obj)) {
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
    // insertMany(data) {
    //     if(this.isArray(data)) {
    //         var l = data.length;
    //         for(var i = 0; i < l; i++) {
    //             if(this.isObject(data[i]) && !this.isEmptyObject(data[i])) {
    //                 this.data1.push(data[i]);
    //             } else {
    //                 throw new Error('New value must be an object and not empty');
    //             }
    //         }
    //     } else {
    //         throw new Error('Data must be an array object');
    //     }
    //     return this;
    // }

    /**
     * Update single data in data table
     * @param {string} key      this is the key name 
     * @param {*} value         this is the value of key name
     * @param {object} obj      this is the new value to replace all old data
     * @return {this}
     */
    update(key,value,obj) {
        if(this.isEmpty(key) || this.isEmpty(value)) {
            throw new Error('Key and Value must be defined and value must be unique');
        }
        if(!this.isObject(obj) || this.isEmptyObject(obj)) {
            throw new Error('New value must be an object and not empty');
        }
        var l = this.data1.length;
        for( var i = 0; i < l; i++){ 
            if (this.data1[i][key] === value) {
                this.data1.splice(i, 1);
                this.data1.push(Object.assign({[key]:value},obj));
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
    // updateMany(key,data) {
    //     if(this.isEmpty(key) || !this.isString(key)) {
    //         throw new Error('Key and Value must be defined and value must be unique');
    //     }
    //     if(this.isEmptyArray(data) || !this.isArray(data)) {
    //         throw new Error('Data to update must be an array object and not empty');
    //     }
    //     var l = this.data1.length;
    //     var len = data.length;
    //     var newdata = [];
    //     var result = undefined;
    //     for(var i = 0; i < l; i++) {
    //         result = false; 
    //         for(var x = 0; x < len; x++) {
    //             if (this.data1[i][key] === data[x][key]) {
    //                 result = true;
    //                 newdata.push(data[x]);
    //             }
    //         }
    //         if(result === false) {
    //             newdata.push(this.data1[i]);
    //         }
    //     }
    //     this.data1 = newdata;
    //     return this;
    // }

    /**
     * Modify single data in data table
     * @param {string} key      this is the key name 
     * @param {*} value         this is the value of key name
     * @param {object} obj      this is the new value to add or modify old data
     * @return {this}
     */
    modify(key,value,obj) {
        if(this.isEmpty(key) || this.isEmpty(value)) {
            throw new Error('Key and Value must be defined and value must be unique');
        }
        if(!this.isObject(obj) || this.isEmptyObject(obj)) {
            throw new Error('New value must be an object and not empty');
        }
        var l = this.data1.length;
        var data = undefined;
        for( var i = 0; i < l; i++){ 
            if (this.data1[i][key] === value) {
                data = this.data1[i];
                this.data1.splice(i, 1);
                this.data1.push(Object.assign({[key]:value},data,obj));
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
    // modifyMany(key,data) {
    //     if(this.isEmpty(key) || !this.isString(key)) {
    //         throw new Error('Key must be defined');
    //     }
    //     if(this.isEmptyArray(data) || !this.isArray(data)) {
    //         throw new Error('Data to modify must be an array object and not empty');
    //     }
    //     var l = this.data1.length;
    //     var len = data.length;
    //     var newdata = [];
    //     var old, result = undefined;
    //     for(var i = 0; i < l; i++) { 
    //         result = false;
    //         for(var x = 0; x < len; x++) {
    //             if (this.data1[i][key] === data[x][key]) {
    //                 result = true;
    //                 old = this.data1[i];
    //                 newdata.push(Object.assign(old,data[x]));
    //             }
    //         }
    //         if(result === false) {
    //             newdata.push(this.data1[i]);
    //         }
    //     }
    //     this.data1 = newdata;
    //     return this;
    // }

    /**
     * Delete single data in data table
     * @param {string} key      this is the key name
     * @param {*} value         this is the value of key name
     * @return {this} 
     */
    delete(key,value) {
        if(!this.isEmpty(key) && !this.isEmpty(value)) {
            var l = this.data1.length;
            for(var i = 0; i < l; i++) { 
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
    // deleteMany(key,data) {
    //     if(!this.isEmpty(key) && !this.isEmptyArray(data)) {
    //         var l = this.data1.length;
    //         var len = data.length;
    //         var newdata = [];
    //         var result = false;
    //         for(var i = 0; i < l; i++) { 
    //             result = false;
    //             for(var x = 0; x < len; x++) {
    //                 if (this.data1[i][key] === data[x]) {
    //                     result = true;
    //                 }
    //             }
    //             if(result === false) {
    //                 newdata.push(this.data1[i]);
    //             }
    //         }
    //         this.data1 = newdata;
    //     } else {
    //         throw new Error('Key and Data array of key value must be defined.');
    //     }
    //     return this;
    // }

    /**
     * Filter data by select name key
     * @param {array} key 
     * @return {this}
     */
    select(key) {
        if(!this.isEmpty(key) && this.isArray(key) && !this.isEmptyArray(key)) {
            var newdata = [];
            var res = undefined;
            var l = this.data1.length;
            var dl = key.length;
            for(var i=0;i<l;i++) {
                res = {};
                for(var x=0;x<dl;x++) {
                    if(this.data1[i][key[x]] != undefined) {
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
    where(...args) {
        if(!this.isEmpty(args[0]) && this.isString(args[0]) && (args[1] != undefined)) {
            var c = true;
            if (args.length > 2) {
                var mid = args[1];
                var a = args[0];
                var b = args[2];
                if(!this.isEmpty(args[3])) c = args[3];
            } else {
                var mid = '===';
                var a = args[0];
                var b = args[1];
                c = true;
            }
            mid = mid.toString().toLowerCase();
            var search = {[a]:b};
            var v, s = undefined;
            var self = this;
            var data = this.data1.filter(function (o) {
                return Object.keys(search).every(function (k) {
                    v = o[k];
                    s = search[k];
                    if(c === false && mid !== 'regex') {
                        if(!self.isObject(o[k])) {
                            v = o[k].toString().toLowerCase();
                        }
                        s = search[k].toString().toLowerCase();
                    }
                    
                    switch(mid) {
                        case '=':
                            return v == s;
                        case '!==':
                            return v !== s;
                        case '==':
                            return v == s;
                        case '!=':
                            return v != s;
                        case '>':
                            return v > s;
                        case '>=':
                            return v >= s;
                        case '<':
                            return v < s;
                        case '<=':
                            return v <= s;
                        case 'in':
                            if(self.isString(v)) {
                                return (v.indexOf(s) !== -1);
                            } 
                            var result = [];
                            self.foreach(v,function(value){
                                if(c) {
                                    if(value === s) {
                                        result.push(value);
                                    }
                                } else {
                                    if(self.isString(value)) {
                                        value = value.toLowerCase();    
                                    }
                                    if(value === s) {
                                        result.push(value);
                                    }
                                }
                            });
                            return (result.length > 0);
                        case 'not':
                            return v !== s;
                        case 'like':
                            return (v.indexOf(s) !== -1);
                        case 'not like':
                            return (v.indexOf(s) === -1);
                        case 'regex':
                            return (s.test(v));
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
    begin() {
        this.scope = 'query';
        return this;
    }

    /**
     * Add new OR condition
     * @return {this}
     */
    or() {
        if(this.scope === 'query') {
            var l = this.result.length;
            for(var i=0;i<l;i++) {
                this.query.push(this.result[i]);
            }
        }
        return this;
    }

    /**
     * Ending of build query with condition OR
     * @return {this}
     */
    end() {
        if(this.scope === 'query') {
            var l = this.result.length;
            for(var i=0;i<l;i++) {
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
     * Cleanup all temporary object
     * @return {this}
     */
    clean() {
        this.data1 = [];
        this.data2 = [];
        this.query = [];
        this.result = [];
        this.metadata = {};
        this.scope = '';
        this.name = '';
        return this;
    }

    /**
     * Joining two data table
     * @param {string} name     this is the name key for joined data
     * @param {array} data      this is the array of data table
     * @return {this} 
     */
    join(name,data) {
        if(!this.isEmpty(name) && this.isString(name)) {
            if(this.isArray(data)) {
                this.data2 = this.deepClone(data);
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
     * @param {string} a    this is indentifier key name of data table 1
     * @param {string} b    this is indentifier key name of data table 2
     * @return {this}
     */
    merge(a,b) {
        if(this.scope === 'join') {
            if(!this.isEmpty(a) && this.isString(a)) {
                if(!this.isEmpty(b) && this.isString(b)) {
                    const indexB = this.data2.reduce((result,item) => { 
                        result[item[b]] = item; 
                        return result;
                    }, {});
                    this.scope = '';
                    this.data1 = this.data1.map(item => Object.assign(item,indexB[item[a]]));
                } else {
                    throw new Error('Unique indentifier key for table 2 is required.');
                }
            } else {
                throw new Error('Unique indentifier key for table 1 is required.');
            }
        } else {
            throw new Error('You should join first before doing merge.');
        }
        return this;
    }

    /**
     * Set indentifier to joining two data table
     * @param {string} a    this is indentifier key name of data table 1
     * @param {string} b    this is indentifier key name of data table 2
     * @return {this}
     */
    on(a,b) {
        var self = this;
        if(self.scope === 'join') {
            if(!this.isEmpty(a) && this.isString(a)) {
                if(!this.isEmpty(b) && this.isString(b)) {
                    const indexB = self.data2.reduce((result,item) => { 
                        result[item[b]] = item;
                        return result;
                    }, {});
        
                    var result = [];
                    self.data1.map(function(value,index){
                        var newdata = {};
                        var arr = Object.keys(self.data1[index]);
                        var l = arr.length;
                        for(var i=0;i<l;i++) {
                            if(arr[i] === a) {
                                if(self.name === arr[i]) {
                                    newdata[arr[i]] = indexB[self.data1[index][arr[i]]];
                                } else {
                                    newdata[self.name] = indexB[self.data1[index][arr[i]]];
                                    newdata[arr[i]] = value[arr[i]];
                                }
                            } else {
                                newdata[arr[i]] = value[arr[i]];
                            }
                        }
                        result.push(newdata);
                    });
                    self.scope = '';
                    self.data1 = result;
                } else {
                    throw new Error('Unique indentifier key for table 2 is required.');
                }
            } else {
                throw new Error('Unique indentifier key for table 1 is required.');
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
    orderBy(name,desc=false,primer) {
        if(!this.isEmpty(name) && this.isString(name) && this.isBoolean(desc)) {
            this.data1.sort(this[_sortBy](name,desc,primer));
        }
        return this;
    }

    /**
     * Group detail data by key name
     * @param {string} name 
     * @param {string} groupName
     * @return {this} 
     */
    groupDetail(name,groupName='') {
        if(this.isEmpty(name) || !this.isString(name)) {
            throw new Error('name is required and must be string.');
        }
        if(!this.isString(groupName)) {
            throw new Error('group name must be string.');
        }
        var data = this.data1.reduce((objectsByKeyValue, obj) => {
            const value = obj[name];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});
        var group = [];
        if(groupName) {
            group.push({[groupName]:data})
        } else {
            group.push({[name]:data})
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
    groupBy(name,sumField=[]) {
        if(this.isEmpty(name) || !this.isString(name)) {
            throw new Error('name is required and must be string.');
        }
        if(!this.isArray(sumField)) {
            throw new Error('field name for sum must be array.');
        }
        var l = sumField.length;
        var data = this.data1.reduce(function(res, obj) {
            obj.item_count = 1;
            if (!(obj[name] in res)) {
                res.__array.push(res[obj[name]] = obj);
            } else {
                for(var i=0;i<l;i++) {
                    res[obj[name]][sumField[i]] += obj[sumField[i]];
                }
                res[obj[name]]['item_count'] += 1;
            }
            // average
            for(var i=0;i<l;i++) {
                res[obj[name]]['average_'+sumField[i]] = (res[obj[name]][sumField[i]]/res[obj[name]]['item_count']);
            }
            return res;
        }, {__array:[]});
        this.data1 = data.__array;
        return this;
    }

    /**
     * Skip data by size
     * @param {string|integer} size
     * @return {this} 
     */
    skip(size) {
        if(!this.isEmpty(size) && this.isInteger(size)) {
            this.data1 = this.data1.slice(size);
        }
        return this;
    }

    /**
     * Take data by size
     * @param {string|integer} size
     * @return {this} 
     */
    take(size) {
        if(!this.isEmpty(size)) {
            size = parseInt(size);
            if(this.isInteger(size)) {
                this.data1.length = size;
            }
        }
        return this;
    }

    /**
     * Paginate data by page and page_size
     * @param {string|integer} size
     * @return {this} 
     */
    paginate (page,page_size) {
        if(!this.isEmpty(page) && !this.isEmpty(page_size)) {
            page = parseInt(page);
            page_size = parseInt(page_size);
            if(this.isInteger(page) && this.isInteger(page_size)) {
                var count = this.data1.length;
                --page; // because pages logically start with 1, but technically with 0
                this.data1 = this.data1.slice(page * page_size, (page + 1) * page_size);
                this.metadata = {
                    page:(page+1),
                    page_size:page_size,
                    total_page:Math.ceil(count / page_size),
                    total_records:count
                }
            }
        }
        return this;
    }

    /**
     * Make asynchronous process with Promise
     * @param {*} fn
     * @return {this} 
     */
    promisify(fn) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try{
                resolve(fn.call(self,self));
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Return output data table
     * @return {array}
     */
    exec() {
        return this.data1;
    }

}

module.exports = exports = FlyJson;