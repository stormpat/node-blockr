(function() {
  var Api, Blockr,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Api = (function() {
    function Api(currency) {
      this.currency = currency;
      this.ApisetBase(currency);
    }

    Api.prototype.Apiendpoint = function() {
      return "http://" + this.ApisetBase() + this.ApiParams().uri + this.ApiParams().version;
    };

    Api.prototype.ApisetBase = function() {
      switch (this.currency.toLowerCase()) {
        case "bitcoin":
          return "btc";
        case "litecoin":
          return "ltc";
        case "digitalcoin":
          return "dgc";
        case "quarkcoin":
          return "qrk";
        case "peercoin":
          return "ppc";
        case "megacoin":
          return "mec";
        default:
          return console.log("Currency '" + this.currency + "' not supported");
      }
    };

    Api.prototype.ApiParams = function() {
      return {
        version: "api/v1/",
        uri: ".blockr.io/",
        exchange: "exchangerate/current/",
        coin: {
          info: "coin/info/"
        },
        block: {
          info: "block/info/",
          transaction: "block/txs/",
          raw: "block/raw/"
        },
        transaction: {
          info: "tx/info/",
          unconfirmed: "zerotx/info/",
          raw: "tx/raw/"
        },
        address: {
          info: "address/info/",
          balance: "address/balance/",
          transaction: "address/txs/",
          unspent: "address/unspent/",
          unconfirmed: "address/unconfirmed/"
        }
      };
    };

    return Api;

  })();

  Blockr = (function(_super) {
    __extends(Blockr, _super);

    function Blockr(currency) {
      if (!(this instanceof Blockr)) {
        new Blockr(currency);
      }
      Blockr.__super__.constructor.call(this, currency);
      this.rest = require("request");
      this.url = this.Apiendpoint();
    }

    Blockr.prototype.data = function(callback, params, optional_params) {
      if (params == null) {
        params = "";
      }
      if (optional_params == null) {
        optional_params = "";
      }
      params = params + optional_params;
      return this.rest(this.url + params, function(error, response, body) {
        return callback(JSON.parse(body));
      });
    };

    Blockr.prototype.coinInfo = function(callback) {
      var params;
      params = this.ApiParams().coin.info;
      return this.data(callback, params);
    };

    Blockr.prototype.exchange = function(callback) {
      var params;
      params = this.ApiParams().exchange;
      return this.data(callback, params);
    };

    Blockr.prototype.blockInfo = function(block, callback) {
      var params;
      params = this.ApiParams().block.info + block;
      return this.data(callback, params);
    };

    Blockr.prototype.blockTx = function(block, callback) {
      var params;
      params = this.ApiParams().block.transaction + block;
      return this.data(callback, params);
    };

    Blockr.prototype.blockTxRaw = function(block, callback) {
      var params;
      params = this.ApiParams().block.raw + block;
      return this.data(callback, params);
    };

    Blockr.prototype.transaction = function(tx, callback) {
      var params;
      params = this.ApiParams().transaction.info + tx;
      return this.data(callback, params);
    };

    Blockr.prototype.transactionRaw = function(tx, callback) {
      var params;
      params = this.ApiParams().transaction.raw + tx;
      return this.data(callback, params);
    };

    Blockr.prototype.transactionUnconf = function(tx, callback) {
      var params;
      params = this.ApiParams().transaction.unconfirmed + tx;
      return this.data(callback, params);
    };

    Blockr.prototype.addressInfo = function(addr, callback) {
      var params;
      params = this.ApiParams().address.info + addr;
      return this.data(callback, params);
    };

    Blockr.prototype.addressBalance = function(addr, callback) {
      var params;
      params = this.ApiParams().address.balance + addr;
      return this.data(callback, params);
    };

    Blockr.prototype.addressTx = function(addr, callback) {
      var params;
      params = this.ApiParams().address.transaction + addr;
      return this.data(callback, params);
    };

    Blockr.prototype.addressUnSpent = function(addr, callback) {
      var params;
      params = this.ApiParams().address.unspent + addr;
      return this.data(callback, params);
    };

    Blockr.prototype.addressUnConf = function(addr, callback) {
      var params;
      params = this.ApiParams().address.unconfirmed + addr;
      return this.data(callback, params);
    };

    return Blockr;

  })(Api);

  module.exports = Blockr;

}).call(this);
