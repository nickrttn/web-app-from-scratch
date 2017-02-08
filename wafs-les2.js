// object literal
(function () {
	var person = {
		name: 'Jane Doe',
		speak: () => console.log(`Hello, my name is ${this.name}`),
	};
})();

// revealing module pattern
var anotherPerson = (function() {
	// this variable is private, not accessible outside of this scope
	var _name = 'John Doe';
	var speak = function() {
		console.log(`Hello, my name is ${ _name }`);
	};

	return { speak };
});

// object constructor pattern
(function() {
	var Person = function(name) {
		this.name = name;
		this.speak = () => console.log(`Hello, my name is ${this.name}`);
	};

	Person.prototype.speakLoud = () => {
		console.log((`Hello, my name is ${this.name}`).toUpperCase());
	};

	var jane = new Person('Jane Doe');
	var john = new Person('John Doe');
})();
