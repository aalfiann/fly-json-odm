const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

var nosql = new FlyJson();

var data = {
	posts: [{
		title: "title1"
	}]
};

var map = {
	list: 'posts',
	item: {
		name: "title",
	}
};

describe("json transform mutationSpec test", function() {

	it("should not manipulate the raw data", function() {

		var clone = nosql.deepClone(data);
		var dataTransform = nosql.jsonTransform(data, map).make();
        assert.deepEqual(clone,data);

	});

	it("should not manipulate the raw data", function() {

		var clone = nosql.deepClone(map);
		var dataTransform = nosql.jsonTransform(data, map).make();
        assert.deepEqual(clone,map);

	});

});