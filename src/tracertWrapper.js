var exec = require('child_process').exec;
var os = require('os');
var getOsType = function() {
	var osType = os.type();
	var regexWin = /^(windows|Windows|WINDOWS|win)/;
	if(regexWin.test(osType))
		return "Windows";
	else
		return osType;
};
var isWin = (getOsType() == "Windows");
var tracertWrapper = {
	command: function(options) {
		var osFunctions = {
			Windows: "tracert -d -h :max_hops :domainName",
			Linux: "traceroute -m :max_hops -q 1 -n :domainName",
			Darwin: "traceroute -m :max_hops  -q 1 -n :domainName"
		};
		var osType = getOsType();
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
			max_hops: options.max_hops || 25,
			domainName: domainName
		}
		
		var command = this.command(options);
		return new Promise(function(resolve, reject) {
			exec(command, function(err, stdout, stderr) {
				if(err) {
					return reject(err);
				} else {
					return resolve(stdout);
				}
			}.bind(this));
		}.bind(this));
	}

};

module.exports = tracertWrapper;