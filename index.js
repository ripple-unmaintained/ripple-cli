#!/usr/bin/env node

var commander = require('commander')
var lib = require('./lib/program')

commander
  .version(require('./package.json').version)
  .option('-a --account <account>', 'ripple account')
  .option('-k --key-path <path>', 'path to account secret key')
  .option('-s --server <uri>', 'websocket uri to rippled server')

commander
  .command('wallet')
  .description('generate new random ripple account and secret key')
  .action(lib.wallet.bind(commander))

commander
  .command('balances')
  .description('list balances for the specified account')
  .action(lib.balances.bind(commander))

commander
  .command('pay <destination> <amount> <currency> [issuer]')
  .description('send money to another ripple account')
  .action(lib.pay.bind(commander))

commander
  .command('server_info')
  .description('retrieve info of a running rippled server')
  .action(lib.server_info.bind(commander))

commander
  .command('account_info')
  .description('retrieve info of a ripple account')
  .action(lib.account_info.bind(commander))

commander
  .command('account_set_domain <domain>')
  .description('set account Domain field')
  .action(lib.account_set_domain.bind(commander))

commander
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  commander.outputHelp();
}

