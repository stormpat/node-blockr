/**
 * Example usage.
 *
 * If theres some Q's feel free to contact via Github.
 * https://github.com/stormpat/node-blockr
 *
 */


// Require the module
var blockr = require('./lib/node-blockr');

// Create instance(s) of the currency you want to work with
// See readme for the available currencies.
var coin = new blockr('bitcoin');

// Get the current exchange rates (Note, values are in FIAT)
coin.exchange(function(response) {
  console.log(response.data);
});

// If you want to get the exchange rate in USD heres how.
coin.exchange(function(response) {
    // Find out what the currency is worth in BTC.
    var nova_coin = 0.00416;
    var nova_in_usd = nova_coin * (1 / response.data[0].rates.BTC);
    console.log(nova_in_usd); // => 2.340837824000006 (as of 28.5.2014)
});

/**
 * The get info about a certain block you can query them by:
 * ID: 1337
 * LATEST: 'last' (the string last)
 * HASH: 000000008bf44a528a09d203203a6a97c165cf53a92ecc27aed0b49b86a19564

 */
coin.blockInfo(1337, function(response) {
  console.log(response);
});

// Get a blocks transactions
// You can pass in multiple values and get them all in one HTTP call.
// You can do this by:
// a) pass in a a string of multiple id's
// b) pass in an array of values
coin.blockTx(['1337', 2000], function(response) {
  console.log(response);
});

// Get a blocks transactions, raw bitcoind format data
// Accepts multiple values. See above.
coin.blockTxRaw('last', function(response) {
  console.log(response.data.tx);
});

// Get transaction information
coin.transaction('60c1f1a3160042152114e2bba45600a5045711c3a8a458016248acec59653471', function(response) {
  console.log(response);
});

// Get raw transaction information
coin.transactionRaw('60c1f1a3160042152114e2bba45600a5045711c3a8a458016248acec59653471', function(response) {
  console.log(response);
});

// Get unconfirmed transactions
coin.transactionUnconf('60c1f1a3160042152114e2bba45600a5045711c3a8a458016248acec59653471', function(response) {
  console.log(response);
});

// Get information about a specific wallet address
coin.addressInfo('198aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi', function(response) {
  console.log(response);
});

// Show a wallet balance
coin.addressBalance('198aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi', function(response) {
  console.log(response);
});

// Show a wallet transactions
coin.addressTx('198aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi', function(response) {
  console.log(response.data);
});

// Show a wallet unspent transactions.
coin.addressUnSpent('198aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi', function(response) {
  console.log(response.data);
});

// Show a wallet unconfirmed transactions.
coin.addressUnConf('198aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi', function(response) {
  console.log(response.data);
});






