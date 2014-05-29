
## Base class for some setup logic.
class Api

  ## Set currency, and the base uri for http requests.
  constructor: (currency) ->
    @currency = currency
    @ApisetBase(currency)

  ## This method will set the current instance base URI for the backend.
  Apiendpoint: ->
    "http://" + @ApisetBase() + @ApiParams().uri + @ApiParams().version

  ## Logic for the base uri to be the one the user chooses.
  ApisetBase: ->
    switch @currency.toLowerCase()
      when "bitcoin" then "btc"
      when "litecoin" then "ltc"
      when "digitalcoin" then "dgc"
      when "quarkcoin" then "qrk"
      when "peercoin" then "ppc"
      when "megacoin" then "mec"
      else console.log "Currency '#{@currency}' not supported"

  ## The REST api endpoints.
  ApiParams: ->
    {
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

## Exposes the api search methods.
class Blockr extends Api

  constructor: (currency) ->
    new Blockr(currency) unless this instanceof Blockr
    super(currency)
    @rest = require("request")
    @url = @Apiendpoint()

  isArray: (object) ->
    Array.isArray || ( value ) -> return {}.toString.call( value ) is '[object Array]'

  data: (callback, params="", optional_params="") ->
    params = params + optional_params
    @rest @url + params, (error, response, body) ->
      callback(JSON.parse(body))

  coinInfo: (callback) ->
    params = @ApiParams().coin.info
    @data(callback, params)

  exchange: (callback) ->
    params = @ApiParams().exchange
    @data(callback, params)

  blockInfo: (block, callback) ->
    params = @ApiParams().block.info + block
    @data(callback, params)

  blockTx: (block, callback) ->
    if @isArray() block
      block.toString()

    params = @ApiParams().block.transaction + block
    @data(callback, params)

  blockTxRaw: (block, callback) ->
    if @isArray() block
      block.toString()

    params = @ApiParams().block.raw + block
    @data(callback, params)

  ## TODO: ALLOW FOR VOUTS
  transaction: (tx, callback) ->
    params = @ApiParams().transaction.info + tx
    @data(callback, params)

  ## TODO: ALLOW FOR VOUTS
  transactionRaw: (tx, callback) ->
    params = @ApiParams().transaction.raw + tx
    @data(callback, params)

  ## TODO: ALLOW FOR VOUTS
  transactionUnconf: (tx, callback) ->
    params = @ApiParams().transaction.unconfirmed + tx
    @data(callback, params)

  ## TODO: Allow for multiple addresses
  ## TODO: Allow for confirmations parameters
  addressInfo: (addr, callback) ->
    params = @ApiParams().address.info + addr
    @data(callback, params)

  ## TODO: Allow for multiple addresses
  ## TODO: Allow for confirmations parameters
  addressBalance: (addr, callback) ->
    params = @ApiParams().address.balance + addr
    @data(callback, params)

  ## TODO: Allow for multiple addresses
  ## TODO: Allow for confirmations parameters
  addressTx: (addr, callback) ->
    params = @ApiParams().address.transaction + addr
    @data(callback, params)

  ## TODO: Allow for multiple addresses
  ## TODO: Allow for confirmations parameters
  addressUnSpent: (addr, callback) ->
    params = @ApiParams().address.unspent + addr
    @data(callback, params)

  ## TODO: Allow for multiple addresses
  ## TODO: Allow for confirmations parameters
  addressUnConf: (addr, callback) ->
    params = @ApiParams().address.unconfirmed + addr
    @data(callback, params)

module.exports = Blockr

