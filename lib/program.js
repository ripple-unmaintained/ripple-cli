var ripple = require("ripple-lib")

module.exports.wallet = function() {
  var wallet = ripple.Wallet.generate()
  console.log(JSON.stringify(wallet))
}

module.exports.balances = function() {}

module.exports.pay = function(destination, amount, currency, issuer) {}

