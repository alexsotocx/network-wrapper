var PingParser = require('./src/pingParser');
var PingWrapper = require('./src/pingWrapper');

var test = {
	PingParser: PingParser,
	PingWrapper: PingWrapper,
	NetworkTest: function(domainName) {
		PingWrapper.execute(domainName)
			.then(PingParser.parse.bind(PingParser))
			.then(function(output) {
				console.log("Results", output);
			})
			.catch(function(error) {
				console.error(error);
			})
	}.bind(this)
}

module.exports = test;