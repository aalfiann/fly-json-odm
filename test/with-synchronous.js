/* global describe it */
const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

const data1 = [
  { user_id: 1, name: 'budi', age: 10 },
  { user_id: 5, name: 'wawan', age: 20 },
  { user_id: 3, name: 'tono', age: 30 }
];

const data2 = [
  { id: 1, address: 'bandung', email: 'a@b.com' },
  { id: 2, address: 'jakarta', email: 'c@d.com' },
  { id: 3, address: 'solo', email: 'e@f.com' },
  { id: 4, address: 'solo, balapan', email: 'g@h.com' },
  { id: 5, address: 'surabaya', email: 'i@j.com' }
];

const data2insert = [
  { id: 6, address: 'madiun', email: 'madiun@yahoo.com' },
  { id: 7, address: 'malang', email: 'malang@gmail.com' }
];

const data2update = [
  { id: 3, address: 'solo', email: 'solo@yahoo.com' },
  { id: 4, address: 'solo, balapan', email: 'balapan@gmail.com' }
];

const data2updatereverse = [
  { id: 4, address: 'solo, balapan', email: 'balapan@gmail.com' },
  { id: 3, address: 'solo', email: 'solo@yahoo.com' }
];

// const data2modify = [
//   { id: 3, email: 'solo@yahoo.com', about: 'I was born in solo' },
//   { id: 4, email: 'balapan@gmail.com', about: 'Balapan city is the best', located: 'Central Java' }
// ];

const data2modifyreverse = [
  { id: 4, email: 'balapan@gmail.com', about: 'Balapan city is the best', located: 'Central Java' },
  { id: 3, email: 'solo@yahoo.com', about: 'I was born in solo' }
];

const data3 = [
  { id: 1, bio: 'I was born in bandung', phone: 'a@b.com' },
  { id: 2, bio: 'I was born in jakarta', phone: 'c@d.com' },
  { id: 3, bio: 'I was born in solo', phone: 'e@f.com' },
  { id: 4, bio: 'I was born in semarang', phone: 'g@h.com' },
  { id: 5, bio: 'I was born in surabaya', phone: 'i@j.com' }
];

const data4 = [
  { brand: 'Audi', color: 'black', stock: 32 },
  { brand: 'Audi', color: 'white', stock: 76 },
  { brand: 'Ferarri', color: 'red', stock: 8 },
  { brand: 'Ford', color: 'white', stock: 49 },
  { brand: 'Peugot', color: 'white', stock: 23 }
];

const data5 = [
  { id: 1, title: 'this is my first post', tags: ['News', 'nodejs', 'tech', 224, null, { type: 'hi' }] },
  { id: 2, title: 'this is my second post', tags: ['tutorial', 'linux', 'tech', 234, null, { type: 'moderate' }] },
  { id: 3, title: 'this is my third post', tags: ['News', 'info', 'tech', 244, null, { type: 'low' }] }
];

const data6 = [
  { id: 1, title: 'this is my first post', category: { id: 1, name: 'news' } },
  { id: 2, title: 'this is my second post', category: { id: 4, name: 'Tutorial' } },
  { id: 3, title: 'this is my third post', category: { id: 2, name: 'tech' } }
];

const data7 = [
  { id: 1, name: 'AAA', created: '2019-10-01 00:02:33' },
  { id: 2, name: 'BBB', created: '2019-10-02 01:52:53' },
  { id: 3, name: 'CCC', created: '2019-10-03 02:42:43' },
  { id: 4, name: 'DDD', created: '2019-10-04 03:32:13' },
  { id: 5, name: 'EEE', created: '2019-10-05 04:22:13' },
  { id: 6, name: 'FFF', created: '2019-10-06 05:12:33' },
  { id: 7, name: 'GGG', created: '2019-10-07 06:02:03' }
];

const data8 = [
  { id: 1, name: 'AAA', created: '2019-10-01 00:02:33' },
  { id: 1, name: 'AAA', created: '2019-10-01 00:02:33' },
  { id: 1, name: 'BBB', created: '2019-10-01 00:02:33' },
  { id: 4, name: 'DDD', created: '2019-10-04 03:32:13' },
  { id: 4, name: 'DDD', created: '2019-10-04 03:32:13' },
  { id: 7, name: 'GGG', created: '2019-10-07 06:02:03' },
  { id: 7, name: 'GGG', created: '2019-10-07 06:02:03' }
];

const data9 = [
  { id: 1, title: 'this is my first post', tags: null },
  { id: 2, title: 'this is my second post', tags: ['tutorial', 'linux', 'tech', 234, null, { type: 'moderate' }] },
  { id: 3, title: 'this is my third post', tags: ['News', 'info', 'tech', 244, null, { type: 'low' }] }
];

const data10 = [
  { id: 1, title: 'this is my first post', category: { id: 1, name: null } },
  { id: 2, title: 'this is my second post', category: { id: 4, name: 'Tutorial' } },
  { id: 3, title: 'this is my third post', category: { id: 2, name: 'tech' } }
];

const data11 = [
  { name: 'budi', address: 'jakarta' },
  { name: 'tono', address: 'solo' }
];

const data12 = [
  { state: 'kampung tengah', address: 'jakarta' },
  { state: 'kramat jati', address: 'jakarta' },
  { state: 'kampung gedong', address: 'Jakarta' },
  { state: 'manahan', address: 'solo' }
];

const data13 = [
  { name: 'budi', group: 1 },
  { name: 'tono', group: 2 }
];

const data14 = [
  { group: 1, state: 'kampung tengah', address: 'jakarta' },
  { group: 1, state: 'kramat jati', address: 'jakarta' },
  { group: '1', state: 'kampung gedong', address: 'Jakarta' },
  { group: 2, state: 'manahan', address: 'solo' }
];

const data15 = [
  { id: 1, level: 'medium', group: [{ category: 'Arcade' }] },
  { id: 3, level: 'hard', group: [] },
  { id: 5, level: 'easy', group: [{ category: 'Strategy' }] }
];

const data16 = [
  { id: 1, level: 'medium', group: { category: 'Arcade' } },
  { id: 3, level: 'hard', group: {} },
  { id: 5, level: 'easy', group: { category: 'Strategy' } }
];

const advancedsearch = [
  { id: 1, level: 'medium', team: [{ name: 'Giant' }, { name: 'suneo' }, { name: 'nobita' }] },
  { id: 3, level: 'hard', team: [{ name: 'giant2' }, { name: 'shizuka' }, { name: 'nobita' }] },
  { id: 5, level: 'easy', team: [{ name: 'nobita' }, { name: '2suneo' }] }
];

describe('normal / synchronous CRUD test', function () {
  this.timeout(10000);

  it('insert data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2).insert({ id: 6, address: 'madiun', email: 'i@j.com' }).exec();
    assert.strictEqual(data.length, 6);
    assert.strictEqual(data[5].id, 6);
    assert.strictEqual(data[5].address, 'madiun');
    assert.strictEqual(data[5].email, 'i@j.com');
  });

  it('insert data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2).insert({ id: 6, address: 'madiun', email: 'i@j.com' }).exec();
    assert.strictEqual(data.length, 6);
    assert.strictEqual(data[5].id, 6);
    assert.strictEqual(data[5].address, 'madiun');
    assert.strictEqual(data[5].email, 'i@j.com');
  });

  it('multiple insert data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2);
    for (let i = 6; i < 9; i++) {
      data.insert({ id: i, address: 'madiun', email: 'i@j.com' });
    }
    const result = data.exec();
    assert.strictEqual(result.length, 8);
    for (let x = 5, y = 6; x < 8; x++, y++) {
      assert.strictEqual(result[x].id, y);
      assert.strictEqual(result[x].address, 'madiun');
      assert.strictEqual(result[x].email, 'i@j.com');
    }
  });

  it('multiple insert data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2);
    for (let i = 6; i < 9; i++) {
      data.insert({ id: i, address: 'madiun', email: 'i@j.com' });
    }
    const result = data.exec();
    assert.strictEqual(result.length, 8);
    for (let x = 5, y = 6; x < 8; x++, y++) {
      assert.strictEqual(result[x].id, y);
      assert.strictEqual(result[x].address, 'madiun');
      assert.strictEqual(result[x].email, 'i@j.com');
    }
  });

  it('insert many data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .insertMany(data2insert).exec();
    assert.strictEqual(data.length, 7);
    assert.strictEqual(data[5].id, 6);
    assert.strictEqual(data[5].address, 'madiun');
    assert.strictEqual(data[5].email, 'madiun@yahoo.com');
    assert.strictEqual(data[6].id, 7);
    assert.strictEqual(data[6].address, 'malang');
    assert.strictEqual(data[6].email, 'malang@gmail.com');
  });

  it('insert many data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .insertMany(data2insert).exec();
    assert.strictEqual(data.length, 7);
    assert.strictEqual(data[5].id, 6);
    assert.strictEqual(data[5].address, 'madiun');
    assert.strictEqual(data[5].email, 'madiun@yahoo.com');
    assert.strictEqual(data[6].id, 7);
    assert.strictEqual(data[6].address, 'malang');
    assert.strictEqual(data[6].email, 'malang@gmail.com');
  });

  it('update data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .update('id', 5, { address: 'ponorogo', email: 'xxx@gmail.com' })
      .exec();
    assert.strictEqual(data.length, 5);
    assert.strictEqual(data[4].id, 5);
    assert.strictEqual(data[4].address, 'ponorogo');
    assert.strictEqual(data[4].email, 'xxx@gmail.com');
  });

  it('update data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .update('id', 5, { address: 'ponorogo', email: 'xxx@gmail.com' })
      .exec();
    assert.strictEqual(data.length, 5);
    assert.strictEqual(data[4].id, 5);
    assert.strictEqual(data[4].address, 'ponorogo');
    assert.strictEqual(data[4].email, 'xxx@gmail.com');
  });

  it('multiple update data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2);
    for (let i = 0; i < 3; i++) {
      data.update('id', i, { address: 'ponorogo', email: 'xxx@gmail.com' });
    }
    const result = data.exec();
    assert.strictEqual(result.length, 5);
    assert.strictEqual(result[3].id, 1);
    assert.strictEqual(result[3].address, 'ponorogo');
    assert.strictEqual(result[3].email, 'xxx@gmail.com');
    assert.strictEqual(result[4].id, 2);
    assert.strictEqual(result[4].address, 'ponorogo');
    assert.strictEqual(result[4].email, 'xxx@gmail.com');
  });

  it('multiple update data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2);
    for (let i = 0; i < 3; i++) {
      data.update('id', i, { address: 'ponorogo', email: 'xxx@gmail.com' });
    }
    const result = data.exec();
    assert.strictEqual(result.length, 5);
    assert.strictEqual(result[3].id, 1);
    assert.strictEqual(result[3].address, 'ponorogo');
    assert.strictEqual(result[3].email, 'xxx@gmail.com');
    assert.strictEqual(result[4].id, 2);
    assert.strictEqual(result[4].address, 'ponorogo');
    assert.strictEqual(result[4].email, 'xxx@gmail.com');
  });

  it('update many data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .updateMany('id', data2update).exec();
    assert.strictEqual(data.length, 5);
    assert.strictEqual(data[2].email, 'solo@yahoo.com');
    assert.strictEqual(data[3].email, 'balapan@gmail.com');
  });

  it('update many data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .updateMany('id', data2update).exec();
    assert.strictEqual(data.length, 5);
    assert.strictEqual(data[2].email, 'solo@yahoo.com');
    assert.strictEqual(data[3].email, 'balapan@gmail.com');
  });

  it('update many data reverse', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .updateMany('id', data2updatereverse).exec();
    assert.strictEqual(data.length, 5);
    assert.strictEqual(data[2].email, 'solo@yahoo.com');
    assert.strictEqual(data[3].email, 'balapan@gmail.com');
  });

  it('update many data reverse [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .updateMany('id', data2updatereverse).exec();
    assert.strictEqual(data.length, 5);
    assert.strictEqual(data[2].email, 'solo@yahoo.com');
    assert.strictEqual(data[3].email, 'balapan@gmail.com');
  });

  it('modify data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .modify('id', 5, { address: 'ponorogo', email: 'xxx@gmail.com', about: 'Just ordinary programmer' })
      .exec();
    assert.strictEqual(data.length, 5);
    assert.strictEqual(data[4].id, 5);
    assert.strictEqual(data[4].address, 'ponorogo');
    assert.strictEqual(data[4].email, 'xxx@gmail.com');
  });

  it('modify data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .modify('id', 5, { address: 'ponorogo', email: 'xxx@gmail.com', about: 'Just ordinary programmer' })
      .exec();
    assert.strictEqual(data.length, 5);
    assert.strictEqual(data[4].id, 5);
    assert.strictEqual(data[4].address, 'ponorogo');
    assert.strictEqual(data[4].email, 'xxx@gmail.com');
  });

  it('multiple modify data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2);
    for (let i = 0; i < 3; i++) {
      data.modify('id', i, { address: 'ponorogo', email: 'xxx@gmail.com', about: 'Just ordinary programmer' });
    }
    const result = data.exec();
    assert.strictEqual(result.length, 5);
    assert.strictEqual(result[3].id, 1);
    assert.strictEqual(result[3].address, 'ponorogo');
    assert.strictEqual(result[3].email, 'xxx@gmail.com');
    assert.strictEqual(result[4].id, 2);
    assert.strictEqual(result[4].address, 'ponorogo');
    assert.strictEqual(result[4].email, 'xxx@gmail.com');
  });

  it('multiple modify data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2);
    for (let i = 0; i < 3; i++) {
      data.modify('id', i, { address: 'ponorogo', email: 'xxx@gmail.com', about: 'Just ordinary programmer' });
    }
    const result = data.exec();
    assert.strictEqual(result.length, 5);
    assert.strictEqual(result[3].id, 1);
    assert.strictEqual(result[3].address, 'ponorogo');
    assert.strictEqual(result[3].email, 'xxx@gmail.com');
    assert.strictEqual(result[4].id, 2);
    assert.strictEqual(result[4].address, 'ponorogo');
    assert.strictEqual(result[4].email, 'xxx@gmail.com');
  });

  it('modify many data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .modifyMany('id', data2modifyreverse).exec();
    assert.strictEqual(data.length, 5);
    assert.strictEqual(data[2].about, 'I was born in solo');
    assert.strictEqual(data[3].about, 'Balapan city is the best');
    assert.strictEqual(data[3].located, 'Central Java');
  });

  it('modify many data [shallow is not allowed]', function () {
    const nosql = new FlyJson();
    assert.throws(() => {
      nosql.setMode('shallow').set(data2)
        .modifyMany('id', data2modifyreverse).exec();
    }, Error);
  });

  it('modify many data reverse', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .modifyMany('id', data2modifyreverse).exec();
    assert.strictEqual(data.length, 5);
    assert.strictEqual(data[2].about, 'I was born in solo');
    assert.strictEqual(data[3].about, 'Balapan city is the best');
    assert.strictEqual(data[3].located, 'Central Java');
  });

  it('modify many data reverse [shallow is not allowed]', function () {
    const nosql = new FlyJson();
    assert.throws(() => {
      nosql.setMode('shallow').set(data2)
        .modifyMany('id', data2modifyreverse).exec();
    }, Error);
  });

  it('delete data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .delete('id', 5)
      .exec();
    assert.strictEqual(data.length, 4);
    assert.strictEqual(data[3].id, 4);
    assert.strictEqual(data[3].address, 'solo, balapan');
    assert.strictEqual(data[3].email, 'g@h.com');
  });

  it('delete data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .delete('id', 5)
      .exec();
    assert.strictEqual(data.length, 4);
    assert.strictEqual(data[3].id, 4);
    assert.strictEqual(data[3].address, 'solo, balapan');
    assert.strictEqual(data[3].email, 'g@h.com');
  });

  it('multiple delete data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2);
    for (let i = 1; i < 4; i++) {
      data.delete('id', i);
    }
    const result = data.exec();
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].id, 4);
    assert.strictEqual(result[0].address, 'solo, balapan');
    assert.strictEqual(result[0].email, 'g@h.com');
    assert.strictEqual(result[1].id, 5);
    assert.strictEqual(result[1].address, 'surabaya');
    assert.strictEqual(result[1].email, 'i@j.com');
  });

  it('multiple delete data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2);
    for (let i = 1; i < 4; i++) {
      data.delete('id', i);
    }
    const result = data.exec();
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].id, 4);
    assert.strictEqual(result[0].address, 'solo, balapan');
    assert.strictEqual(result[0].email, 'g@h.com');
    assert.strictEqual(result[1].id, 5);
    assert.strictEqual(result[1].address, 'surabaya');
    assert.strictEqual(result[1].email, 'i@j.com');
  });

  it('delete many data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .deleteMany('id', [2, 5])
      .exec();
    assert.strictEqual(data.length, 3);
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[2].id, 4);
  });

  it('delete many data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .deleteMany('id', [2, 5])
      .exec();
    assert.strictEqual(data.length, 3);
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[2].id, 4);
  });

  it('delete many data reverse', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .deleteMany('id', [5, 2])
      .exec();
    assert.strictEqual(data.length, 3);
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[2].id, 4);
  });

  it('delete many data reverse [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .deleteMany('id', [5, 2])
      .exec();
    assert.strictEqual(data.length, 3);
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[2].id, 4);
  });
});

describe('normal / synchronous Query test', function () {
  this.timeout(10000);

  it('select data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .select(['id', 'address'])
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 2);
    assert.strictEqual(data[2].id, 3);
    assert.strictEqual(data[3].id, 4);
    assert.strictEqual(data[4].id, 5);
  });

  it('select data + distinct', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data8)
      .select(['id', 'name', 'created'])
      .distinct()
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 1);
    assert.strictEqual(data[2].id, 4);
    assert.strictEqual(data[3].id, 7);
  });

  it('select data + distinct by fieldname', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data8)
      .select(['id', 'name', 'created'])
      .distinct('id')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 4);
    assert.strictEqual(data[2].id, 7);
  });

  it('select data + distinct by wrong fieldname', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data8)
      .select(['id', 'name', 'created'])
      .distinct('omg')
      .exec();
    assert.strictEqual(data.length, 0);
  });

  it('select data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .select(['id', 'address'])
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 2);
    assert.strictEqual(data[2].id, 3);
    assert.strictEqual(data[3].id, 4);
    assert.strictEqual(data[4].id, 5);
  });

  it('select + where', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .select(['id', 'address'])
      .where('address', 'jakarta')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].address, 'jakarta');
  });

  it('select + where [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .select(['id', 'address'])
      .where('address', 'jakarta')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].address, 'jakarta');
  });

  it('select + where (case insensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data4)
      .select(['brand', 'color', 'stock'])
      .where('brand', '==', 'audi', false)
      .exec();
    assert.strictEqual(data[0].brand, 'Audi');
    assert.strictEqual(data[1].brand, 'Audi');
  });

  it('select + where (case insensitive) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data4)
      .select(['brand', 'color', 'stock'])
      .where('brand', '==', 'audi', false)
      .exec();
    assert.strictEqual(data[0].brand, 'Audi');
    assert.strictEqual(data[1].brand, 'Audi');
  });

  it('select + where + =', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data4)
      .select(['brand', 'color', 'stock'])
      .where('brand', '=', 'Audi')
      .exec();
    assert.strictEqual(data[0].brand, 'Audi');
    assert.strictEqual(data[1].brand, 'Audi');
  });

  it('select + where + = [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data4)
      .select(['brand', 'color', 'stock'])
      .where('brand', '=', 'Audi')
      .exec();
    assert.strictEqual(data[0].brand, 'Audi');
    assert.strictEqual(data[1].brand, 'Audi');
  });

  it('select + where (in array)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'IN', 'News')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].tags[0], 'News');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].tags[0], 'News');
  });

  it('select + where (in array) with null array', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data9)
      .select(['id', 'title', 'tags'])
      .where('tags', 'IN', 'News')
      .exec();
    assert.strictEqual(data[0].id, 3);
    assert.strictEqual(data[0].tags[0], 'News');
  });

  it('select + where + remove any value with empty array', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data15)
      .select(['id', 'level', 'group'])
      .where('group', 'FUNCTION', function (value) {
        return !nosql.isEmptyArray(value);
      })
      .exec();

    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 5);
  });

  it('select + where + remove any value with empty object', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data16)
      .select(['id', 'level', 'group'])
      .where('group', 'FUNCTION', function (value) {
        return !nosql.isEmptyObject(value);
      })
      .exec();

    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 5);
  });

  it('select + where (in array) with null array case insensitive', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data9)
      .select(['id', 'title', 'tags'])
      .where('tags', 'IN', 'News', false)
      .exec();
    assert.strictEqual(data[0].id, 3);
    assert.strictEqual(data[0].tags[0], 'News');
  });

  it('select + where (in array) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'IN', 'News')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].tags[0], 'News');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].tags[0], 'News');
  });

  it('select + where (in array case insensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'IN', 'news', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].tags[0], 'News');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].tags[0], 'News');
  });

  it('select + where (in array case insensitive) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'IN', 'news', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].tags[0], 'News');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].tags[0], 'News');
  });

  it('select + where (in object)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'IN', 'Tutorial')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (in object) with null object', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data10)
      .select(['id', 'title', 'category'])
      .where('category', 'IN', 'Tutorial')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (in object) with null object case insenstive', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data10)
      .select(['id', 'title', 'category'])
      .where('category', 'IN', 'Tutorial', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (in object) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'IN', 'Tutorial')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (in object case insensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'IN', 'tutorial', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (in object case insensitive) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'IN', 'tutorial', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (in like array) with null array case insensitive', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data9)
      .select(['id', 'title', 'tags'])
      .where('tags', 'IN like', 'New', false)
      .exec();
    assert.strictEqual(data[0].id, 3);
    assert.strictEqual(data[0].tags[0], 'News');
  });

  it('select + where (in like array) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'IN LIKE', 'New')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].tags[0], 'News');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].tags[0], 'News');
  });

  it('select + where (in like array case insensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'IN LIKE', 'new', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].tags[0], 'News');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].tags[0], 'News');
  });

  it('select + where (in like array case insensitive) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'IN LIKE', 'new', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].tags[0], 'News');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].tags[0], 'News');
  });

  it('select + where (in like object)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'IN LIKE', 'Tutor')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (in like object) with null object', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data10)
      .select(['id', 'title', 'category'])
      .where('category', 'IN LIKE', 'Tutor')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (in like object) with null object case insenstive', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data10)
      .select(['id', 'title', 'category'])
      .where('category', 'IN LIKE', 'tutor', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (in like object) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'IN LIKE', 'Tutor')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (in like object case insensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'IN LIKE', 'tutor', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (in like object case insensitive) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'IN LIKE', 'tutor', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[0].category.id, 4);
    assert.strictEqual(data[0].category.name, 'Tutorial');
  });

  it('select + where (not in array)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN', 'News')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in array) with null array', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data9)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN', 'News')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in array) with null array case insensitive', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data9)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN', 'News', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in array) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN', 'News')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in array case sensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN', 'news')
      .exec();
    assert.strictEqual(data.length, 3);
  });

  it('select + where (not in array case insensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN', 'news', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in array case insensitive) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN', 'news', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in object)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN', 'Tutorial')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('select + where (not in object) with null object', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data10)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN', 'Tutorial')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('select + where (not in object) with null object case insensitive', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data10)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN', 'Tutorial', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('select + where (not in object) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN', 'Tutorial')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('select + where (not in object case sensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN', 'tutorial')
      .exec();
    assert.strictEqual(data.length, 3);
  });

  it('select + where (not in object case insensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN', 'tutorial', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('select + where (not in object case insensitive) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN', 'tutorial', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('select + where (not in like array)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN LIKE', 'New')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in like array) with null array', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data9)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN LIKE', 'New')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in like array) with null array case insensitive', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data9)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN LIKE', 'New', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in like array) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN LIKE', 'New')
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in like array case sensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN LIKE', 'new')
      .exec();
    assert.strictEqual(data.length, 3);
  });

  it('select + where (not in like array case insensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN LIKE', 'new', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in like array case insensitive) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data5)
      .select(['id', 'title', 'tags'])
      .where('tags', 'NOT IN LIKE', 'new', false)
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data.length, 1);
  });

  it('select + where (not in like object)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN LIKE', 'Tutor')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('select + where (not in like object) with null object', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data10)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN LIKE', 'Tutor')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('select + where (not in like object) with null object case insensitive', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data10)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN LIKE', 'Tutor', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('select + where (not in like object) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN LIKE', 'Tutor')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('select + where (not in like object case sensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN LIKE', 'tutor')
      .exec();
    assert.strictEqual(data.length, 3);
  });

  it('select + where (not in like object case insensitive)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN LIKE', 'tutor', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('select + where (not in like object case insensitive) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data6)
      .select(['id', 'title', 'category'])
      .where('category', 'NOT IN LIKE', 'tutor', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[1].id, 3);
  });

  it('advanced search', function () {
    const nosql = new FlyJson();
    const search = 'giant';
    const data = nosql.set(advancedsearch)
      .where('team', 'FUNC', function (value) {
        let found = false;
        for (let i = 0; i < value.length; i++) {
          if (value[i].name.toString().toLowerCase().indexOf(search) !== -1) {
            found = true;
          }
        }
        return found;
      })
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].level, 'medium');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].level, 'hard');
    assert.strictEqual(data.length, 2);
  });

  it('select + where (not)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data4)
      .select(['brand', 'color', 'stock'])
      .where('brand', 'NOT', 'audi', false)
      .exec();
    assert.strictEqual(data[0].brand, 'Ferarri');
    assert.strictEqual(data[1].brand, 'Ford');
    assert.strictEqual(data[2].brand, 'Peugot');
  });

  it('select + where (not) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data4)
      .select(['brand', 'color', 'stock'])
      .where('brand', 'NOT', 'audi', false)
      .exec();
    assert.strictEqual(data[0].brand, 'Ferarri');
    assert.strictEqual(data[1].brand, 'Ford');
    assert.strictEqual(data[2].brand, 'Peugot');
  });

  it('select + where (not like)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data4)
      .select(['brand', 'color', 'stock'])
      .where('brand', 'NOT LIKE', 'audi', false)
      .exec();
    assert.strictEqual(data[0].brand, 'Ferarri');
    assert.strictEqual(data[1].brand, 'Ford');
    assert.strictEqual(data[2].brand, 'Peugot');
  });

  it('select + where (not like) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data4)
      .select(['brand', 'color', 'stock'])
      .where('brand', 'NOT LIKE', 'audi', false)
      .exec();
    assert.strictEqual(data[0].brand, 'Ferarri');
    assert.strictEqual(data[1].brand, 'Ford');
    assert.strictEqual(data[2].brand, 'Peugot');
  });

  it('select + where (regex)', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data4)
      .select(['brand', 'color', 'stock'])
      .where('brand', 'regex', /[A-F]/)
      .exec();
    assert.strictEqual(data[0].brand, 'Audi');
    assert.strictEqual(data[1].brand, 'Audi');
    assert.strictEqual(data[2].brand, 'Ferarri');
    assert.strictEqual(data[3].brand, 'Ford');
  });

  it('select + where (regex) [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data4)
      .select(['brand', 'color', 'stock'])
      .where('brand', 'regex', /[A-F]/)
      .exec();
    assert.strictEqual(data[0].brand, 'Audi');
    assert.strictEqual(data[1].brand, 'Audi');
    assert.strictEqual(data[2].brand, 'Ferarri');
    assert.strictEqual(data[3].brand, 'Ford');
  });

  it('select + where + function for between date', function () {
    const startDate = new Date('2019-10-01');
    const endDate = new Date('2019-10-04');
    const nosql = new FlyJson();
    const data = nosql.set(data7)
      .select(['id', 'name', 'created'])
      .where('created', 'function', value => {
        const aDate = new Date(value);
        return aDate >= startDate && aDate <= endDate;
      })
      .exec();
    assert.strictEqual(data[0].id, 2);
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[2].id, 4);
    assert.strictEqual(data.length, 3);
  });

  it('select + where + <=', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '<=', 20)
      .exec();
    assert.strictEqual(data[0].age, 10);
    assert.strictEqual(data[1].age, 20);
    assert.strictEqual(data.length, 2);
  });

  it('select + where + <= [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '<=', 20)
      .exec();
    assert.strictEqual(data[0].age, 10);
    assert.strictEqual(data[1].age, 20);
    assert.strictEqual(data.length, 2);
  });

  it('select + where + <', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '<', 20)
      .exec();
    assert.strictEqual(data[0].age, 10);
    assert.strictEqual(data.length, 1);
  });

  it('select + where + < [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '<', 20)
      .exec();
    assert.strictEqual(data[0].age, 10);
    assert.strictEqual(data.length, 1);
  });

  it('select + where + >', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '>', 10)
      .exec();
    assert.strictEqual(data[0].age, 20);
    assert.strictEqual(data[1].age, 30);
    assert.strictEqual(data.length, 2);
  });

  it('select + where + > [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '>', 10)
      .exec();
    assert.strictEqual(data[0].age, 20);
    assert.strictEqual(data[1].age, 30);
    assert.strictEqual(data.length, 2);
  });

  it('select + where + >=', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '>=', 10)
      .exec();
    assert.strictEqual(data[0].age, 10);
    assert.strictEqual(data[1].age, 20);
    assert.strictEqual(data[2].age, 30);
    assert.strictEqual(data.length, 3);
  });

  it('select + where + >= [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '>=', 10)
      .exec();
    assert.strictEqual(data[0].age, 10);
    assert.strictEqual(data[1].age, 20);
    assert.strictEqual(data[2].age, 30);
    assert.strictEqual(data.length, 3);
  });

  it('select + where + !=', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '!=', 10)
      .exec();
    assert.strictEqual(data[0].age, 20);
    assert.strictEqual(data[1].age, 30);
    assert.strictEqual(data.length, 2);
  });

  it('select + where + != [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '!=', 10)
      .exec();
    assert.strictEqual(data[0].age, 20);
    assert.strictEqual(data[1].age, 30);
    assert.strictEqual(data.length, 2);
  });

  it('select + where + ==', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '==', 10)
      .exec();
    assert.strictEqual(data[0].age, 10);
    assert.strictEqual(data.length, 1);
  });

  it('select + where + == [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '==', 10)
      .exec();
    assert.strictEqual(data[0].age, 10);
    assert.strictEqual(data.length, 1);
  });

  it('select + where + !==', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '!==', 10)
      .exec();
    assert.strictEqual(data[0].age, 20);
    assert.strictEqual(data[1].age, 30);
    assert.strictEqual(data.length, 2);
  });

  it('select + where + !== [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data1)
      .select(['user_id', 'name', 'age'])
      .where('age', '!==', 10)
      .exec();
    assert.strictEqual(data[0].age, 20);
    assert.strictEqual(data[1].age, 30);
    assert.strictEqual(data.length, 2);
  });

  it('select + where + and', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .select(['id', 'address'])
      .where('address', 'like', 'a')
      .where('address', 'like', 'ba')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].address, 'bandung');
    assert.strictEqual(data[1].id, 4);
    assert.strictEqual(data[1].address, 'solo, balapan');
    assert.strictEqual(data[2].id, 5);
    assert.strictEqual(data[2].address, 'surabaya');
  });

  it('select + where + and [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .select(['id', 'address'])
      .where('address', 'like', 'a')
      .where('address', 'like', 'ba')
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].address, 'bandung');
    assert.strictEqual(data[1].id, 4);
    assert.strictEqual(data[1].address, 'solo, balapan');
    assert.strictEqual(data[2].id, 5);
    assert.strictEqual(data[2].address, 'surabaya');
  });

  it('select + where + or + where', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].address, 'bandung');
    assert.strictEqual(data[1].id, 5);
    assert.strictEqual(data[1].address, 'surabaya');
    assert.strictEqual(data[2].id, 3);
    assert.strictEqual(data[2].address, 'solo');
  });

  it('select + where + or + where [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].address, 'bandung');
    assert.strictEqual(data[1].id, 5);
    assert.strictEqual(data[1].address, 'surabaya');
    assert.strictEqual(data[2].id, 3);
    assert.strictEqual(data[2].address, 'solo');
  });

  it('select + where + or + where + orderby ascending', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].address, 'bandung');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].address, 'solo');
    assert.strictEqual(data[2].id, 5);
    assert.strictEqual(data[2].address, 'surabaya');
  });

  it('select + where + or + where + orderby ascending [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', false)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].address, 'bandung');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].address, 'solo');
    assert.strictEqual(data[2].id, 5);
    assert.strictEqual(data[2].address, 'surabaya');
  });

  it('select + where + or + where + orderby descending', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', true)
      .exec();
    assert.strictEqual(data[0].id, 5);
    assert.strictEqual(data[0].address, 'surabaya');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].address, 'solo');
    assert.strictEqual(data[2].id, 1);
    assert.strictEqual(data[2].address, 'bandung');
  });

  it('select + where + or + where + orderby descending [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', true)
      .exec();
    assert.strictEqual(data[0].id, 5);
    assert.strictEqual(data[0].address, 'surabaya');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].address, 'solo');
    assert.strictEqual(data[2].id, 1);
    assert.strictEqual(data[2].address, 'bandung');
  });

  it('select + where + or + where + orderby with primer', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', false, parseInt)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].address, 'bandung');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].address, 'solo');
    assert.strictEqual(data[2].id, 5);
    assert.strictEqual(data[2].address, 'surabaya');
  });

  it('select + where + or + where + orderby with primer [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', false, parseInt)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].address, 'bandung');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].address, 'solo');
    assert.strictEqual(data[2].id, 5);
    assert.strictEqual(data[2].address, 'surabaya');
  });

  it('select + where + or + where + orderby + take', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', false)
      .take(2)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].address, 'bandung');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].address, 'solo');
  });

  it('select + where + or + where + orderby + take [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', false)
      .take(2)
      .exec();
    assert.strictEqual(data[0].id, 1);
    assert.strictEqual(data[0].address, 'bandung');
    assert.strictEqual(data[1].id, 3);
    assert.strictEqual(data[1].address, 'solo');
  });

  it('select + where + or + where + orderby + skip', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', false)
      .skip(1)
      .exec();
    assert.strictEqual(data[0].id, 3);
    assert.strictEqual(data[0].address, 'solo');
  });

  it('select + where + or + where + orderby + skip [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', false)
      .skip(1)
      .exec();
    assert.strictEqual(data[0].id, 3);
    assert.strictEqual(data[0].address, 'solo');
  });

  it('select + where + or + where + orderby + take + pagination', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', false)
      .take(2)
      .paginate(2, 1)
      .exec();
    assert.strictEqual(data[0].id, 3);
    assert.strictEqual(data[0].address, 'solo');
  });

  it('select + where + or + where + orderby + take + pagination [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data2)
      .select(['id', 'address'])
      .begin()
      .where('address', 'like', 'u')
      .or()
      .where('address', '===', 'solo')
      .end()
      .orderBy('id', false)
      .take(2)
      .paginate(2, 1)
      .exec();
    assert.strictEqual(data[0].id, 3);
    assert.strictEqual(data[0].address, 'solo');
  });

  it('using take when array is smaller and bigger', function () {
    const nosql = new FlyJson();
    const result1 = nosql.setMode('shallow').set(data3).take(2).exec();
    const result2 = nosql.setMode('shallow').set(data3).take(20).exec();
    const result3 = nosql.set(data3).take(2).exec();
    const result4 = nosql.set(data3).take(20).exec();
    assert.strictEqual(result1.length, 2);
    assert.strictEqual(result2.length, 5);
    assert.strictEqual(result3.length, 2);
    assert.strictEqual(result4.length, 5);
  });

  it('Merge two data table', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data1).join('profile', data2)
      .merge('user_id', 'id').exec();
    assert.strictEqual(data[0].user_id, 1);
    assert.strictEqual(data[0].id, 1);
  });

  it('Merge two data table [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data1).join('profile', data2)
      .merge('user_id', 'id').exec();
    assert.strictEqual(data[0].user_id, 1);
    assert.strictEqual(data[0].id, 1);
  });

  it('Merge multiple data table', function () {
    const nosql = new FlyJson();
    const table = nosql.set(data1).join('profile', data2).merge('user_id', 'id').exec();
    const data = nosql.set(table).join('bio', data3).merge('user_id', 'id').exec();
    assert.strictEqual(data[0].user_id, 1);
    assert.strictEqual(data[0].id, 1);
  });

  it('Merge multiple data table [shallow]', function () {
    const nosql = new FlyJson();
    const table = nosql.setMode('shallow').set(data1).join('profile', data2).merge('user_id', 'id').exec();
    const data = nosql.set(table).join('bio', data3).merge('user_id', 'id').exec();
    assert.strictEqual(data[0].user_id, 1);
    assert.strictEqual(data[0].id, 1);
  });

  it('Join two table', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data1).join('profile', data2).on('user_id', 'id').exec();
    assert.strictEqual(data[0].profile.id, 1);
    assert.strictEqual(data[0].user_id, 1);
  });

  it('Join two table [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data1).join('profile', data2).on('user_id', 'id').exec();
    assert.strictEqual(data[0].profile.id, 1);
    assert.strictEqual(data[0].user_id, 1);
  });

  it('Join two table as array case sensitive', function () {
    const nosql = new FlyJson();
    const data1 = nosql.set(data11).join('address', data12).on('address', 'address', false).exec();
    const data2 = nosql.set(data13).join('group', data14).on('group', 'group', false).exec();

    assert.strictEqual(data1[0].name, 'budi');
    assert.strictEqual(data1[0].address.length, 2);
    assert.strictEqual(data2[0].name, 'budi');
    assert.strictEqual(data2[0].group.length, 2);
  });

  it('Join two table as array case insensitive', function () {
    const nosql = new FlyJson();
    const data1 = nosql.set(data11).join('address', data12).on('address', 'address', false, false).exec();
    const data2 = nosql.set(data13).join('group', data14).on('group', 'group', false, false).exec();

    assert.strictEqual(data1[0].name, 'budi');
    assert.strictEqual(data1[0].address.length, 3);
    assert.strictEqual(data2[0].name, 'budi');
    assert.strictEqual(data2[0].group.length, 2);
  });

  it('Join two table as array case sensitive with different parent id', function () {
    const nosql = new FlyJson();
    const data1 = nosql.set(data11).join('location', data12).on('address', 'address', false).exec();
    const data2 = nosql.set(data13).join('location', data14).on('group', 'group', false).exec();

    assert.strictEqual(data1[0].name, 'budi');
    assert.strictEqual(data1[0].location.length, 2);
    assert.strictEqual(data2[0].name, 'budi');
    assert.strictEqual(data2[0].location.length, 2);
  });

  it('Join two table as array case insensitive with different parent id', function () {
    const nosql = new FlyJson();
    const data1 = nosql.set(data11).join('location', data12).on('address', 'address', false, false).exec();
    const data2 = nosql.set(data13).join('location', data14).on('group', 'group', false, false).exec();

    assert.strictEqual(data1[0].name, 'budi');
    assert.strictEqual(data1[0].location.length, 3);
    assert.strictEqual(data2[0].name, 'budi');
    assert.strictEqual(data2[0].location.length, 2);
  });

  it('Join two table with same parent id', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data1).join('user_id', data2).on('user_id', 'id').exec();
    assert.strictEqual(data[0].user_id.id, 1);
  });

  it('Join two table with same parent id [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data1).join('user_id', data2).on('user_id', 'id').exec();
    assert.strictEqual(data[0].user_id.id, 1);
  });

  it('Join multiple table', function () {
    const nosql = new FlyJson();
    const profile = nosql.set(data1).join('profile', data2).on('user_id', 'id').exec();
    const data = nosql.set(profile).join('bio', data3).on('user_id', 'id').exec();
    assert.strictEqual(data[0].profile.id, 1);
    assert.strictEqual(data[0].bio.id, 1);
    assert.strictEqual(data[0].user_id, 1);
  });

  it('Join multiple table [shallow]', function () {
    const nosql = new FlyJson();
    const profile = nosql.setMode('shallow').set(data1).join('profile', data2).on('user_id', 'id').exec();
    const data = nosql.setMode('shallow').set(profile).join('bio', data3).on('user_id', 'id').exec();
    assert.strictEqual(data[0].profile.id, 1);
    assert.strictEqual(data[0].bio.id, 1);
    assert.strictEqual(data[0].user_id, 1);
  });

  it('Join multiple nested table', function () {
    const nosql = new FlyJson();
    const bio = nosql.set(data2).join('bio', data3).on('id', 'id').exec();
    const data = nosql.set(data1).join('data', bio).on('user_id', 'id').exec();
    assert.strictEqual(data[0].data.bio.id, 1);
    assert.strictEqual(data[0].data.id, 1);
    assert.strictEqual(data[0].user_id, 1);
  });

  it('Join multiple nested table [shallow]', function () {
    const nosql = new FlyJson();
    const bio = nosql.setMode('shallow').set(data2).join('bio', data3).on('id', 'id').exec();
    const data = nosql.setMode('shallow').set(data1).join('data', bio).on('user_id', 'id').exec();
    assert.strictEqual(data[0].data.bio.id, 1);
    assert.strictEqual(data[0].data.id, 1);
    assert.strictEqual(data[0].user_id, 1);
  });

  it('Group by data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data4).groupBy('brand').exec();
    assert.strictEqual(data.length, 4);
  });

  it('Group by data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data4).groupBy('brand').exec();
    assert.strictEqual(data.length, 4);
  });

  it('Group by data with sum', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data4).groupBy('brand', ['stock']).select(['brand', 'stock', 'item_count', 'average_stock']).exec();
    assert.strictEqual(data.length, 4);
    for (let i = 0; i < data.length; i++) {
      assert.notEqual(data[i].item_count, undefined);
      assert.notEqual(data[i].average_stock, undefined);
    }
  });

  it('Group by data with sum [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data4).groupBy('brand', ['stock']).select(['brand', 'stock', 'item_count', 'average_stock']).exec();
    assert.strictEqual(data.length, 4);
    for (let i = 0; i < data.length; i++) {
      assert.notEqual(data[i].item_count, undefined);
      assert.notEqual(data[i].average_stock, undefined);
    }
  });

  it('Group detail data', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data4).groupDetail('brand').exec();
    assert.strictEqual(data.length, 1);
    assert.notEqual(data[0].brand, undefined);
  });

  it('Group detail data [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data4).groupDetail('brand').exec();
    assert.strictEqual(data.length, 1);
    assert.notEqual(data[0].brand, undefined);
  });

  it('Group detail data with custom group name', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data4).groupDetail('brand', 'group_by_name').exec();
    assert.strictEqual(data.length, 1);
    assert.notEqual(data[0].group_by_name, undefined);
  });

  it('Group detail data with custom group name [shallow]', function () {
    const nosql = new FlyJson();
    const data = nosql.setMode('shallow').set(data4).groupDetail('brand', 'group_by_name').exec();
    assert.strictEqual(data.length, 1);
    assert.notEqual(data[0].group_by_name, undefined);
  });

  it('cleanup', function () {
    const nosql = new FlyJson();
    const data = nosql.set(data2).clean().exec();
    assert.deepStrictEqual(data, []);
  });
});
