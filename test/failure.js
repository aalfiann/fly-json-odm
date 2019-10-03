const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

var right_table = [
    {user_id:1,name:'budi',age:10},
    {user_id:5,name:'wawan',age:20},
    {user_id:3,name:'tono',age:30}
];

var wrong_table = {user:[
    {user_id:1,name:'budi',age:10},
    {user_id:5,name:'wawan',age:20},
    {user_id:3,name:'tono',age:30}
]};

describe('intentional failure condition test', function() {

    it('table must be an object array', function(){
        var nosql = new FlyJson();
        assert.equal(nosql.isArray(right_table),true);
        assert.equal(nosql.isArray(wrong_table),false);
        assert.throws(function(){nosql.set(wrong_table)},Error);
    });

    it('set table with not array object', function(){
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(wrong_table)},Error);
    });

    it('select + empty where will not filtered', function () {
        var nosql = new FlyJson();
        var data = nosql.set(right_table)
            .select(['user_id','name'])
            .where()
            .exec();
        assert.equal(data.length,3);
    });

    it('select + where + or + where without begin then or will filtered as and', function () {
        var nosql = new FlyJson();
        var data = nosql.set(right_table)
            .select(['user_id','name'])
            .where('name','like','u')
            .or()
            .where('name','===','tono')
            .end()
            .exec();
        assert.equal(data.length,0);
    });

    it('select + where + or + where without begin and end then or will filtered as and', function () {
        var nosql = new FlyJson();
        var data = nosql.set(right_table)
            .select(['user_id','name'])
            .where('name','like','u')
            .or()
            .where('name','===','tono')
            .exec();
        assert.equal(data.length,0);
    });
    
    it('select + where + or + where without end will not filtered', function () {
        var nosql = new FlyJson();
        var data = nosql.set(right_table)
            .select(['user_id','name'])
            .begin()
            .where('name','like','u')
            .or()
            .where('name','===','budi')
            .exec();
        assert.equal(data.length,3);
    });

    it('set table with empty parameter in orderby will not filtered', function(){
        var nosql = new FlyJson();
        assert.equal(nosql.set(right_table).orderBy().exec().length,3);
    });
    
    it('set table with empty parameter in skip will not filtered', function(){
        var nosql = new FlyJson();
        assert.equal(nosql.set(right_table).skip().exec().length,3);
    });

    it('select with empty parameter in skip will not filtered', function(){
        var nosql = new FlyJson();
        assert.equal(nosql.set(right_table).skip(true,false).exec().length,3);
    });
    
    it('set table with empty parameter in take will not filtered', function(){
        var nosql = new FlyJson();
        assert.equal(nosql.set(right_table).take().exec().length,3);
    });

    it('select with empty parameter in take will not filtered', function(){
        var nosql = new FlyJson();
        assert.equal(nosql.set(right_table).take(true,false).exec().length,3);
    });
    
    it('set table with empty parameter in pagination will not filtered', function(){
        var nosql = new FlyJson();
        assert.equal(nosql.set(right_table).paginate().exec().length,3);
    });

    it('select with empty parameter in pagination will not filtered', function(){
        var nosql = new FlyJson();
        assert.equal(nosql.set(right_table).paginate(true,false).exec().length,3);
    });

    it('join with wrong name parameter', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).join()},Error);
    });

    it('join with wrong table parameter', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).join('data',wrong_table)},Error);
    });

    it('join on with wrong name in first parameter', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).join('data',right_table).on()},Error);
    });

    it('join on with wrong name in second parameter', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).join('data',right_table).on('id')},Error);
    });

    it('on without join', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).on('id','id')},Error);
    });

    it('join merge with wrong name in first parameter', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).join('data',right_table).merge()},Error);
    });

    it('join merge with wrong name in second parameter', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).join('data',right_table).merge('id')},Error);
    });

    it('merge without join', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).merge('id','id')},Error);
    });

    it('promisify with catch error', function(){
        var nosql = new FlyJson();
        nosql.promisify().then(function(table) {

        },function(err){
            return err;
        });
    });

    it('select with empty array', function(){
        var nosql = new FlyJson();
        var data = nosql.set(right_table).select([]).exec();
        assert.deepEqual(right_table,data);
    });

    it('insert data with empty parameter', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).insert()},Error);
    });

    it('insert many data with empty parameter', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).insertMany()},Error);
    });

    it('insert many data with wrong array', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).insertMany([1,2,3])},Error);
    });
    
    it('update data with no name key', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).update()},Error);
    });
    
    it('update data with no value', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).update('user_id')},Error);
    });

    it('update data with no object', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).update('user_id',1)},Error);
    });

    it('update many data with no name key', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).updateMany()},Error);
    });
    
    it('update many data with no data object', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).updateMany('user_id')},Error);
    });
    
    it('modify data with no name key', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).modify()},Error);
    });
    
    it('modify data with no value', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).modify('user_id')},Error);
    });

    it('modify data with no object', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).modify('user_id',1)},Error);
    });

    it('modify many data with no name key', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).modifyMany()},Error);
    });
    
    it('modify many data with no data object', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).modifyMany('user_id')},Error);
    });

    it('delete data with no value', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).delete('id')},Error);
    });

    it('delete many data with no value', function() {
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).deleteMany('id')},Error);
    });

    it('groupBy with no any parameter', function(){
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).groupBy()},Error);
    });

    it('groupBy with wrong sumField parameter', function(){
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).groupBy('name',{})},Error);
    });

    it('groupDetail with no any parameter', function(){
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).groupDetail()},Error);
    });

    it('groupBy with wrong groupName parameter', function(){
        var nosql = new FlyJson();
        assert.throws(function(){nosql.set(right_table).groupDetail('name',{})},Error);
    });

});