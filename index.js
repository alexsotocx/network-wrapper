var PingParser = require('./src/pingParser');
var PingWrapper = require('./src/pingWrapper');
var tracertParser = require('./src/tracertParser');
var tracertWrapper = require('./src/tracertWrapper');

var NetworkWrapper = {
	PingParser: PingParser,
	PingWrapper: PingWrapper,
	tracertParser: tracertParser,
	tracertWrapper: tracertWrapper
}


module.exports = NetworkWrapper;