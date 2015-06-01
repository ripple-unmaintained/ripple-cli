var ripple = require('ripple-lib')

module.exports = function() {
  var program = this
  var account = this.account

  if (!account) { 
    return console.log('--account required')
  }

  var server = program.server || 'wss://s1.ripple.com:443'

  var remote = new ripple.Remote({
    servers: [ server ]
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

