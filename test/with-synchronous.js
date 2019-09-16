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

describe('normal / synchronous CRUD test', function() {
    
    this.timeout(10000);

    it('insert data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2).insert({id:6,address:'madiun',email:'i@j.com'}).exec();
        assert.equal(data.length,6);
        assert.equal(data[5].id,6);
        assert.equal(data[5].address,'madiun');
        assert.equal(data[5].email,'i@j.com');
    });

    it('update data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .update('id',5,{address:'ponorogo',email:'xxx@gmail.com'})
            .exec();
            assert.equal(data.length,5);
            assert.equal(data[4].id,5);
            assert.equal(data[4].address,'ponorogo');
            assert.equal(data[4].email,'xxx@gmail.com'); 
    });

    it('modify data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .modify('id',5,{address:'ponorogo',email:'xxx@gmail.com',about:'Just ordinary programmer'})
            .exec();
            assert.equal(data.length,5);
            assert.equal(data[4].id,5);
            assert.equal(data[4].address,'ponorogo');
            assert.equal(data[4].email,'xxx@gmail.com');
    });

    it('delete data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .delete('id',5)
            .exec();
            assert.equal(data.length,4);
            assert.equal(data[3].id,4);
            assert.equal(data[3].address,'solo, balapan');
            assert.equal(data[3].email,'g@h.com'); 
    });

});

describe('normal / synchronous Query test', function() {
    
    this.timeout(10000);

    it('select data', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .select(['id','address'])
            .exec();
        assert.equal(data[0].id,1);
        assert.equal(data[1].id,2);
        assert.equal(data[2].id,3);
        assert.equal(data[3].id,4);
        assert.equal(data[4].id,5);
    });

    it('select + where', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .select(['id','address'])
            .where('address','jakarta')
            .exec();
        assert.equal(data[0].id,2);
        assert.equal(data[0].address,'jakarta');
    });

    it('select + where + <=', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','<=',20)
            .exec();
        assert.equal(data[0].age,10);
        assert.equal(data[1].age,20);
        assert.equal(data.length,2);
    });

    it('select + where + <', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','<',20)
            .exec();
        assert.equal(data[0].age,10);
        assert.equal(data.length,1);
    });

    it('select + where + >', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','>',10)
            .exec();
        assert.equal(data[0].age,20);
        assert.equal(data[1].age,30);
        assert.equal(data.length,2);
    });

    it('select + where + >=', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','>=',10)
            .exec();
        assert.equal(data[0].age,10);
        assert.equal(data[1].age,20);
        assert.equal(data[2].age,30);
        assert.equal(data.length,3);
    });

    it('select + where + !=', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','!=',10)
            .exec();
        assert.equal(data[0].age,20);
        assert.equal(data[1].age,30);
        assert.equal(data.length,2);
    });

    it('select + where + ==', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','==',10)
            .exec();
        assert.equal(data[0].age,10);
        assert.equal(data.length,1);
    });

    it('select + where + !==', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','!==',10)
            .exec();
        assert.equal(data[0].age,20);
        assert.equal(data[1].age,30);
        assert.equal(data.length,2);
    });

    it('select + where + and', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
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
    });

    it('select + where + or + where', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
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
    });

    it('select + where + or + where + orderby ascending', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
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
    });

    it('select + where + or + where + orderby descending', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .select(['id','address'])
            .begin()
            .where('address','like','u')
            .or()
            .where('address','===','solo')
            .end()
            .orderBy('id',true)
            .exec();
        assert.equal(data[0].id,5);
        assert.equal(data[0].address,'surabaya');
        assert.equal(data[1].id,3);
        assert.equal(data[1].address,'solo');
        assert.equal(data[2].id,1);
        assert.equal(data[2].address,'bandung');
    });

    it('select + where + or + where + orderby with primer', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .select(['id','address'])
            .begin()
            .where('address','like','u')
            .or()
            .where('address','===','solo')
            .end()
            .orderBy('id',false,parseInt)
            .exec();
        assert.equal(data[0].id,1);
        assert.equal(data[0].address,'bandung');
        assert.equal(data[1].id,3);
        assert.equal(data[1].address,'solo');
        assert.equal(data[2].id,5);
        assert.equal(data[2].address,'surabaya');
    });

    it('select + where + or + where + orderby + take', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
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
    });

    it('select + where + or + where + orderby + skip', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .select(['id','address'])
            .begin()
            .where('address','like','u')
            .or()
            .where('address','===','solo')
            .end()
            .orderBy('id',false)
            .skip(1)
            .exec();
        assert.equal(data[0].id,3);
        assert.equal(data[0].address,'solo');
    });

    it('select + where + or + where + orderby + take + pagination', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
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
    });

    it('Merge two data table', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1).join('profile',data2)
            .merge('user_id','id').exec();
        assert.equal(data[0].user_id,1);
        assert.equal(data[0].id,1);
    });

    it('Merge multiple data table', function () {
        var nosql = new FlyJson();
        var table = nosql.set(data1).join('profile',data2).merge('user_id','id').exec();
        var data = nosql.set(table).join('bio',data3).merge('user_id','id').exec();
        assert.equal(data[0].user_id,1);
        assert.equal(data[0].id,1);
    });

    it('Join two table', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data1).join('profile',data2).on('user_id','id').exec();
        assert.equal(data[0].profile.id,1);
        assert.equal(data[0].user_id,1);
    });

    it('Join two table with same parent id', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data1).join('user_id',data2).on('user_id','id').exec();
        assert.equal(data[0].user_id.id,1);
    });

    it('Join multiple table', function(){
        var nosql = new FlyJson();
        var profile = nosql.set(data1).join('profile',data2).on('user_id','id').exec();
        var data = nosql.set(profile).join('bio',data3).on('user_id','id').exec();
        assert.equal(data[0].profile.id,1);
        assert.equal(data[0].bio.id,1);
        assert.equal(data[0].user_id,1);
    });

    it('Join multiple nested table', function(){
        var nosql = new FlyJson();
        var bio = nosql.set(data2).join('bio',data3).on('id','id').exec();
        var data = nosql.set(data1).join('data',bio).on('user_id','id').exec();
        assert.equal(data[0].data.bio.id,1);
        assert.equal(data[0].data.id,1);
        assert.equal(data[0].user_id,1);
    });

    it('cleanup',function(){
        var nosql = new FlyJson();
        var data = nosql.set(data2).clean().exec();
        assert.deepEqual(data,[]);
    });

});