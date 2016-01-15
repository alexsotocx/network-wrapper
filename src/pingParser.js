var os = require('os');

var PingParser = {
	Windows: function(output, resolve, reject) {
		var ms = output.match(/\s*(tiempo|time|tempo|temps)\s*=\s*(.+)\s*ms/)
		var ip = output.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/)
		if(ms != null) {
			ms = ms[2].trim();
			ip = ip[0].trim();
			return resolve([ip, ms])
		} else {
			return reject(new Error("Can't parse the output"));
		}
	},
	Linux: function(output, resolve, reject) {
		var ms = output.match(/\s*(tiempo|time|tempo|temps)\s*=\s*(.+)\s*ms/)
		var ip = output.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/)
		if(ms != null) {
			ms = ms[2].trim();
			ip = ip[0].trim();
			return resolve([ip, ms])
		} else {
			return reject(new Error("Can't parse the output"));
		}
	},
	Darwin: function(output, resolve, reject) {
		var ms = output.match(/\s*(tiempo|time|tempo|temps)\s*=\s*(.+)\s*ms/)
		var ip = output.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/)
		if(ms != null) {
			ms = ms[2].trim();
			ip = ip[0].trim();
			return resolve([ip, ms])
		} else {
			return reject(new Error("Can't parse the output"));
		}
	},
	parse: function(output) {
		var parser = this[os.type()];
		return new Promise(function(resolve, reject) {
			parser(output, resolve, reject);
		});
	}

};

module.exports = PingParser;