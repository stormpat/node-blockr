
class Api

  ## The backend API constructor. Will set the current instance
  ## currency, and call the backend with that value.
  ## Basically it just sets the currency, and delegates the logic further.

  constructor: (currency) ->
    @currency = currency
    @ApisetBase(currency)

  ## This method will set the current instance base URI for the backend.
  ## Will be called when the client queries the API.

  Apiendpoint: ->
    "http://" + @ApisetBase() + @ApiParams().uri + @ApiParams().version

  ## Just some logic to set the bas URI. This method is called only once,
  ## from the class constructor.

  ApisetBase: ->
    switch @currency.toLowerCase()
      when "bitcoin" then "btc"
      when "litecoin" then "ltc"
      when "digitalcoin" then "dgc"
      when "quarkcoin" then "qrk"
      when "peercoin" then "ppc"
      when "megacoin" then "mec"
      else console.log "Currency '#{@currency}' not supported"

  ## The hardcoded values, building blocks for the diffrent Api endpoints.
  ## When new currencies become available its easy to add them.

  ApiParams: ->
    api = {
    version: "api/v1/"
    uri: ".blockr.io/"
    exchange: "exchangerate/current/"
    coin:
      info: "coin/info/"
    block:
      info: "block/info/"
      transaction: "block/txs/"
      raw: "block/raw/"
    transaction:
      info: "tx/info/"
      unconfirmed: "zerotx/info/"
      raw: "tx/raw/"
    address:
      info: "address/info/"
      balance: "address/balance/"
      transaction: "address/txs/"
      unspent: "address/unspent/"
      unconfirmed: "address/unconfirmed/"
    }

  ## This method calls the actual API. As default params theres always
  ## the 'params' that is the current instance base uri. Additional params
  ## are the query for endpoints, and extra for additional query parameters.

class Blockr extends Api

  constructor: (currency) ->
    new Blockr(currency) unless this instanceof Blockr
    super(currency)
    @rest = require("request")
    @url = @Apiendpoint()

  data: (callback, params="", optional_params="") ->
    params = params + optional_params
    @rest @url + params, (error, response, body) ->
      callback(JSON.parse(body))

  coinInfo: (callback) ->
    params = @ApiParams().coin.info
    @data(callback, params)

module.exports = Blockr

