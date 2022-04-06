# Faucet

## solidity command
- compile
  - `solc --optimize --bin hoge.sol`
- ABI (Application Binary Interface)
  - `solc --abi hoge.sol`

## 4 major context

### msg
- Transaction Call form EOA and Message Call from Contract
- attribute and method
  - `sender value gas data sig`

### tx
- Transaction info
- attribute and method
  - `gasprice origin`

### block
- Block info
- attribute and method
  - `blockhash() coinbase difficulty gaslimit number timestamp`

### address
- Address balance
- attribute and method
  - `balance transfer(amount) send(amount) call(payload) delegatecall() `

## truffle
- install truffle
  - `npm -g install truffle`
  - `truffle version`
- init truffle
  - `truffle init`
- edit truffle-config.js
  - ```
    module.exports = {
      networks: {
        development: {
          host: "127.0.0.1",
          port: 7545,
          network_id: "*"
        }
      },
      compilers: {
        solc: {
          version: "0.6.12"
        }
      }
    };
    ```
- comile
  - `truffle compile`
- launch ganache
  - click ganache in your applications 
- deploy
  - `truffle migrate --network development`
  