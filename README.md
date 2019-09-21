# fly-json-odm
[![NPM](https://nodei.co/npm/fly-json-odm.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fly-json-odm/)  
  
[![npm version](https://img.shields.io/npm/v/fly-json-odm.svg?style=flat-square)](https://www.npmjs.org/package/fly-json-odm)
[![Build Status](https://travis-ci.org/aalfiann/fly-json-odm.svg?branch=master)](https://travis-ci.org/aalfiann/fly-json-odm)
[![Coverage Status](https://coveralls.io/repos/github/aalfiann/fly-json-odm/badge.svg?branch=master)](https://coveralls.io/github/aalfiann/fly-json-odm?branch=master)
[![Known Vulnerabilities](https://snyk.io//test/github/aalfiann/fly-json-odm/badge.svg?targetFile=package.json)](https://snyk.io//test/github/aalfiann/fly-json-odm?targetFile=package.json)
![NPM download/month](https://img.shields.io/npm/dm/fly-json-odm.svg)
![NPM download total](https://img.shields.io/npm/dt/fly-json-odm.svg)  
An Object Document Mapper to handle JSON on the fly for NodeJS


### Background
`fly-json-odm` is the ODM library to handle JSON on the fly like `NOSQL` does. You are able to make manipulation of JSON like ORM. For example is to do `Insert`, `Read`, `Update`, `Modify`, `Delete`, `Join` and `Query`. When you are develop in `microservices` architecture, you will face up that everything should be handle from rest json via each services, because you can not access directly into the database.  

### Limitation
This library was created to handle JSON for `modification`/`manipulation` only and any data will be processed and saved in memory for temporary (`On-The-Fly`). Not support for to use with any database server also we don't provide feature how to read JSON from `file`, `stream` or something like that.

## Install using NPM
```bash
$ npm install fly-json-odm
```

### Usage
```javascript
const FlyJson = require('fly-json-odm');

var nosql = new FlyJson();
```

### Example Data Json
All example at here will use this example data json.
```javascript
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

var data4 = [
    {brand:'Audi',color:'black',stock:32},
    {brand:'Audi',color:'white',stock:76},
    {brand:'Ferarri',color:'red',stock:8},
    {brand:'Ford',color:'white',stock:49},
    {brand:'Peugot',color:'white',stock:23}
];
```

**Note:**
- Structure Table JSON must be an `Array` which is contains `Object` like example above.

#### A. Synchronous
`fly-json-odm` is synchronous as default.  
Worry about blocking event loop? Please see [B. Asynchronous](#b-asynchronous).

##### Insert
```javascript
var data = nosql.set(data2)
  .insert({
    id:6,
    address:'madiun',
    email:'i@j.com'
  })
  .exec();
console.log(data);
```

##### Update
```javascript
var data = nosql.set(data2)
  .update('id',5,{
    address:'ponorogo',
    email:'xxx@gmail.com'
  })
  .exec();
console.log(data);
```

##### Modify
```javascript
var data = nosql.set(data2)
  .modify('id',5,{
    address:'ponorogo',
    email:'xxx@gmail.com',
    about:'Just ordinary programmer'
  })
  .exec();
console.log(data);
```

##### Delete
```javascript
var data = nosql.set(data2)
  .delete('id',5).exec();
console.log(data);
```
---
##### Query
Below here is the example how you can use your logic as similar when you created `SQL Query` with `fly-json-odm`.

###### - Basic

- SELECT id, address FROM data2 WHERE address = 'jakarta';
```javascript
var data = nosql.set(data2)
  .select(['id','address'])
  .where('address','jakarta')
  .exec();
console.log(data);
```

- SELECT user_id, name, age FROM data1 WHERE age BETWEEN '10' AND '30';
```javascript
var data = nosql.set(data1)
  .select(['user_id','name','age'])
  .where('age','>=','10')
  .where('age','<=','30')
  .exec();
console.log(data);
```

- SELECT id, address FROM data2 WHERE address LIKE '%a%' AND address LIKE '%ba%';
```javascript
var data = nosql.set(data2)
  .select(['id','address'])
  .where('address','like','a')
  .where('address','like','ba')
  .exec();
console.log(data);
```

- SELECT id, address FROM data2 WHERE address LIKE '%u%' OR address = 'solo';
```javascript
var data = nosql.set(data2)
  .select(['id','address'])
  .begin()
  .where('address','like','u')
  .or()
  .where('address','===','solo')
  .end()
  .exec();
console.log(data);
```

- SELECT id, address FROM data2 WHERE address LIKE '%u%' OR address = 'solo' ORDERBY 'id' ASC;
```javascript
var data = nosql.set(data2)
  .select(['id','address'])
  .begin()
  .where('address','like','u')
  .or()
  .where('address','===','solo')
  .end()
  .orderBy('id',false)
  .exec();
console.log(data);
```

- SELECT id, address FROM data2 WHERE address LIKE '%u%' OR address = 'solo' ORDERBY 'id' ASC LIMIT 2;
```javascript
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
console.log(data);
```

- SELECT id, address FROM data2 WHERE address LIKE '%u%' OR address = 'solo' ORDERBY 'id' ASC LIMIT 1,2;
```javascript
var data = nosql.set(data2)
  .select(['id','address'])
  .begin()
  .where('address','like','u')
  .or()
  .where('address','===','solo')
  .end()
  .orderBy('id',false)
  .skip(1)
  .take(2)
  .exec();
console.log(data);
```
Limit and Offset mostly use for pagination, but we have more simpler way to make a pagination
```javascript
var data = nosql.set(data2)
  .select(['id','address'])
  .begin()
  .where('address','like','u')
  .or()
  .where('address','===','solo')
  .end()
  .orderBy('id',false)
  .paginate(1,2)
  .exec();
console.log(data);
```
---
###### - Group By or with SUM
- SELECT * FROM data4 GROUPBY brand ORDERBY brand ASC;
```javascript
var data = nosql.set(data4)
  .groupBy('brand')
  .orderBy('brand')
  .exec();
console.log(data);
```

- SELECT brand, sum(stock) AS 'stock', item_count, average_stock FROM data4 GROUPBY brand ORDERBY brand ASC;
```javascript
var data = nosql.set(data4)
  .groupBy('brand',['stock'])
  .orderBy('brand')
  .select(['brand','stock','item_count','average_stock'])
  .exec();
console.log(data);
```
**Note:** 
- You are able to put `select()` method on tail before `exec()`.
- `item_count` and `average_stock` is added automatically when you are using `groupBy` with `sumField`.
---
###### - GroupDetail
This is for grouping data but the data detail will show as nested. This feature is not exists at mostly relation database engine, so I can not show you how the query is.
```javascript
var data = nosql.set(data4).groupDetail('brand').exec();
console.log(data);
```
---

###### - Join Merge
- Merge two data table
```javascript
var data = nosql.set(data1).join('profile',data2)
  .merge('user_id','id')
  .exec();
console.log(data);
```

- Merge multiple data table
```javascript
var table = nosql.set(data1).join('profile',data2).merge('user_id','id').exec();
var data = nosql.set(table).join('bio',data3).merge('user_id','id').exec();
console.log(data);
```
---
###### - Join On
- Join on two data table
```javascript
var data = nosql.set(data1).join('profile',data2).on('user_id','id').exec();
console.log(data);
```

- Join on multiple data table
```javascript
var profile = nosql.set(data1).join('profile',data2).on('user_id','id').exec();
var data = nosql.set(profile).join('bio',data3).on('user_id','id').exec();
console.log(data);
```

- Join on multiple nested data table
```javascript
var bio = nosql.set(data2).join('bio',data3).on('id','id').exec();
var data = nosql.set(data1).join('data',bio).on('user_id','id').exec();
console.log(data);
```


#### B. Asynchronous
To achieve non blocking or asynchronous. You have to wrap with `promisify()`
```javascript
var nosql = new FlyJson();
nosql.promisify((builder) => {return builder}).then(function(table){
  var data = table.set(data2)
    .select(['id','address','email'])
    .where('address','jakarta')
    .exec();
  console.log(data);
});
```
### Main Method
- `.set(data)` - Set data table.
- `.insert(obj)` - Insert new object into data table.
- `.update(id,value,obj)` - Update single data object in data table.
- `.modify(id,value,obj)` - Modify or Add new key for single data object in data table.
- `.delete(id,value)` - Delete single data object in data table.
- `.select(key)` - Filter data by select name key.
- `.where(...args)` - Filter data by where. Please see [comparison-operators](#comparison-operators).
- `.begin()` - Beginning to build query with condition OR.
- `.or()` - Add new OR condition.
- `.end()` -  Ending of build query with condition OR.
- `.clean()` - Cleanup data table and all temporary object.
- `.join(name,data)` - Join two data table.
- `.merge(a,b)` - Merge two data table.
- `.on(a,b)` - Set indentifier to joining two data table.
- `.orderBy(name,desc=false,primer)` - Sort data ascending or descending by key name (support primer function).
- `.groupBy(name,sumField=[])` - Grouping data or with sum field.
- `.groupDetail(name,groupName='')` - Grouping data with detail nested.
- `.skip(size)` - Skip data by size.
- `.take(size)` - Take data by size.
- `.paginate(page,page_size)` - Paginate data by page and page_size.
- `.exec()` - Return output of data table.
- `.promisify(fn)` - Make asynchronous process with Promise.

### Helper Method
- `.isString(value)` - Determine value is string.
- `.isInteger(value)` - Determine value is integer.
- `.isBoolean(value)` - Determine value is boolean.
- `.isArray(value)` - Determine value is array.
- `.isObject(value)` - Determine value is object.
- `.isEmpty(value)` - Determine value is empty.
- `.isEmptyArray(value)` - Determine value is empty and array.
- `.isEmptyObject(value)` - Determine object value is empty.
- `.blockingTest(ms=1000)` - Blocking execution of code for asynchronous test.
- `.safeStringify(value,[space])` - Safe JSON.stringify to avoid type error converting circular structure to json.
- `.deepClone(array)` - Very safe deep clone an array.
- `.jsonTransform(data, map)` - For restructuring and performing operations on JSON. Please see [how to use jsonTransform](https://github.com/aalfiann/fly-json-odm/wiki/jsonTransform).

### Comparison Operators
Here is the comparison operator to use with `.where(...args)`.  
Example:  
- `.where('address','jakarta')` - Default is `===`; Case Sensitive.
- `.where('address','!=','jakarta')` - Case Sensitive
- `.where('address','like','Jakarta',false)` - Case Insensitive.
- `.where('address','regex',/[a-j/)` - Support Regex.

|Name				  |Details|
|---				  |---|
|`=` or `==`  |Equality|
|`===`        |Strict Equality|
|`!=`         |Not Equals|
|`!==`        |Strict Not Equals|
|`>`          |Greater than|
|`>=`         |Greater than or equal|
|`<`          |Less than|
|`<=`         |Less than or equal|
|`IN`         |Checks if the value is within an array or object|
|`NOT`        |Not Equals (same as `!=`)|
|`LIKE`       |Search the value|
|`NOT LIKE`   |Search the value (opposite)|
|`REGEX`      |Regex search|

### Unit Test
If you want more example, you can play around with unit test.
```bash
$ npm test
```