var fs = require('fs')
var ripple = require('ripple-lib')

module.exports = function(domain) {
  var program = this

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

  var rippleAddress = new ripple.Wallet(secret).getAddress().value

  var server = program.server || 'wss://s1.ripple.com:443'

  var remote = new ripple.Remote({
    local_signing: true,
    servers: [ server ]
  })

  remote.connect(function() {
    remote.setSecret(rippleAddress, secret);

    var transaction = remote.createTransaction('AccountSet', {
      account: rippleAddress
    });

    transaction.tx_json.Domain = new Buffer(domain, 'ascii').toString('hex');

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

