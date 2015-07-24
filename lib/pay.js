var ripple = require('ripple-lib')
var fs = require('fs')

module.exports = function(destination, amount, currency, issuer) {

  var program = this
  var secret

  var server = program.server || 'wss://s1.ripple.com:443'

  var remote = new ripple.Remote({
    local_signing: true,
    servers: [ server ]
  })

  if (!program.account) { 
    return console.log('--account required')
  }
  if (program.keyPath) {
    var config = fs.readFileSync(program.keyPath)
    secret = JSON.parse(config).secret
  } else {
    var path = process.env.HOME + '/.ripple'
    var fileStats = fs.statSync(path)
    if (fileStats.isFile()) {
      var config = fs.readFileSync(path)
      secret = JSON.parse(config).secret
    } else {
      return console.log('--key-path required')
    }
  }

  remote.connect(function() {
    remote.setSecret(program.account, secret);

    var transaction = remote.createTransaction('Payment', {
      account: program.account,
      destination: destination,
      amount: ripple.Amount.from_human(amount+currency)
    })

    transaction.submit(function(err, res) {
      remote.disconnect()
      if (err) {
        console.error(JSON.stringify(err))
      } else {
        console.log(JSON.stringify(res))
      }
    })
  })
}

