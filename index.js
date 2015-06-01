#!/usr/bin/env node

var commander = require('commander')
var lib = require('./lib/program')

commander
  .version('0.1.0')
  .option('-a --account <account>', 'ripple account')
  .option('-k --key-path <path>', 'path to account secret key')

commander
  .command('wallet')
  .description('generate new random ripple account and secret key')
  .action(lib.wallet)

commander
  .command('balances')
  .description('list balances for the specified account')
  .action(lib.balances)

commander
  .command('pay <destination> <amount> <currency> [issuer]')
  .description('send money to another ripple account')
  .action(lib.pay)

commander
  .parse(process.argv)

