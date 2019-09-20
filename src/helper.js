/**
 * Helper class
 */
'use strict';
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
    isInteger(value) {
        return Number.isInteger(value);
    }

    /**
     * Determine value is boolean
     * @param {*} value
     * @return {bool} 
     */
    isBoolean(value) {
        // return typeof variable === "boolean" || value instanceof Boolean;
        return typeof value === 'boolean' || (typeof value === 'object' && value !== null && typeof value.valueOf() === 'boolean');
    }

    /**
     * Determine value is array
     * @param {*} value 
     * @return {bool}
     */
    isArray (value) {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    /**
     * Determine value is object
     * @param {*} value 
     * @return {bool}
     */
    isObject (value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    /**
     * Determine value is empty
     * @param {var} value
     * @return {bool} 
     */
    isEmpty(value) {
        return (value === undefined || value === null || value === '');
    }

    /**
     * Determine value is empty and array
     * @param {*} value 
     * @return {bool}
     */
    isEmptyArray(value) {
        return (value === undefined || value === null || value.length == 0);
    }

    /**
     * Determine object value is empty
     * @param {*} value 
     * @return {bool}
     */
    isEmptyObject(value) {
        return (value === undefined || value === null || (Object.keys(value).length === 0 && value.constructor === Object));
    }

    /**
     * Blocking test for asynchronous
     * @param {integer} ms      this is miliseconds value for event block
     * @return {int}
     */
    blockingTest(ms=1000) {
        var start = Date.now();
        var time = start + ms;
        while (Date.now() < time) {};
        return start;
    }

    /**
     * Safe JSON.stringify to avoid type error converting circular structure to json
     * @param {object} value        this is the json object 
     * @param {*} space 
     * @return {string}
     */
    safeStringify(value, space) {
        var cache = [];
    
        var output = JSON.stringify(value, function (key, value) {
    
            //filters vue.js internal properties
            if(key && key.length>0 && (key.charAt(0)=="$" || key.charAt(0)=="_")) {
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
        }, space)
    
        cache = null; // Enable garbage collection
    
        return output;
    }

    /**
     * Very safe deep clone an array
     * @param {array} array 
     * @return {array}
     */
    deepClone(array) {
        return JSON.parse(JSON.stringify(array));
    }

    /**
     * jsonTransform for restructuring and performing operations on JSON
     * @param {object} data 
     * @param {object} map 
     * @return {array}
     */
    jsonTransform(data, map) {
        return {

            foreach(data,callback) {
                if(this.isObject(data)) {
                    var keys = Object.keys(data);
                    var values = Object.values(data);
                    var i =0;
                    var l = keys.length;
                    for(i;i<l;i++){
                        callback(values[i],keys[i]);
                    }
                } else {
                    if(Array.isArray(data)) {
                        data.forEach(function(value,key){
                            callback(value,key);
                        });
                    } else {
                        throw new Error('Failed to iteration. Data is not an array or object.');
                    }
                }
            },
    
            isObject (value) {
                return value && typeof value === 'object' && value.constructor === Object;
            },
    
            isEmptyObject: function(value) {
                return (value === undefined || value === null || (Object.keys(value).length === 0 && value.constructor === Object));
            },
    
            defaultOrNull: function(key) {
                return key && map.defaults ? map.defaults[key] : null;
            },
    
            getValue : function(obj, key, newKey) {
    
                if(typeof obj === 'undefined') {
                    return;
                }

                if(key == undefined || key == null || key == '') {
                    return obj;
                }
    
                var value = obj;
                var keys = null;
    
                keys = key.split('.');
                var i = 0;
                var l = keys.length;
                for(i;i<l;i++) {
                    if(typeof(value) !== "undefined" && 
                        keys[i] in value) {
                        value = value[keys[i]];
                    } else {
                        return this.defaultOrNull(newKey);
                    }
                }
                
                return value;
    
            },
    
            setValue : function(obj, key, newValue) {
    
                if(typeof obj === "undefined" || key == '' || key == undefined || key == null) {
                    return;
                }
                
                var keys = key.split('.');
                var target = obj;
                var i = 0;
    			var l = keys.length;
                for(i; i < l; i++ ) {
                    if(i === keys.length - 1) {
                        target[keys[i]] = newValue;
                        return;
                    }
                    
                    if(keys[i] in target) {
                        target = target[keys[i]];
                    } else {
                        return;
                    }
                }
            },
    
            getList: function(){
                return this.getValue(data, map.list);
            },
    
            make : function(context) {
    
                var value = this.getValue(data, map.list);
                var normalized = [];
    
                if(!this.isEmptyObject(value)) {
                    var list = this.getList();
                    normalized = map.item ? list.map(this.iterator.bind(this, map.item)) : list;
                    normalized = this.operate.bind(this, normalized)(context);
                    normalized = this.each(normalized, context);
                    normalized = this.removeAll(normalized);
                }
                
                return normalized;
    
            },
    
            removeAll: function(data){
                if (Array.isArray(map.remove)) {
                    this.foreach(data, this.remove);
                }
                return data;
            },
    
            remove: function(item){
                map.remove.forEach(function (key) {
                    delete item[key];
                });
                return item;
            },
    
            operate: function(data, context) {
    
                if(map.operate) {
                    this.foreach(map.operate,function(method){
                        data = data.map(function(item){
                            var fn;
                            if( 'string' === typeof method.run ) {
                                fn = eval( method.run );
                            } else {
                                fn = method.run;
                            }
                            this.setValue(item,method.on,fn(this.getValue(item,method.on), context));
                            return item;
                        }.bind(this));
                    }.bind(this));
                }
                return data;
    
            },
    
            each: function(data, context){
                if( map.each ) {
                    data.forEach(function (value, index, collection) {
                        return map.each(value, index, collection, context);
                    });
                }  
                return data;
            },
    
            iterator : function(map, item) {
    
                var obj = {};
    
                //to support simple arrays with recursion
                if(typeof map === 'string') {
                    return this.getValue(item, map);
                }
                
                this.foreach(map, function(oldkey, newkey) {
                    if(typeof oldkey === 'string' && oldkey.length > 0) {
                        obj[newkey] = this.getValue(item, oldkey, newkey);
                    } else if( Array.isArray(oldkey) ) {
                        var array = oldkey.map(function(item,map) {return this.iterator(map,item)}.bind(this , item));//need to swap arguments for bind
                        obj[newkey] = array;
                    }  else if(typeof oldkey === 'object'){
                        var bound = this.iterator.bind(this, oldkey,item);
                        obj[newkey] = bound();
                    }
                    else {
                        obj[newkey] = "";
                    }
                }.bind(this));
                
                return obj;
    
            }
    
        };
    }

}

module.exports = Helper;