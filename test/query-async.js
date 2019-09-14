var assert = require('assert');
const FlyJson = require('../src/flyjson.js');

var data1 = [
    {user_id:1,name:'budi',age:10},
    {user_id:5,name:'wawan',age:20},
    {user_id:3,name:'tono',age:30}
];

var data2 = [
    {id:1,address:'bandung',email:'a@b.com'},
    {id:2,address:'jakarta',email:'c@d.com'},
    {id:3,address:'solo',email:'e@f.com'},
    {id:4,address:'solo, balapan',email:'g@h.com'},
    {id:5,address:'surabaya',email:'i@j.com'}
];

var data3 = [
    {id:1,bio:'I was born in bandung',phone:'a@b.com'},
    {id:2,bio:'I was born in jakarta',phone:'c@d.com'},
    {id:3,bio:'I was born in solo',phone:'e@f.com'},
    {id:4,bio:'I was born in semarang',phone:'g@h.com'},
    {id:5,bio:'I was born in surabaya',phone:'i@j.com'}
];

describe('query async test', function(){

    it('select data', function (done) {
        var nosql = new FlyJson();
        nosql.async(function(table) {
            var data = table.set(data2).select(['id','bio']).exec();
            assert.equal(data[0].id,1);
            assert.equal(data[1].id,2);
            assert.equal(data[2].id,3);
            assert.equal(data[3].id,4);
            assert.equal(data[4].id,5);
            done();
        });
    });

    it('select + where', function (done) {
        var nosql = new FlyJson();
        nosql.async(function(table){
            var data = table.set(data2)
            .select(['id','address'])
            .where('address','jakarta')
            .exec();
            assert.equal(data[0].id,2);
            assert.equal(data[0].address,'jakarta');
            done();
        });
    });

    it('select + where + and', function (done) {
        var nosql = new FlyJson();
        nosql.async(function(table){
            var data = table.set(data2)
            .select(['id','address'])
            .where('address','like','a')
            .where('address','like','ba')
            .exec();
            assert.equal(data[0].id,1);
            assert.equal(data[0].address,'bandung');
            assert.equal(data[1].id,4);
            assert.equal(data[1].address,'solo, balapan');
            assert.equal(data[2].id,5);
            assert.equal(data[2].address,'surabaya');
            done();
        })
    });

    it('select + where + or + where', function (done) {
        var nosql = new FlyJson();
        nosql.async(function(table){
            var data = table.set(data2)
                .select(['id','address'])
                .begin()
                .where('address','like','u')
                .or()
                .where('address','===','solo')
                .end()
                .exec();
            assert.equal(data[0].id,1);
            assert.equal(data[0].address,'bandung');
            assert.equal(data[1].id,5);
            assert.equal(data[1].address,'surabaya');
            assert.equal(data[2].id,3);
            assert.equal(data[2].address,'solo');
            done();
        })
    });

    it('select + where + or + where + orderby', function (done) {
        var nosql = new FlyJson();
        nosql.async(function(table){
            var data = table.set(data2)
                .select(['id','address'])
                .begin()
                .where('address','like','u')
                .or()
                .where('address','===','solo')
                .end()
                .orderBy('id',false)
                .exec();
            assert.equal(data[0].id,1);
            assert.equal(data[0].address,'bandung');
            assert.equal(data[1].id,3);
            assert.equal(data[1].address,'solo');
            assert.equal(data[2].id,5);
            assert.equal(data[2].address,'surabaya');
            done();
        })
    });

    it('select + where + or + where + orderby + take', function (done) {
        var nosql = new FlyJson();
        nosql.async(function(table){
            var data = table.set(data2)
                .select(['id','address'])
                .begin()
                .where('address','like','u')
                .or()
                .where('address','===','solo')
                .end()
                .orderBy('id',false)
                .take(2)
                .exec();
            assert.equal(data[0].id,1);
            assert.equal(data[0].address,'bandung');
            assert.equal(data[1].id,3);
            assert.equal(data[1].address,'solo');
            done();
        })
    });

    it('select + where + or + where + orderby + take + pagination', function (done) {
        var nosql = new FlyJson();
        nosql.async(function(table){
            var data = table.set(data2)
                .select(['id','address'])
                .begin()
                .where('address','like','u')
                .or()
                .where('address','===','solo')
                .end()
                .orderBy('id',false)
                .take(2)
                .paginate(2,1)
                .exec();
            assert.equal(data[0].id,3);
            assert.equal(data[0].address,'solo');
            done();
        })
    });

    it('Merge two data table', function (done) {
        var nosql = new FlyJson();
        nosql.async(function(table){
            var data = table.set(data1).join('profile',data2)
                .merge('user_id','id').exec();
            assert.equal(data[0].user_id,1);
            assert.equal(data[0].id,1);
            done();
        });
    });

    it('Merge multiple data table', function (done) {
        var nosql = new FlyJson();
        nosql.async(function(table){
            var profile = table.set(data1).join('profile',data2).merge('user_id','id').exec();
            var data = table.set(profile).join('bio',data3).merge('user_id','id').exec();
            assert.equal(data[0].user_id,1);
            assert.equal(data[0].id,1);
            done();
        });
    });

    it('Join two table', function(done) {
        var nosql = new FlyJson();
        nosql.async(function(table){
            var data = table.set(data1).join('profile',data2).on('user_id','id').exec();
            assert.equal(data[0].profile.id,1);
            assert.equal(data[0].user_id,1);
            assert.equal(data[0].id,1);
            done();
        });
    });

    it('Join multiple table', function(done){
        var nosql = new FlyJson();
        nosql.async(function(table){
            var profile = table.set(data1).join('profile',data2).on('user_id','id').exec();
            var data = table.set(profile).join('bio',data3).on('user_id','id').exec();
            assert.equal(data[0].profile.id,1);
            assert.equal(data[0].user_id,1);
            assert.equal(data[0].id,1);
            done();
        });
    });

    it('Join multiple nested table', function(done){
        var nosql = new FlyJson();
        nosql.async(function(table){
            var bio = table.set(data2).join('bio',data3).on('id','id').exec();
            var data = table.set(data1).join('data',bio).on('user_id','id').exec();
            assert.equal(data[0].data.bio.id,1);
            assert.equal(data[0].data.id,1);
            assert.equal(data[0].user_id,1);
            assert.equal(data[0].id,1);
            done();
        });
    });

});