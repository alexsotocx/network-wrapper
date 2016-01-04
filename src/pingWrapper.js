var exec = require('child_process').exec;
var os = require('os');

var Ping = {
	command: function(options) {
		var osFunctions = {
			Windows: "ping -n :count -i :ttl -w :timeout :domainName",
			Linux: "ping -c :count -m :ttl -t :timeout :domainName",
			Darwin: "ping -c :count -m :ttl -t :timeout :domainName"
		};
		var osType = os.type();
		console.log(osFunctions);
		var osCommand = osFunctions[osType];
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
			count: (options.count || 10),
			domainName: domainName
		}
		var command = this.command(options);
		return new Promise(function(resolve, reject) {
			exec(command, function(err, stdout, stderr) {
				if(err) {
					//console.log(err.toString());
					return reject(err);
				} else {
					//console.log(stdout);
					return resolve(stdout);
				}
			}.bind(this));
		}.bind(this));
	}

};

module.exports = Ping;