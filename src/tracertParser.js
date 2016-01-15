var net = require('net');
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
function parseHop(line) {
  line = line.replace(/\*/g,'0');
  if (isWin) line = line.replace(/\</g,'');
  var s = line.split(' ');
  for (var i=s.length - 1; i > -1; i--) {
    if (s[i] === '') s.splice(i,1);
    if (s[i] === 'ms') s.splice(i,1);
  }

  if (isWin) return parseHopWin(s);
  else return parseHopNix(s);
}

function parseHopWin(line) {
  if (line[4] === 'Request' || line[4] === "Tiempo")
    return false;

  var hop = {};
  hop[line[4]] = [ +line[1], +line[2], +line[3]];

  return hop;
}

function parseHopNix(line) {
  if (line[1] === '0') 
    return false;
  
  var hop = {},
      lastip = line[1];

  hop[line[1]] = [+line[2]];

  for (var i=3; i < line.length; i++) {
    if (net.isIP(line[i])) {
      lastip = line[i];
      if (!hop[lastip])
        hop[lastip] = [];
    }
    else hop[lastip].push(+line[i]);
  }

  return hop;
}

function parseOutput(output) {
  return new Promise(function(resolve, reject) {
    try {
      var lines = output.split('\n'),
          hops=[];

      lines.shift();  
      lines.pop();

      if (isWin) { 
        for (var i = 0; i < lines.length; i++)
          if (/^\s+1/.test(lines[i]))
            break;
        lines.splice(0,i);
        lines.pop(); lines.pop();
      }

      for (var i = 0; i < lines.length; i++)
        hops.push(parseHop(lines[i]));
      return resolve(hops)
    } catch (error) {
      return reject(error);
    }
    
  });
 
}

module.exports = {
  parseOutput: parseOutput
};