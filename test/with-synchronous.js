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

var data2insert = [
    {id:6,address:'madiun',email:'madiun@yahoo.com'},
    {id:7,address:'malang',email:'malang@gmail.com'}
];

var data2update = [
    {id:3,address:'solo',email:'solo@yahoo.com'},
    {id:4,address:'solo, balapan',email:'balapan@gmail.com'}
];

var data2updatereverse = [
    {id:4,address:'solo, balapan',email:'balapan@gmail.com'},
    {id:3,address:'solo',email:'solo@yahoo.com'}
];

var data2modify = [
    {id:3,email:'solo@yahoo.com',about:'I was born in solo'},
    {id:4,email:'balapan@gmail.com',about:'Balapan city is the best',located:'Central Java'}
];

var data2modifyreverse = [
    {id:4,email:'balapan@gmail.com',about:'Balapan city is the best',located:'Central Java'},
    {id:3,email:'solo@yahoo.com',about:'I was born in solo'}
];

var data3 = [
    {id:1,bio:'I was born in bandung',phone:'a@b.com'},
    {id:2,bio:'I was born in jakarta',phone:'c@d.com'},
    {id:3,bio:'I was born in solo',phone:'e@f.com'},
    {id:4,bio:'I was born in semarang',phone:'g@h.com'},
    {id:5,bio:'I was born in surabaya',phone:'i@j.com'}
];

var data4 = [
    {brand:'Audi',color:'black',stock:32},
    {brand:'Audi',color:'white',stock:76},
    {brand:'Ferarri',color:'red',stock:8},
    {brand:'Ford',color:'white',stock:49},
    {brand:'Peugot',color:'white',stock:23}
];

var data5 = [
    {id:1,title:'this is my first post',tags:['News','nodejs','tech',224]},
    {id:2,title:'this is my second post',tags:['tutorial','linux','tech',234]},
    {id:3,title:'this is my third post',tags:['News','info','tech',244]}
];

var data6 = [
    {id:1,title:'this is my first post',category:{id:1,name:'news'}},
    {id:2,title:'this is my second post',category:{id:4,name:'Tutorial'}},
    {id:3,title:'this is my third post',category:{id:2,name:'tech'}}
];

var data7 = [
    {id:1,name:'AAA',created:'2019-10-01 00:02:33'},
    {id:2,name:'BBB',created:'2019-10-02 01:52:53'},
    {id:3,name:'CCC',created:'2019-10-03 02:42:43'},
    {id:4,name:'DDD',created:'2019-10-04 03:32:13'},
    {id:5,name:'EEE',created:'2019-10-05 04:22:13'},
    {id:6,name:'FFF',created:'2019-10-06 05:12:33'},
    {id:7,name:'GGG',created:'2019-10-07 06:02:03'}
];

var data8 = [
    {id:1,name:'AAA',created:'2019-10-01 00:02:33'},
    {id:1,name:'AAA',created:'2019-10-01 00:02:33'},
    {id:1,name:'BBB',created:'2019-10-01 00:02:33'},
    {id:4,name:'DDD',created:'2019-10-04 03:32:13'},
    {id:4,name:'DDD',created:'2019-10-04 03:32:13'},
    {id:7,name:'GGG',created:'2019-10-07 06:02:03'},
    {id:7,name:'GGG',created:'2019-10-07 06:02:03'}
];

var data9 = [
    {id:1,title:'this is my first post',tags:null},
    {id:2,title:'this is my second post',tags:['tutorial','linux','tech',234]},
    {id:3,title:'this is my third post',tags:['News','info','tech',244]}
];

var data10 = [
    {id:1,title:'this is my first post',category:{id:1,name:null}},
    {id:2,title:'this is my second post',category:{id:4,name:'Tutorial'}},
    {id:3,title:'this is my third post',category:{id:2,name:'tech'}}
];

describe('normal / synchronous CRUD test', function() {
    
    this.timeout(10000);

    it('insert data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2).insert({id:6,address:'madiun',email:'i@j.com'}).exec();
        assert.strictEqual(data.length,6);
        assert.strictEqual(data[5].id,6);
        assert.strictEqual(data[5].address,'madiun');
        assert.strictEqual(data[5].email,'i@j.com');
    });

    it('insert data [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2).insert({id:6,address:'madiun',email:'i@j.com'}).exec();
        assert.strictEqual(data.length,6);
        assert.strictEqual(data[5].id,6);
        assert.strictEqual(data[5].address,'madiun');
        assert.strictEqual(data[5].email,'i@j.com');
    });

    it('multiple insert data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2);
        for(var i=6;i<9;i++) {
            data.insert({id:i,address:'madiun',email:'i@j.com'});
        }
        var result = data.exec();
        assert.strictEqual(result.length,8);
        for(var x=5,y=6;x<8;x++,y++) {
            assert.strictEqual(result[x].id,y);
            assert.strictEqual(result[x].address,'madiun');
            assert.strictEqual(result[x].email,'i@j.com');
        }
    });

    it('multiple insert data [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2);
        for(var i=6;i<9;i++) {
            data.insert({id:i,address:'madiun',email:'i@j.com'});
        }
        var result = data.exec();
        assert.strictEqual(result.length,8);
        for(var x=5,y=6;x<8;x++,y++) {
            assert.strictEqual(result[x].id,y);
            assert.strictEqual(result[x].address,'madiun');
            assert.strictEqual(result[x].email,'i@j.com');
        }
    });

    it('insert many data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .insertMany(data2insert).exec();
        assert.strictEqual(data.length,7);
        assert.strictEqual(data[5].id,6);
        assert.strictEqual(data[5].address,'madiun');
        assert.strictEqual(data[5].email,'madiun@yahoo.com');
        assert.strictEqual(data[6].id,7);
        assert.strictEqual(data[6].address,'malang');
        assert.strictEqual(data[6].email,'malang@gmail.com');
    });

    it('insert many data [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .insertMany(data2insert).exec();
        assert.strictEqual(data.length,7);
        assert.strictEqual(data[5].id,6);
        assert.strictEqual(data[5].address,'madiun');
        assert.strictEqual(data[5].email,'madiun@yahoo.com');
        assert.strictEqual(data[6].id,7);
        assert.strictEqual(data[6].address,'malang');
        assert.strictEqual(data[6].email,'malang@gmail.com');
    });

    it('update data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .update('id',5,{address:'ponorogo',email:'xxx@gmail.com'})
            .exec();
            assert.strictEqual(data.length,5);
            assert.strictEqual(data[4].id,5);
            assert.strictEqual(data[4].address,'ponorogo');
            assert.strictEqual(data[4].email,'xxx@gmail.com'); 
    });

    it('update data [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .update('id',5,{address:'ponorogo',email:'xxx@gmail.com'})
            .exec();
            assert.strictEqual(data.length,5);
            assert.strictEqual(data[4].id,5);
            assert.strictEqual(data[4].address,'ponorogo');
            assert.strictEqual(data[4].email,'xxx@gmail.com'); 
    });

    it('multiple update data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2);
        for(var i=0;i<3;i++) {
            data.update('id',i,{address:'ponorogo',email:'xxx@gmail.com'});
        }
        var result= data.exec();
        assert.strictEqual(result.length,5);
        assert.strictEqual(result[3].id,1);
        assert.strictEqual(result[3].address,'ponorogo');
        assert.strictEqual(result[3].email,'xxx@gmail.com');
        assert.strictEqual(result[4].id,2);
        assert.strictEqual(result[4].address,'ponorogo');
        assert.strictEqual(result[4].email,'xxx@gmail.com');
    });

    it('multiple update data [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2);
        for(var i=0;i<3;i++) {
            data.update('id',i,{address:'ponorogo',email:'xxx@gmail.com'});
        }
        var result= data.exec();
        assert.strictEqual(result.length,5);
        assert.strictEqual(result[3].id,1);
        assert.strictEqual(result[3].address,'ponorogo');
        assert.strictEqual(result[3].email,'xxx@gmail.com');
        assert.strictEqual(result[4].id,2);
        assert.strictEqual(result[4].address,'ponorogo');
        assert.strictEqual(result[4].email,'xxx@gmail.com');
    });

    it('update many data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .updateMany('id',data2update).exec();
        assert.strictEqual(data.length,5);
        assert.strictEqual(data[2].email,'solo@yahoo.com');
        assert.strictEqual(data[3].email,'balapan@gmail.com');
    });

    it('update many data [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .updateMany('id',data2update).exec();
        assert.strictEqual(data.length,5);
        assert.strictEqual(data[2].email,'solo@yahoo.com');
        assert.strictEqual(data[3].email,'balapan@gmail.com');
    });

    it('update many data reverse', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .updateMany('id',data2updatereverse).exec();
        assert.strictEqual(data.length,5);
        assert.strictEqual(data[2].email,'solo@yahoo.com');
        assert.strictEqual(data[3].email,'balapan@gmail.com');
    });

    it('update many data reverse [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .updateMany('id',data2updatereverse).exec();
        assert.strictEqual(data.length,5);
        assert.strictEqual(data[2].email,'solo@yahoo.com');
        assert.strictEqual(data[3].email,'balapan@gmail.com');
    });

    it('modify data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .modify('id',5,{address:'ponorogo',email:'xxx@gmail.com',about:'Just ordinary programmer'})
            .exec();
            assert.strictEqual(data.length,5);
            assert.strictEqual(data[4].id,5);
            assert.strictEqual(data[4].address,'ponorogo');
            assert.strictEqual(data[4].email,'xxx@gmail.com');
    });

    it('modify data [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .modify('id',5,{address:'ponorogo',email:'xxx@gmail.com',about:'Just ordinary programmer'})
            .exec();
            assert.strictEqual(data.length,5);
            assert.strictEqual(data[4].id,5);
            assert.strictEqual(data[4].address,'ponorogo');
            assert.strictEqual(data[4].email,'xxx@gmail.com');
    });

    it('multiple modify data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2);
        for(var i=0;i<3;i++) {
            data.modify('id',i,{address:'ponorogo',email:'xxx@gmail.com',about:'Just ordinary programmer'});
        }
        var result = data.exec();
        assert.strictEqual(result.length,5);
        assert.strictEqual(result[3].id,1);
        assert.strictEqual(result[3].address,'ponorogo');
        assert.strictEqual(result[3].email,'xxx@gmail.com');
        assert.strictEqual(result[4].id,2);
        assert.strictEqual(result[4].address,'ponorogo');
        assert.strictEqual(result[4].email,'xxx@gmail.com');
    });

    it('multiple modify data [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2);
        for(var i=0;i<3;i++) {
            data.modify('id',i,{address:'ponorogo',email:'xxx@gmail.com',about:'Just ordinary programmer'});
        }
        var result = data.exec();
        assert.strictEqual(result.length,5);
        assert.strictEqual(result[3].id,1);
        assert.strictEqual(result[3].address,'ponorogo');
        assert.strictEqual(result[3].email,'xxx@gmail.com');
        assert.strictEqual(result[4].id,2);
        assert.strictEqual(result[4].address,'ponorogo');
        assert.strictEqual(result[4].email,'xxx@gmail.com');
    });

    it('modify many data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .modifyMany('id',data2modifyreverse).exec();
        assert.strictEqual(data.length,5);
        assert.strictEqual(data[2].about,'I was born in solo');
        assert.strictEqual(data[3].about,'Balapan city is the best');
        assert.strictEqual(data[3].located,'Central Java');
    });

    it('modify many data [shallow is not allowed]', function() {
        var nosql = new FlyJson();
        assert.throws(()=>{nosql.setMode('shallow').set(data2)
            .modifyMany('id',data2modifyreverse).exec()},Error);
    });

    it('modify many data reverse', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .modifyMany('id',data2modifyreverse).exec();
        assert.strictEqual(data.length,5);
        assert.strictEqual(data[2].about,'I was born in solo');
        assert.strictEqual(data[3].about,'Balapan city is the best');
        assert.strictEqual(data[3].located,'Central Java');
    });

    it('modify many data reverse [shallow is not allowed]', function() {
        var nosql = new FlyJson();
        assert.throws(()=>{nosql.setMode('shallow').set(data2)
            .modifyMany('id',data2modifyreverse).exec()},Error);
    });

    it('delete data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .delete('id',5)
            .exec();
            assert.strictEqual(data.length,4);
            assert.strictEqual(data[3].id,4);
            assert.strictEqual(data[3].address,'solo, balapan');
            assert.strictEqual(data[3].email,'g@h.com'); 
    });

    it('delete data [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .delete('id',5)
            .exec();
            assert.strictEqual(data.length,4);
            assert.strictEqual(data[3].id,4);
            assert.strictEqual(data[3].address,'solo, balapan');
            assert.strictEqual(data[3].email,'g@h.com'); 
    });

    it('multiple delete data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2);
        for(var i=1;i<4;i++) {
            data.delete('id',i);
        }   
        var result = data.exec();
        assert.strictEqual(result.length,2);
        assert.strictEqual(result[0].id,4);
        assert.strictEqual(result[0].address,'solo, balapan');
        assert.strictEqual(result[0].email,'g@h.com');
        assert.strictEqual(result[1].id,5);
        assert.strictEqual(result[1].address,'surabaya');
        assert.strictEqual(result[1].email,'i@j.com'); 
    });

    it('multiple delete data [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2);
        for(var i=1;i<4;i++) {
            data.delete('id',i);
        }   
        var result = data.exec();
        assert.strictEqual(result.length,2);
        assert.strictEqual(result[0].id,4);
        assert.strictEqual(result[0].address,'solo, balapan');
        assert.strictEqual(result[0].email,'g@h.com');
        assert.strictEqual(result[1].id,5);
        assert.strictEqual(result[1].address,'surabaya');
        assert.strictEqual(result[1].email,'i@j.com'); 
    });

    it('delete many data', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .deleteMany('id',[2,5])
            .exec();
            assert.strictEqual(data.length,3);
            assert.strictEqual(data[0].id,1);
            assert.strictEqual(data[1].id,3);
            assert.strictEqual(data[2].id,4); 
    });

    it('delete many data [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .deleteMany('id',[2,5])
            .exec();
            assert.strictEqual(data.length,3);
            assert.strictEqual(data[0].id,1);
            assert.strictEqual(data[1].id,3);
            assert.strictEqual(data[2].id,4); 
    });
    
    it('delete many data reverse', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .deleteMany('id',[5,2])
            .exec();
            assert.strictEqual(data.length,3);
            assert.strictEqual(data[0].id,1);
            assert.strictEqual(data[1].id,3);
            assert.strictEqual(data[2].id,4); 
    });

    it('delete many data reverse [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .deleteMany('id',[5,2])
            .exec();
            assert.strictEqual(data.length,3);
            assert.strictEqual(data[0].id,1);
            assert.strictEqual(data[1].id,3);
            assert.strictEqual(data[2].id,4);
    });

});

describe('normal / synchronous Query test', function() {
    
    this.timeout(10000);

    it('select data', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .select(['id','address'])
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[1].id,2);
        assert.strictEqual(data[2].id,3);
        assert.strictEqual(data[3].id,4);
        assert.strictEqual(data[4].id,5);
    });

    it('select data + distinct', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data8)
            .select(['id','name','created'])
            .distinct()
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[1].id,1);
        assert.strictEqual(data[2].id,4);
        assert.strictEqual(data[3].id,7);
    });

    it('select data + distinct by fieldname', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data8)
            .select(['id','name','created'])
            .distinct('id')
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[1].id,4);
        assert.strictEqual(data[2].id,7);
    });

    it('select data + distinct by wrong fieldname', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data8)
            .select(['id','name','created'])
            .distinct('omg')
            .exec();
        assert.strictEqual(data.length,0);
    });

    it('select data [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .select(['id','address'])
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[1].id,2);
        assert.strictEqual(data[2].id,3);
        assert.strictEqual(data[3].id,4);
        assert.strictEqual(data[4].id,5);
    });

    it('select + where', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .select(['id','address'])
            .where('address','jakarta')
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data[0].address,'jakarta');
    });

    it('select + where [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .select(['id','address'])
            .where('address','jakarta')
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data[0].address,'jakarta');
    });

    it('select + where (case insensitive)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data4)
            .select(['brand','color','stock'])
            .where('brand','==','audi',false)
            .exec();
        assert.strictEqual(data[0].brand,'Audi');
        assert.strictEqual(data[1].brand,'Audi');
    });

    it('select + where (case insensitive) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data4)
            .select(['brand','color','stock'])
            .where('brand','==','audi',false)
            .exec();
        assert.strictEqual(data[0].brand,'Audi');
        assert.strictEqual(data[1].brand,'Audi');
    });

    it('select + where + =', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data4)
            .select(['brand','color','stock'])
            .where('brand','=','Audi')
            .exec();
        assert.strictEqual(data[0].brand,'Audi');
        assert.strictEqual(data[1].brand,'Audi');
    });

    it('select + where + = [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data4)
            .select(['brand','color','stock'])
            .where('brand','=','Audi')
            .exec();
        assert.strictEqual(data[0].brand,'Audi');
        assert.strictEqual(data[1].brand,'Audi');
    });

    it('select + where (in array)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data5)
            .select(['id','title','tags'])
            .where('tags','IN','News')
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].tags[0],'News');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].tags[0],'News');
    });

    it('select + where (in array) with null array', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data9)
            .select(['id','title','tags'])
            .where('tags','IN','News')
            .exec();
        assert.strictEqual(data[0].id,3);
        assert.strictEqual(data[0].tags[0],'News');
    });

    it('select + where (in array) with null array case insensitive', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data9)
            .select(['id','title','tags'])
            .where('tags','IN','News', false)
            .exec();
        assert.strictEqual(data[0].id,3);
        assert.strictEqual(data[0].tags[0],'News');
    });

    it('select + where (in array) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data5)
            .select(['id','title','tags'])
            .where('tags','IN','News')
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].tags[0],'News');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].tags[0],'News');
    });

    it('select + where (in array case insensitive)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data5)
            .select(['id','title','tags'])
            .where('tags','IN','news',false)
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].tags[0],'News');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].tags[0],'News');
    });

    it('select + where (in array case insensitive) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data5)
            .select(['id','title','tags'])
            .where('tags','IN','news',false)
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].tags[0],'News');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].tags[0],'News');
    });

    it('select + where (in object)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data6)
            .select(['id','title','category'])
            .where('category','IN','Tutorial')
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data[0].category.id,4);
        assert.strictEqual(data[0].category.name,'Tutorial');
    });

    it('select + where (in object) with null object', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data10)
            .select(['id','title','category'])
            .where('category','IN','Tutorial')
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data[0].category.id,4);
        assert.strictEqual(data[0].category.name,'Tutorial');
    });

    it('select + where (in object) with null object case insenstive', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data10)
            .select(['id','title','category'])
            .where('category','IN','Tutorial', false)
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data[0].category.id,4);
        assert.strictEqual(data[0].category.name,'Tutorial');
    });

    it('select + where (in object) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data6)
            .select(['id','title','category'])
            .where('category','IN','Tutorial')
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data[0].category.id,4);
        assert.strictEqual(data[0].category.name,'Tutorial');
    });

    it('select + where (in object case insensitive)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data6)
            .select(['id','title','category'])
            .where('category','IN','tutorial',false)
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data[0].category.id,4);
        assert.strictEqual(data[0].category.name,'Tutorial');
    });

    it('select + where (in object case insensitive) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data6)
            .select(['id','title','category'])
            .where('category','IN','tutorial',false)
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data[0].category.id,4);
        assert.strictEqual(data[0].category.name,'Tutorial');
    });

    it('select + where (notin array)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data5)
            .select(['id','title','tags'])
            .where('tags','NOTIN','News')
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data.length,1);
    });

    it('select + where (notin array) with null array', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data9)
            .select(['id','title','tags'])
            .where('tags','NOTIN','News')
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data.length,1);
    });

    it('select + where (notin array) with null array case insensitive', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data9)
            .select(['id','title','tags'])
            .where('tags','NOTIN','News', false)
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data.length,1);
    });

    it('select + where (notin array) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data5)
            .select(['id','title','tags'])
            .where('tags','NOTIN','News')
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data.length,1);
    });

    it('select + where (notin array case sensitive)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data5)
            .select(['id','title','tags'])
            .where('tags','NOTIN','news')
            .exec();
        assert.strictEqual(data.length,3);
    });

    it('select + where (notin array case insensitive)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data5)
            .select(['id','title','tags'])
            .where('tags','NOTIN','news',false)
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data.length,1);
    });

    it('select + where (notin array case insensitive) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data5)
            .select(['id','title','tags'])
            .where('tags','NOTIN','news',false)
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data.length,1);
    });

    it('select + where (notin object)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data6)
            .select(['id','title','category'])
            .where('category','NOTIN','Tutorial')
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[1].id,3);
    });

    it('select + where (notin object) with null object', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data10)
            .select(['id','title','category'])
            .where('category','NOTIN','Tutorial')
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[1].id,3);
    });

    it('select + where (notin object) with null object case insensitive', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data10)
            .select(['id','title','category'])
            .where('category','NOTIN','Tutorial', false)
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[1].id,3);
    });

    it('select + where (notin object) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data6)
            .select(['id','title','category'])
            .where('category','NOTIN','Tutorial')
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[1].id,3);
    });

    it('select + where (notin object case sensitive)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data6)
            .select(['id','title','category'])
            .where('category','NOTIN','tutorial')
            .exec();
        assert.strictEqual(data.length,3);
    });

    it('select + where (notin object case insensitive)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data6)
            .select(['id','title','category'])
            .where('category','NOTIN','tutorial',false)
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[1].id,3);
    });

    it('select + where (notin object case insensitive) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data6)
            .select(['id','title','category'])
            .where('category','NOTIN','tutorial',false)
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[1].id,3);
    });

    it('select + where (not)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data4)
            .select(['brand','color','stock'])
            .where('brand','NOT','audi',false)
            .exec();
        assert.strictEqual(data[0].brand,'Ferarri');
        assert.strictEqual(data[1].brand,'Ford');
        assert.strictEqual(data[2].brand,'Peugot');
    });

    it('select + where (not) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data4)
            .select(['brand','color','stock'])
            .where('brand','NOT','audi',false)
            .exec();
        assert.strictEqual(data[0].brand,'Ferarri');
        assert.strictEqual(data[1].brand,'Ford');
        assert.strictEqual(data[2].brand,'Peugot');
    });

    it('select + where (not like)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data4)
            .select(['brand','color','stock'])
            .where('brand','NOT LIKE','audi',false)
            .exec();
        assert.strictEqual(data[0].brand,'Ferarri');
        assert.strictEqual(data[1].brand,'Ford');
        assert.strictEqual(data[2].brand,'Peugot');
    });

    it('select + where (not like) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data4)
            .select(['brand','color','stock'])
            .where('brand','NOT LIKE','audi',false)
            .exec();
        assert.strictEqual(data[0].brand,'Ferarri');
        assert.strictEqual(data[1].brand,'Ford');
        assert.strictEqual(data[2].brand,'Peugot');
    });

    it('select + where (regex)', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data4)
            .select(['brand','color','stock'])
            .where('brand','regex',/[A-F]/)
            .exec();
        assert.strictEqual(data[0].brand,'Audi');
        assert.strictEqual(data[1].brand,'Audi');
        assert.strictEqual(data[2].brand,'Ferarri');
        assert.strictEqual(data[3].brand,'Ford');
    });

    it('select + where (regex) [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data4)
            .select(['brand','color','stock'])
            .where('brand','regex',/[A-F]/)
            .exec();
        assert.strictEqual(data[0].brand,'Audi');
        assert.strictEqual(data[1].brand,'Audi');
        assert.strictEqual(data[2].brand,'Ferarri');
        assert.strictEqual(data[3].brand,'Ford');
    });

    it('select + where + function for between date', function () {
        var startDate = new Date("2019-10-01");
        var endDate = new Date("2019-10-04");
        var nosql = new FlyJson();
        var data = nosql.set(data7)
            .select(['id','name','created'])
            .where('created','function',value => {
                aDate = new Date(value);
                return aDate >= startDate && aDate <= endDate;
            })
            .exec();
        assert.strictEqual(data[0].id,2);
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[2].id,4);
        assert.strictEqual(data.length,3);
    });

    it('select + where + <=', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','<=',20)
            .exec();
        assert.strictEqual(data[0].age,10);
        assert.strictEqual(data[1].age,20);
        assert.strictEqual(data.length,2);
    });

    it('select + where + <= [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data1)
            .select(['user_id','name','age'])
            .where('age','<=',20)
            .exec();
        assert.strictEqual(data[0].age,10);
        assert.strictEqual(data[1].age,20);
        assert.strictEqual(data.length,2);
    });

    it('select + where + <', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','<',20)
            .exec();
        assert.strictEqual(data[0].age,10);
        assert.strictEqual(data.length,1);
    });

    it('select + where + < [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data1)
            .select(['user_id','name','age'])
            .where('age','<',20)
            .exec();
        assert.strictEqual(data[0].age,10);
        assert.strictEqual(data.length,1);
    });

    it('select + where + >', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','>',10)
            .exec();
        assert.strictEqual(data[0].age,20);
        assert.strictEqual(data[1].age,30);
        assert.strictEqual(data.length,2);
    });

    it('select + where + > [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data1)
            .select(['user_id','name','age'])
            .where('age','>',10)
            .exec();
        assert.strictEqual(data[0].age,20);
        assert.strictEqual(data[1].age,30);
        assert.strictEqual(data.length,2);
    });

    it('select + where + >=', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','>=',10)
            .exec();
        assert.strictEqual(data[0].age,10);
        assert.strictEqual(data[1].age,20);
        assert.strictEqual(data[2].age,30);
        assert.strictEqual(data.length,3);
    });

    it('select + where + >= [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data1)
            .select(['user_id','name','age'])
            .where('age','>=',10)
            .exec();
        assert.strictEqual(data[0].age,10);
        assert.strictEqual(data[1].age,20);
        assert.strictEqual(data[2].age,30);
        assert.strictEqual(data.length,3);
    });

    it('select + where + !=', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','!=',10)
            .exec();
        assert.strictEqual(data[0].age,20);
        assert.strictEqual(data[1].age,30);
        assert.strictEqual(data.length,2);
    });

    it('select + where + != [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data1)
            .select(['user_id','name','age'])
            .where('age','!=',10)
            .exec();
        assert.strictEqual(data[0].age,20);
        assert.strictEqual(data[1].age,30);
        assert.strictEqual(data.length,2);
    });

    it('select + where + ==', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','==',10)
            .exec();
        assert.strictEqual(data[0].age,10);
        assert.strictEqual(data.length,1);
    });

    it('select + where + == [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data1)
            .select(['user_id','name','age'])
            .where('age','==',10)
            .exec();
        assert.strictEqual(data[0].age,10);
        assert.strictEqual(data.length,1);
    });

    it('select + where + !==', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1)
            .select(['user_id','name','age'])
            .where('age','!==',10)
            .exec();
        assert.strictEqual(data[0].age,20);
        assert.strictEqual(data[1].age,30);
        assert.strictEqual(data.length,2);
    });

    it('select + where + !== [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data1)
            .select(['user_id','name','age'])
            .where('age','!==',10)
            .exec();
        assert.strictEqual(data[0].age,20);
        assert.strictEqual(data[1].age,30);
        assert.strictEqual(data.length,2);
    });

    it('select + where + and', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data2)
            .select(['id','address'])
            .where('address','like','a')
            .where('address','like','ba')
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].address,'bandung');
        assert.strictEqual(data[1].id,4);
        assert.strictEqual(data[1].address,'solo, balapan');
        assert.strictEqual(data[2].id,5);
        assert.strictEqual(data[2].address,'surabaya');
    });

    it('select + where + and [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .select(['id','address'])
            .where('address','like','a')
            .where('address','like','ba')
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].address,'bandung');
        assert.strictEqual(data[1].id,4);
        assert.strictEqual(data[1].address,'solo, balapan');
        assert.strictEqual(data[2].id,5);
        assert.strictEqual(data[2].address,'surabaya');
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
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].address,'bandung');
        assert.strictEqual(data[1].id,5);
        assert.strictEqual(data[1].address,'surabaya');
        assert.strictEqual(data[2].id,3);
        assert.strictEqual(data[2].address,'solo');
    });

    it('select + where + or + where [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .select(['id','address'])
            .begin()
            .where('address','like','u')
            .or()
            .where('address','===','solo')
            .end()
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].address,'bandung');
        assert.strictEqual(data[1].id,5);
        assert.strictEqual(data[1].address,'surabaya');
        assert.strictEqual(data[2].id,3);
        assert.strictEqual(data[2].address,'solo');
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
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].address,'bandung');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].address,'solo');
        assert.strictEqual(data[2].id,5);
        assert.strictEqual(data[2].address,'surabaya');
    });

    it('select + where + or + where + orderby ascending [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .select(['id','address'])
            .begin()
            .where('address','like','u')
            .or()
            .where('address','===','solo')
            .end()
            .orderBy('id',false)
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].address,'bandung');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].address,'solo');
        assert.strictEqual(data[2].id,5);
        assert.strictEqual(data[2].address,'surabaya');
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
        assert.strictEqual(data[0].id,5);
        assert.strictEqual(data[0].address,'surabaya');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].address,'solo');
        assert.strictEqual(data[2].id,1);
        assert.strictEqual(data[2].address,'bandung');
    });

    it('select + where + or + where + orderby descending [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .select(['id','address'])
            .begin()
            .where('address','like','u')
            .or()
            .where('address','===','solo')
            .end()
            .orderBy('id',true)
            .exec();
        assert.strictEqual(data[0].id,5);
        assert.strictEqual(data[0].address,'surabaya');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].address,'solo');
        assert.strictEqual(data[2].id,1);
        assert.strictEqual(data[2].address,'bandung');
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
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].address,'bandung');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].address,'solo');
        assert.strictEqual(data[2].id,5);
        assert.strictEqual(data[2].address,'surabaya');
    });

    it('select + where + or + where + orderby with primer [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .select(['id','address'])
            .begin()
            .where('address','like','u')
            .or()
            .where('address','===','solo')
            .end()
            .orderBy('id',false,parseInt)
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].address,'bandung');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].address,'solo');
        assert.strictEqual(data[2].id,5);
        assert.strictEqual(data[2].address,'surabaya');
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
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].address,'bandung');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].address,'solo');
    });

    it('select + where + or + where + orderby + take [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .select(['id','address'])
            .begin()
            .where('address','like','u')
            .or()
            .where('address','===','solo')
            .end()
            .orderBy('id',false)
            .take(2)
            .exec();
        assert.strictEqual(data[0].id,1);
        assert.strictEqual(data[0].address,'bandung');
        assert.strictEqual(data[1].id,3);
        assert.strictEqual(data[1].address,'solo');
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
        assert.strictEqual(data[0].id,3);
        assert.strictEqual(data[0].address,'solo');
    });

    it('select + where + or + where + orderby + skip [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
            .select(['id','address'])
            .begin()
            .where('address','like','u')
            .or()
            .where('address','===','solo')
            .end()
            .orderBy('id',false)
            .skip(1)
            .exec();
        assert.strictEqual(data[0].id,3);
        assert.strictEqual(data[0].address,'solo');
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
        assert.strictEqual(data[0].id,3);
        assert.strictEqual(data[0].address,'solo');
    });

    it('select + where + or + where + orderby + take + pagination [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data2)
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
        assert.strictEqual(data[0].id,3);
        assert.strictEqual(data[0].address,'solo');
    });

    it('Merge two data table', function () {
        var nosql = new FlyJson();
        var data = nosql.set(data1).join('profile',data2)
            .merge('user_id','id').exec();
        assert.strictEqual(data[0].user_id,1);
        assert.strictEqual(data[0].id,1);
    });

    it('Merge two data table [shallow]', function () {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data1).join('profile',data2)
            .merge('user_id','id').exec();
        assert.strictEqual(data[0].user_id,1);
        assert.strictEqual(data[0].id,1);
    });

    it('Merge multiple data table', function () {
        var nosql = new FlyJson();
        var table = nosql.set(data1).join('profile',data2).merge('user_id','id').exec();
        var data = nosql.set(table).join('bio',data3).merge('user_id','id').exec();
        assert.strictEqual(data[0].user_id,1);
        assert.strictEqual(data[0].id,1);
    });

    it('Merge multiple data table [shallow]', function () {
        var nosql = new FlyJson();
        var table = nosql.setMode('shallow').set(data1).join('profile',data2).merge('user_id','id').exec();
        var data = nosql.set(table).join('bio',data3).merge('user_id','id').exec();
        assert.strictEqual(data[0].user_id,1);
        assert.strictEqual(data[0].id,1);
    });

    it('Join two table', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data1).join('profile',data2).on('user_id','id').exec();
        assert.strictEqual(data[0].profile.id,1);
        assert.strictEqual(data[0].user_id,1);
    });

    it('Join two table [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data1).join('profile',data2).on('user_id','id').exec();
        assert.strictEqual(data[0].profile.id,1);
        assert.strictEqual(data[0].user_id,1);
    });

    it('Join two table with same parent id', function() {
        var nosql = new FlyJson();
        var data = nosql.set(data1).join('user_id',data2).on('user_id','id').exec();
        assert.strictEqual(data[0].user_id.id,1);
    });

    it('Join two table with same parent id [shallow]', function() {
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data1).join('user_id',data2).on('user_id','id').exec();
        assert.strictEqual(data[0].user_id.id,1);
    });

    it('Join multiple table', function(){
        var nosql = new FlyJson();
        var profile = nosql.set(data1).join('profile',data2).on('user_id','id').exec();
        var data = nosql.set(profile).join('bio',data3).on('user_id','id').exec();
        assert.strictEqual(data[0].profile.id,1);
        assert.strictEqual(data[0].bio.id,1);
        assert.strictEqual(data[0].user_id,1);
    });

    it('Join multiple table [shallow]', function(){
        var nosql = new FlyJson();
        var profile = nosql.setMode('shallow').set(data1).join('profile',data2).on('user_id','id').exec();
        var data = nosql.setMode('shallow').set(profile).join('bio',data3).on('user_id','id').exec();
        assert.strictEqual(data[0].profile.id,1);
        assert.strictEqual(data[0].bio.id,1);
        assert.strictEqual(data[0].user_id,1);
    });

    it('Join multiple nested table', function(){
        var nosql = new FlyJson();
        var bio = nosql.set(data2).join('bio',data3).on('id','id').exec();
        var data = nosql.set(data1).join('data',bio).on('user_id','id').exec();
        assert.strictEqual(data[0].data.bio.id,1);
        assert.strictEqual(data[0].data.id,1);
        assert.strictEqual(data[0].user_id,1);
    });

    it('Join multiple nested table [shallow]', function(){
        var nosql = new FlyJson();
        var bio = nosql.setMode('shallow').set(data2).join('bio',data3).on('id','id').exec();
        var data = nosql.setMode('shallow').set(data1).join('data',bio).on('user_id','id').exec();
        assert.strictEqual(data[0].data.bio.id,1);
        assert.strictEqual(data[0].data.id,1);
        assert.strictEqual(data[0].user_id,1);
    });

    it('Group by data', function(){
        var nosql = new FlyJson();
        var data = nosql.set(data4).groupBy('brand').exec();
        assert.strictEqual(data.length,4);
    });

    it('Group by data [shallow]', function(){
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data4).groupBy('brand').exec();
        assert.strictEqual(data.length,4);
    });

    it('Group by data with sum', function(){
        var nosql = new FlyJson();
        var data = nosql.set(data4).groupBy('brand',['stock']).select(['brand','stock','item_count','average_stock']).exec();
        assert.strictEqual(data.length,4);
        for(var i=0;i<data.length;i++) {
            assert.notEqual(data[i].item_count,undefined);
            assert.notEqual(data[i].average_stock,undefined);
        }
    });

    it('Group by data with sum [shallow]', function(){
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data4).groupBy('brand',['stock']).select(['brand','stock','item_count','average_stock']).exec();
        assert.strictEqual(data.length,4);
        for(var i=0;i<data.length;i++) {
            assert.notEqual(data[i].item_count,undefined);
            assert.notEqual(data[i].average_stock,undefined);
        }
    });
    
    it('Group detail data', function(){
        var nosql = new FlyJson();
        var data = nosql.set(data4).groupDetail('brand').exec();
        assert.strictEqual(data.length,1);
        assert.notEqual(data[0].brand,undefined);
    });

    it('Group detail data [shallow]', function(){
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data4).groupDetail('brand').exec();
        assert.strictEqual(data.length,1);
        assert.notEqual(data[0].brand,undefined);
    });

    it('Group detail data with custom group name', function(){
        var nosql = new FlyJson();
        var data = nosql.set(data4).groupDetail('brand','group_by_name').exec();
        assert.strictEqual(data.length,1);
        assert.notEqual(data[0].group_by_name,undefined);
    });

    it('Group detail data with custom group name [shallow]', function(){
        var nosql = new FlyJson();
        var data = nosql.setMode('shallow').set(data4).groupDetail('brand','group_by_name').exec();
        assert.strictEqual(data.length,1);
        assert.notEqual(data[0].group_by_name,undefined);
    });

    it('cleanup',function(){
        var nosql = new FlyJson();
        var data = nosql.set(data2).clean().exec();
        assert.deepStrictEqual(data,[]);
    });

});