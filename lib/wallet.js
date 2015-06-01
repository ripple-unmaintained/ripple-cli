var ripple = require('ripple-lib')

module.exports = function() {
  var wallet = ripple.Wallet.generate()
  console.log(JSON.stringify(wallet))
}
