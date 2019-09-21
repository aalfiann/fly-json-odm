const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

describe('helper function test', function(){

    var nosql  = new FlyJson();

    it('is string', function() {
        assert.equal(nosql.isString('abc'),true);
        assert.equal(nosql.isString(''),true);
        assert.equal(nosql.isString(1),false);
        assert.equal(nosql.isString([]),false);
        assert.equal(nosql.isString({}),false);
    });

    it('is integer', function() {
        assert.equal(nosql.isInteger(1),true);
        assert.equal(nosql.isInteger(0),true);
        assert.equal(nosql.isInteger(-1),true);
        assert.equal(nosql.isInteger(-1.56),false);
        assert.equal(nosql.isInteger(1.56),false);
        assert.equal(nosql.isInteger('2'),false);
        assert.equal(nosql.isInteger('-2'),false);
        assert.equal(nosql.isInteger('02'),false);
        assert.equal(nosql.isInteger('2.56'),false);
        assert.equal(nosql.isInteger('-2.56'),false);
        assert.equal(nosql.isInteger([1,2,3]),false);
        assert.equal(nosql.isInteger([]),false);
        assert.equal(nosql.isInteger({}),false);
        assert.equal(nosql.isInteger(''),false);
    });

    it('is boolean', function() {
        assert.equal(nosql.isBoolean(true),true);
        assert.equal(nosql.isBoolean(false),true);
        assert.equal(nosql.isBoolean(new Boolean(true)),true);
        assert.equal(nosql.isBoolean(new Boolean(false)),true);
        assert.equal(nosql.isBoolean(1),false);
        assert.equal(nosql.isBoolean(0),false);
        assert.equal(nosql.isBoolean('true'),false);
        assert.equal(nosql.isBoolean('false'),false);
    });

    it('is array', function() {
        assert.equal(nosql.isArray([1,2,3]),true);
        assert.equal(nosql.isArray([]),true);
        assert.equal(nosql.isArray({}),false);
        assert.equal(nosql.isArray(''),false);
        assert.equal(nosql.isArray(1),false);
    });

    it('is object', function() {
        assert.equal(nosql.isObject({id:1,name:'abc'}),true);
        assert.equal(nosql.isObject({}),true);
        assert.equal(nosql.isObject([]),false);
        assert.equal(nosql.isObject(''),false);
        assert.equal(nosql.isObject(1),false);
    });

    it('is empty string', function() {
        assert.equal(nosql.isEmpty(undefined),true);
        assert.equal(nosql.isEmpty(null),true);
        assert.equal(nosql.isEmpty(''),true);
        assert.equal(nosql.isEmpty('abc'),false);
        assert.equal(nosql.isEmpty(1),false);
        assert.equal(nosql.isEmpty([]),false);
        assert.equal(nosql.isEmpty({}),false);
    });

    it('is empty array', function() {
        assert.equal(nosql.isEmptyArray(undefined),true);
        assert.equal(nosql.isEmptyArray(null),true);
        assert.equal(nosql.isEmptyArray([]),true);
        assert.equal(nosql.isEmptyArray({}),false);
        assert.equal(nosql.isEmptyArray({id:1}),false);
        assert.equal(nosql.isEmptyArray('1'),false);
        assert.equal(nosql.isEmptyArray(1),false);
        assert.equal(nosql.isEmptyArray([1,2,3]),false);
    });

    it('is empty object', function() {
        assert.equal(nosql.isEmptyObject(undefined),true);
        assert.equal(nosql.isEmptyObject(null),true);
        assert.equal(nosql.isEmptyObject({}),true);
        assert.equal(nosql.isEmptyObject([]),false);
        assert.equal(nosql.isEmptyObject(1),false);
        assert.equal(nosql.isEmptyObject({id:1}),false);
        assert.equal(nosql.isEmptyObject('1'),false);
        assert.equal(nosql.isEmptyObject([1,2,3]),false);
    });

    it('is empty object parameter value must hasOwnProperty',function(){
        const obj = Object.create({name: 'inherited'});
        assert.equal(true,nosql.isEmptyObject(obj));
    });

    it('safeStringify success to avoid type error converting circular',function(){
        var o = {};
        o.o = o;
        o.o.o = null;
        var result = JSON.parse(nosql.safeStringify(o));
        assert.equal(true,nosql.isObject(result));
    });

    it('safeStringify success to avoid type error converting circular in vue.js',function(){
        var o = {};
        o.o = o;
        o._ = '1234';
        var result = JSON.parse(nosql.safeStringify(o));
        assert.equal(true,nosql.isObject(result));
    });

    it('object circular is not empty and is object',function(){
        var o = {};
        o.o = o;
        assert.equal(true,(!nosql.isEmpty(o) && nosql.isObject(o)));
    });

    it('deep clone array is not reflect to original',function(){
        var array1 = [1,2,3];
        var array2 = [6,7,8];
        array2 = nosql.deepClone(array1);
        array2[0] = 10;
        assert.equal(array1[0],1);
    });

    it('foreach an array', function(){
        var array1 = [1,2,3];
        var result = [];
        nosql.foreach(array1,function(value){
            result.push(value);
        });
        assert.deepEqual(result,[1,2,3]);
    });

    it('foreach an object', function(){
        var obj = {id:1,name:'john',age:20};
        var result = [];
        nosql.foreach(obj,function(value){
            result.push(value);
        });
        assert.deepEqual(result,['1','john','20']);
    });

    it('foreach except an array or object will throw Error', function(){
        var name = 'my name is john';
        assert.throws(() => {nosql.foreach(name,function(value){
            console.log(value);
        })},Error);
    });
    
});