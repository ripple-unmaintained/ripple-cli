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
    server_info                                     retrieve info of a running rippled server

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -a --account <account>  ripple account
    -k --key-path <path>    path to account secret key
    -s --server <uri>       websocket uri to rippled server
````

### Generating a Wallet

Serialized JSON of a ripple `address` and `secret` pair will be written to stdout

````
$ ripple-cli wallet | json
{
    "address": "rJVjRR7LbhJdDi32J7pGvWjiVSiWaSjZj2",
    "secret": "ss5TntoUUzYGNQ3jypjThwxjZEpf6"
}
````

### Listing Account Balances

Serialized JSON of ripple account balances and metadata are written to stdout

````
ripple-cli balances --account r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk | json
{
    "account": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
    "ledger_hash": "8F9A4486E53A6883F5402FE4F149C25635ED91903377D519A59AA7043C30CA0F",
    "ledger_index": 13784250,
    "lines": [
        {
            "account": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
            "balance": "15",
            "currency": "XAU",
            "limit": "100000",
            "limit_peer": "0",
            "no_ripple": true,
            "quality_in": 0,
            "quality_out": 0
        },
        {
            "account": "rHKueQebtVU9cEamhBbMV8AEViqKjXcBcB",
            "balance": "-8.773152697244761",
            "currency": "USD",
            "limit": "20",
            "limit_peer": "20",
            "quality_in": 0,
            "quality_out": 0
        }
    ]
}
````

### Paying Ripple Accounts
Pass the `--key-path` option to a file containing the ripple account secret on a single line
Transaction result is written to `stdout` as serialized JSON

By default `ripple-cli` loads the file at `~/.ripple`, expecting a json file with a "secret"
property containing the ripple account secret. Otherwise th --key-path option must be provided

````
ripple-cli pay -a r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk rJBrmcc5VRAEEDY4AzVRMFNW192dnVQwXt 1 XRP | json
{
    "engine_result": "tesSUCCESS",
    "engine_result_code": 0,
    "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
    "ledger_hash": "E4CD26CEB153682D823716A33C840C57504614D915D3B4831BCEB5757FE2B069",
    "ledger_index": 13784716,
    "metadata": {
      ...
    }
}
````

### Retrieving Server Info
Serialized JSON of the rippled server stats are written to stdout

````
ripple-cli server_info --server wss://r.ripple.com:51233 | json
{
    "info": {
        "build_version": "0.28.1-rc3",
        "complete_ledgers": "13766697-13795596",
        "hostid": "VASE",
        "io_latency_ms": 1,
        "last_close": {
            "converge_time_s": 2.002,
            "proposers": 5
        },
        "load_factor": 1000,
        "peers": 85,
        "pubkey_node": "n9MT5EjnV912KGuBUqPs4tpdhzMPGcnDBrTuWkD9sWQHJ1kDcUcz",
        "server_state": "full",
        "validated_ledger": {
            "age": 2,
            "base_fee_xrp": 1e-05,
            "hash": "6AB56C04B87879EF8686FCFF6F7981F2C3E9C5A5963AA3C20A5731B08A3A8A65",
            "reserve_base_xrp": 20,
            "reserve_inc_xrp": 5,
            "seq": 13795596
        },
        "validation_quorum": 3
    }
}
````

