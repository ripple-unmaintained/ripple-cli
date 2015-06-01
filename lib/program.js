var ripple = require("ripple-lib")

module.exports.wallet = function() {
  var wallet = ripple.Wallet.generate()
  console.log(JSON.stringify(wallet))
}

module.exports.balances = function() {
  var account = this.account

  if (!account) {
    return console.log('--account required')
  }

  var remote = new ripple.Remote({
    servers: [ 'wss://s1.ripple.com:443' ]
  })

  remote.connect(function() {
    var options = {
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      ledger: 'validated'
    }

    var request = remote.requestAccountLines(options, function(err, info) {
      remote.disconnect()
      if (err) {
        console.error(JSON.stringify(err))
      } else {
        console.log(JSON.stringify(info))
      }
    })
  })
}

module.exports.pay = function(destination, amount, currency, issuer) {}

