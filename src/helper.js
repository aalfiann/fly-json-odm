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
        return (!Array.isArray(value) || !value.length);
    }

    /**
     * Determine object value is empty
     * @param {*} value 
     * @return {bool}
     */
    isEmptyObject(value) {
        for(var key in value) {
            if(value.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    /**
     * Blocking test for asynchronous
     * @return {int}
     */
    blockingTest() {
        var start = Date.now();
        var time = start + 1000;
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
}

module.exports = Helper;