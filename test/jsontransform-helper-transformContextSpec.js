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
		greeting: "title"
	},
	operate: [{
		run: function customFn( item, context ){
			return context.intro + item;
		},
		on: "greeting"
	}]
};

var mapEach = {
	list: 'posts',
	item: {
		greeting: "title"
	},
	each: function eachFn( item, index, collection, context ){
		item.greeting = context.intro + item;
		return item;
	}
};

describe("json transform ContextSpec test", function() {

	it("should pass the context to operate.run", function() {

		var dataTransform = nosql.jsonTransform(nosql.deepClone(data), map);

		var context = {
			intro: 'Hi '
		};

        assert.deepStrictEqual(dataTransform.make(context),[{
			greeting: "Hi title1"
		}]);

	});

	it("should pass the context to each", function() {

        var dataTransform = nosql.jsonTransform(nosql.deepClone(data), map);

        var context = {
            intro: 'Hi '
        };

        assert.deepStrictEqual(dataTransform.make(context),[{
            greeting: "Hi title1"
        }]);

	});

	it("should always return an array", function() {

        var dataTransform = nosql.jsonTransform({}, {});
        assert.deepStrictEqual(Array.isArray(dataTransform.make()),true);

	});

});