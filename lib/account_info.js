var ripple = require('ripple-lib')

module.exports = function() {
  var program = this
  var rippleAddress = program.account

  if (!rippleAddress) { 
    return console.log('--account required')
  }
  

  var server = program.server || 'wss://s1.ripple.com:443'

  var remote = new ripple.Remote({
    servers: [ server ]
  })

  remote.connect(function() {

    var account = new ripple.Account(remote, rippleAddress)

    account.getInfo(function(err, info) {
      remote.disconnect()
      if (err) {
        console.error(JSON.stringify(err))
      } else {
        console.log(JSON.stringify(info))
      }
    })
  })
}

