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

    set(obj) {
        this.data1 = obj;
        return this;
    };

    insert(obj) {
        this.data1.push(obj);
        return this;
    }

    update(id,value,obj) {
        var l = this.data1.length;
        for( var i = 0; i < l; i++){ 
            if (this.data1[i][id] === value) {
                var arr = Object.keys(obj);
                var al = arr.length;
                for(var x=0;x<al;x++) {
                    if(this.data1[i][arr[x]] != undefined) {
                        this.data1[i][arr[x]] = obj[arr[x]];
                    }
                }
                break;
            }
        }
        return this;
    }

    delete(id,value) {
        var l = this.data1.length;
        for( var i = 0; i < l; i++){ 
            if ( this.data1[i][id] === value) {
                this.data1.splice(i, 1); 
                break;
            }
        }
        return this;
    }

    select(data) {
        var newdata = [];
        var l = this.data1.length;
        for(var i=0;i<l;i++) {
            var res = {}
            var dl = data.length;
            for(var x=0;x<dl;x++) {
                if(this.data1[i][data[x]] != undefined) {
                    res[data[x]] = this.data1[i][data[x]];
                }
            }
            newdata.push(res);
        }
        this.data1 = newdata;
        return this;
    }

    where(...args) {
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
        return this;
    }

    begin() {
        this.scope = 'query';
        return this;
    }

    or() {
        var l = this.result.length;
        for(var i=0;i<l;i++) {
            this.query.push(this.result[i]);
        }
        return this;
    }

    end() {
        var l = this.result.length;
        for(var i=0;i<l;i++) {
            this.query.push(this.result[i]);
        }
        this.data1 = this.query;
        this.query = [];
        this.result = [];
        this.scope = '';
        return this;
    }

    clean() {
        this.data1 = [];
        this.data2 = [];
        this.query = [];
        this.result = [];
        this.metadata = {};
        this.scope = '';
        this.name = '';
    }

    join(name,obj) {
        this.data2 = obj;
        this.name = name;
        this.scope = 'join';
        return this;
    }

    merge(a,b) {
        if(this.scope == 'join') {
            const indexB = this.data2.reduce((result,item) => { 
                result[item[b]] = item; 
                return result;
            }, {});
            this.scope = '';
            this.data1 = this.data1.map(item => Object.assign(item,indexB[item[a]]));
        } else {
            throw new Error('You should join first before doing merge.');
        }
        return this;
    }

    on(a,b) {
        var self = this;
        if(self.scope == 'join') {
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
            throw new Error('You should join first before doing join on.');
        }
        return this;
    }

    orderBy(name,desc=false) {
        this.data1.sort(this.sortBy(name,desc));
        return this;
    }

    skip(size) {
        this.data1.slice(size);
        return this;
    }

    take(size) {
        this.data1.length = size;
        return this;
    }

    paginate (page,page_size) {
        var count = this.data1.length;
        --page; // because pages logically start with 1, but technically with 0
        this.data1 = this.data1.slice(page * page_size, (page + 1) * page_size);
        this.metadata = {
            page:(page+1),
            page_size:page_size,
            total_page:Math.ceil(count / page_size),
            total_records:count
        }
        return this;
    }

    /**
     * Make asynchronous process
     * @param {*} fn
     * @return {this} 
     */
    async(fn) {
        fn.call(this,this);
        return this;
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