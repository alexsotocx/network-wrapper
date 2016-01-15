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
			Windows: "tracert -d -w :timeout :domainName",
			Linux: "traceroute -q 1 -n -w :timeout :domainName",
			Darwin: "traceroute -q 1 -n -w :timeout :domainName"
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
		var default_ttl = 2000;
		if(!isWin)
			default_ttl = 2;
		options = {
			timeout: default_ttl,
			timeoutTime: 2000 * 15,
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
			setTimeout(function() {
				return reject(new Error("Too many timeouts"));
			}, options.timeoutTime);
		}.bind(this));
	}

};

module.exports = tracertWrapper;