# Ripple CLI

command line interface to money and payments on ripple

## Installation

````
$ npm install -g ripple-cli
````

## Usage

To list program options and commands run `--help or -h` 

````
$ ripple-cli --help

  Usage: index [options] [command]


  Commands:

    wallet                                          generate new random ripple account and secret key
    balances                                        list balances for the specified account
    pay <destination> <amount> <currency> [issuer]  send money to another ripple account

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -a --account <account>  ripple account
    -k --key-path <path>    path to account secret key
````

### Generating a Wallet

Serialized JSON of a ripple `address` and `secret pair will be written to stdout

````
$ ripple-cli wallet | json
{
    "address": "rJVjRR7LbhJdDi32J7pGvWjiVSiWaSjZj2",
    "secret": "ss5TntoUUzYGNQ3jypjThwxjZEpf6"
}
````

