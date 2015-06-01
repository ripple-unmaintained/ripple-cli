#!/usr/bin/env node

var commander = require('commander')

commander
  .version('0.1.0')
  .option('-a --account <account>', 'ripple account')
  .option('-k --key-path <path>', 'path to account secret key')
  .parse(process.argv)

