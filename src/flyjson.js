const Helper = require('./helper.js');

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
     * @return {callback}
     */
    sortBy(field, reverse, primer) {
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
            this.data1 = JSON.parse(JSON.stringify(data));
        } else {
            throw new Error('Set data must be an array contains object.')
        }
        return this;
    };

    /**
     * Insert new data into data table
     * @param {array} obj       this is the object data
     * @return {this}
     */
    insert(obj) {
        if(this.isObject(obj) && !this.isEmptyObject(obj)) {
            this.data1.push(obj);
        }
        return this;
    }

    /**
     * Update single data in data table
     * @param {string} key      this is the key name 
     * @param {*} value         this is the value of key name
     * @param {*} obj           this is the new value to replace all old data
     * @return {this}
     */
    update(key,value,obj) {
        if(this.isEmpty(key) && this.isEmpty(value)) {
            throw new Error('Key and Value must be defined and value must be unique');
        }
        if(!this.isObject(obj) && this.isEmptyObject(obj)) {
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
     * Modify single data in data table
     * @param {string} key      this is the key name 
     * @param {*} value         this is the value of key name
     * @param {*} obj           this is the new value to add or modify old data
     * @return {this}
     */
    modify(key,value,obj) {
        if(this.isEmpty(key) && this.isEmpty(value)) {
            throw new Error('Key and Value must be defined and value must be unique');
        }
        if(!this.isObject(obj) && this.isEmptyObject(obj)) {
            throw new Error('New value must be an object and not empty');
        }
        var l = this.data1.length;
        for( var i = 0; i < l; i++){ 
            if (this.data1[i][key] === value) {
                var data = this.data1[i];
                this.data1.splice(i, 1);
                this.data1.push(Object.assign({[key]:value},data,obj));
                break;
            }
        }
        return this;
    }

    /**
     * Delete single data in data table
     * @param {string} key      this is the key name
     * @param {*} value         this is the value of key name
     * @return {this} 
     */
    delete(key,value) {
        if(this.isEmpty(key) && this.isEmpty(value)) {
            throw new Error('Key and Value must be defined and unique');
        }
        var l = this.data1.length;
        for(var i = 0; i < l; i++) { 
            if ( this.data1[i][key] === value) {
                this.data1.splice(i, 1); 
                break;
            }
        }
        return this;
    }

    /**
     * Filter data by select name key
     * @param {array} key 
     * @return {this}
     */
    select(key) {
        if(!this.isEmpty(key) && this.isArray(key) && !this.isEmptyArray(key)) {
            var newdata = [];
            var l = this.data1.length;
            for(var i=0;i<l;i++) {
                var res = {}
                var dl = key.length;
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
            if (args.length > 2) {
                var mid = args[1];
                var a = args[0];
                var b = args[2];
            } else {
                var mid = '===';
                var a = args[0];
                var b = args[1];
            }
            var search = {[a]:b};
            var data = this.data1.filter(function (o) {
                return Object.keys(search).every(function (k) {
                    switch(mid) {
                        case '!==':
                            return o[k] !== search[k];
                        case '==':
                            return o[k] == search[k];
                        case '!=':
                            return o[k] != search[k];
                        case '>':
                            return o[k] > search[k];
                        case '>=':
                            return o[k] >= search[k];
                        case '<':
                            return o[k] < search[k];
                        case '<=':
                            return o[k] <= search[k];
                        case 'like':
                            return (o[k].indexOf(search[k]) !=-1)
                        default:
                            return o[k] === search[k];
                    }
                });
            });
            if (this.scope == 'query') {
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
        if(this.scope == 'query') {
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
        if(this.scope == 'query') {
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
                this.data2 = JSON.parse(JSON.stringify(data));
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
        if(this.scope == 'join') {
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
        if(self.scope == 'join') {
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
                            if(arr[i] == a) {
                                if(self.name == arr[i]) {
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
     * @param {string} name 
     * @param {bool} desc
     * @return {this} 
     */
    orderBy(name,desc=false) {
        if(!this.isEmpty(name) && this.isString(name) && this.isBoolean(desc)) {
            this.data1.sort(this.sortBy(name,desc));
        }
        return this;
    }

    /**
     * Skip data by size
     * @param {string|integer} size
     * @return {this} 
     */
    skip(size) {
        if(!this.isEmpty(size) && this.isInteger(size)) {
            this.data1.slice(size);
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
     * Output data
     * @return {array}
     */
    exec() {
        return this.data1;
    }

}

module.exports = exports = FlyJson;