
// Require the module
var blockr = require('./lib/node-blockr');

// Create instance(s) of the currency you want to work with
var coin = new blockr('litecoin');

//console.log(coin.verbose(false));

coin.coinInfo(function(body) {
  console.log(body);
});







