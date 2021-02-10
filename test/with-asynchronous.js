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

const data3 = [
  { id: 1, bio: 'I was born in bandung', phone: 'a@b.com' },
  { id: 2, bio: 'I was born in jakarta', phone: 'c@d.com' },
  { id: 3, bio: 'I was born in solo', phone: 'e@f.com' },
  { id: 4, bio: 'I was born in semarang', phone: 'g@h.com' },
  { id: 5, bio: 'I was born in surabaya', phone: 'i@j.com' }
];

describe('promisify / asynchronous crud test', function () {
  this.timeout(10000);

  it('insert data', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2).insert({ id: 6, address: 'madiun', email: 'i@j.com' }).exec();
      assert.strictEqual(data.length, 6);
      assert.strictEqual(data[5].id, 6);
      assert.strictEqual(data[5].address, 'madiun');
      assert.strictEqual(data[5].email, 'i@j.com');
      done();
    });
  });

  it('update data', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
        .update('id', 5, { address: 'ponorogo', email: 'xxx@gmail.com' })
        .exec();
      assert.strictEqual(data.length, 5);
      assert.strictEqual(data[4].id, 5);
      assert.strictEqual(data[4].address, 'ponorogo');
      assert.strictEqual(data[4].email, 'xxx@gmail.com');
      done();
    });
  });

  it('modify data', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
        .modify('id', 5, { address: 'ponorogo', email: 'xxx@gmail.com', about: 'Just ordinary programmer' })
        .exec();
      assert.strictEqual(data.length, 5);
      assert.strictEqual(data[4].id, 5);
      assert.strictEqual(data[4].address, 'ponorogo');
      assert.strictEqual(data[4].email, 'xxx@gmail.com');
      done();
    });
  });

  it('delete data', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
        .delete('id', 5)
        .exec();
      assert.strictEqual(data.length, 4);
      assert.strictEqual(data[3].id, 4);
      assert.strictEqual(data[3].address, 'solo, balapan');
      assert.strictEqual(data[3].email, 'g@h.com');
      done();
    });
  });
});

describe('promisify / asynchronous query test', function () {
  this.timeout(10000);
  it('promisify is not blocking', function (done) {
    // Just uncomment the console.log to see detail time execution process
    const nosql = new FlyJson();
    // let outside = '';
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      table.blockingTest();
      // const time = table.blockingTest();
      // console.log('Blocking start at: '+time);
      // console.log('Blocking ended at: '+Date.now());
      // assert.strictEqual(outside,time);
      done();
    });
    // const start = Date.now();
    // outside = start;
    // console.log('Last started at: '+outside);
  });

  it('promisify chain is not blocking', function (done) {
    // Just uncomment the console.log to see detail time execution process
    const nosql = new FlyJson();
    // const outside = '';
    // const time1 = '';
    // const time2 = '';
    // const end1 = '';
    // const end2 = '';
    nosql.promisify((builder) => { return builder; })
      .then(function (table) {
        table.blockingTest();
        // time1 = table.blockingTest();
        // end1 = Date.now();
        // console.log('1. Blocking start at: '+time1);
        // console.log('1. Blocking ended at: '+end1);
        return table;
      })
      .then(function (table) {
        table.blockingTest();
        // time2 = table.blockingTest();
        // end2 = Date.now();
        // console.log('2. Blocking start at: '+time2);
        // console.log('2. Blocking ended at: '+end2);
        return table;
      })
      .then(function () {
        done();
      });
    // const start = Date.now();
    // outside = start;
    // console.log('Last started at: '+outside);
  });

  it('select data', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2).select(['id', 'bio']).exec();
      assert.strictEqual(data[0].id, 1);
      assert.strictEqual(data[1].id, 2);
      assert.strictEqual(data[2].id, 3);
      assert.strictEqual(data[3].id, 4);
      assert.strictEqual(data[4].id, 5);
      done();
    });
  });

  it('select + where', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
        .select(['id', 'address'])
        .where('address', 'jakarta')
        .exec();
      assert.strictEqual(data[0].id, 2);
      assert.strictEqual(data[0].address, 'jakarta');
      done();
    });
  });

  it('select + where (shallow mode)', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.setMode('shallow').set(data2)
        .select(['id', 'address'])
        .where('address', 'jakarta')
        .exec();
      assert.strictEqual(data[0].id, 2);
      assert.strictEqual(data[0].address, 'jakarta');
      done();
    });
  });

  it('select + where + and', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
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
      done();
    });
  });

  it('select + where + or + where', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
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
      done();
    });
  });

  it('select + where + or + where + orderby ascending', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
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
      done();
    });
  });

  it('select + where + or + where + orderby descending', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
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
      done();
    });
  });

  it('select + where + or + where + orderby with primer', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
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
      done();
    });
  });

  it('select + where + or + where + orderby + take', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
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
      done();
    });
  });

  it('select + where + or + where + orderby + skip', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
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
      done();
    });
  });

  it('select + where + or + where + orderby + take + pagination', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2)
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
      done();
    });
  });

  it('Merge two data table', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data1).join('profile', data2)
        .merge('user_id', 'id').exec();
      assert.strictEqual(data[0].user_id, 1);
      assert.strictEqual(data[0].id, 1);
      done();
    });
  });

  it('Merge multiple data table', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const profile = table.set(data1).join('profile', data2).merge('user_id', 'id').exec();
      const data = table.set(profile).join('bio', data3).merge('user_id', 'id').exec();
      assert.strictEqual(data[0].user_id, 1);
      assert.strictEqual(data[0].id, 1);
      done();
    });
  });

  it('Join two table', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data1).join('profile', data2).on('user_id', 'id').exec();
      assert.strictEqual(data[0].profile.id, 1);
      assert.strictEqual(data[0].user_id, 1);
      done();
    });
  });

  it('Join two table with same parent id', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data1).join('user_id', data2).on('user_id', 'id').exec();
      assert.strictEqual(data[0].user_id.id, 1);
      done();
    });
  });

  it('Join multiple table', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const profile = table.set(data1).join('profile', data2).on('user_id', 'id').exec();
      const data = table.set(profile).join('bio', data3).on('user_id', 'id').exec();
      assert.strictEqual(data[0].profile.id, 1);
      assert.strictEqual(data[0].user_id, 1);
      done();
    });
  });

  it('Join multiple nested table', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const bio = table.set(data2).join('bio', data3).on('id', 'id').exec();
      const data = table.set(data1).join('data', bio).on('user_id', 'id').exec();
      assert.strictEqual(data[0].data.bio.id, 1);
      assert.strictEqual(data[0].data.id, 1);
      assert.strictEqual(data[0].user_id, 1);
      done();
    });
  });

  it('cleanup', function (done) {
    const nosql = new FlyJson();
    nosql.promisify((builder) => { return builder; }).then(function (table) {
      const data = table.set(data2).clean().exec();
      assert.deepStrictEqual(data, []);
      done();
    });
  });
});
