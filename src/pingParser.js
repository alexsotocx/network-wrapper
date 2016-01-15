var PingParser = {
	parse: function(output) {
		return new Promise(function(resolve, reject) {
			var ms = output.match(/\s*(tiempo|time|tempo|temps)\s*=\s*(.+)\s*ms/)
			var ip = output.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/)
			if(ms != null) {
				ms = ms[2].trim();
				ip = ip[0].trim();
				return resolve([ip, ms])
			} else {
				return reject(new Error("Can't parse the output"));
			}
		});
	}

};

module.exports = PingParser;