var os = require('os');

var PingParser = {
	Windows: function() {},
	Linux: function(output, resolve, reject) {
		console.log("Calleddddd");
		output = output.split('\r\n');
		resolve(output);
	},
	Darwin: function(output, resolve, reject) {
		console.log("Calleddddd");
		output = output.split('\n');
		resolve(output);
	},
	parse: function(output) {
		var parser = this[os.type()];
		return new Promise(function(resolve, reject) {
			parser(output, resolve, reject);
		});
	}

};

module.exports = PingParser;