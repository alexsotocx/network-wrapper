var exec = require('child_process').exec;
var os = require('os');

var Ping = {
	command: function(options) {
		var osFunctions = {
			Windows: "ping -n 1 -i :ttl -w :timeout :domainName",
			Linux: "ping -c 1 -m :ttl -t :timeout :domainName",
			Darwin: "ping -c 1 -m :ttl -t :timeout :domainName"
		};
		var osType = os.type();
		var osCommand = osFunctions[osType];
		var isWindows = (osType == "Windows");
		var simbols = osCommand.match(/\:([^ ]+)/g)
		simbols.forEach(function(simbol) {
			var dataSimbol = simbol.substring(1); //Removes the ':' of the simbol
      osCommand = osCommand.replace(simbol, options[dataSimbol]);
		}.bind(this));
		return osCommand;
	},

	execute: function(domainName, options) {
		options = options || {}
		options = {
			ttl: (options.ttl || 20),
			timeout: (options.timeout || 2000),
			domainName: domainName
		}
		var command = this.command(options);
		return new Promise(function(resolve, reject) {
			exec(command, function(err, stdout, stderr) {
				setTimeout(function() {
					return reject(new Error("Operation Timeout"));
				}, options.timeout * 20);
				if(err) {
					return reject(err);
				} else {
					return resolve(stdout);
				}
			}.bind(this));
		}.bind(this));
	}

};

module.exports = Ping;