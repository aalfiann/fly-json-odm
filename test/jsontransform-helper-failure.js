const assert = require('assert');
const FlyJson = require('../src/flyjson.js');

var nosql = new FlyJson();

var data = {
	posts: [{
		title: "title1",
		description: "description1",
		blog: "This is a blog.",
		date: "11/4/2013",
		clearMe: "text to remove",
		extra: {
			link: "http://goo.cm"
		},
		list1: [{
			name: "mike"
		}],
		list2: [{
			item: "thing"
		}]
	}]
};

var map = {
	list: 'posts',
	item: {
		name: "title",
		info: "description",
		text: "blog",
		date: "date",
		link: "extra.link",
		info: "list1.0.name"
	},
	operate: [{
		run: "Date.parse",
		on: "date"
	},{
		run: function customFn( item ){
			if( 'string' === typeof item )
				return item.toUpperCase();
			return item.toString().toUpperCase();
		},
		on: "name"
	}]
};

var mapOnNull = {
	list: 'posts',
	item: {
		name: "title",
		info: "description",
		text: "blog",
		date: "date",
		link: "extra.link",
		info: "list1.0.name"
	},
	operate: [{
		run: "Date.parse",
		on: null
	},{
		run: function customFn( item ){
			if( 'string' === typeof item )
				return item.toUpperCase();
			return item.toString().toUpperCase();
		},
		on: "name"
	}]
};

describe('json transform intentional failure test', function(){

	it("transform data with undefined data", function() {

		assert.deepEqual(nosql.jsonTransform(undefined, map).make(),[]);
	});
    
    it("transform data foreach with non array / object", function() {

		assert.throws(() => {nosql.jsonTransform(nosql.deepClone(data), map).foreach('tester',(key) => {
            console.log(key);
        })},Error);
    });
    
    it("transform data operate with on null", function() {

		var dataTransform = nosql.jsonTransform(nosql.deepClone(data), mapOnNull);
        var result = dataTransform.make();
        assert.deepEqual(result,[ { name: 'TITLE1',
        info: 'mike',
        text: 'This is a blog.',
        date: '11/4/2013',
        link: 'http://goo.cm' } ]);
    });
    
});