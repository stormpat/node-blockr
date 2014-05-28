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
      var api;
      return api = {
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

    return Blockr;

  })(Api);

  module.exports = Blockr;

}).call(this);
