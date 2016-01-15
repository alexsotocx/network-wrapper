module.exports = {
  test: function(domain) {
    var x = require("./index.js");
    x.tracertWrapper.execute(domain)
      .then(x.tracertParser.parseOutput)
      .then(function(res) {console.log(res)})
      .catch(function(error) {console.log(error);})
  }
};
