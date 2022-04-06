# Faucet

## solidity command
- compile
  - `solc --optimize --bin hoge.sol`
- ABI (Application Binary Interface)
  - `solc --abi hoge.sol`

## 3 major context

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
- install nvm
  - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
  - `source ~/.zshrc`
  - `nvm install --list`
- set node
  - `node -v > .nvmrc`
  - `nvm install`
- install truffle
  - `npm -g install truffle`
  - `truffle version`
- init truffle
  - `truffle init`
- edit truffle-config.js
  - ```
    module.exports = {
      networks: {
        localnode: {
          network_id: "*",
          host: "localhost",
          port: 8545,
        }
      },
      compilers: {
      solc: {
          version: "0.6.12"
        }
      }
    };
    ```
- init npm
  - `npm init`
- install package
  - `npm install dotenv truffle-wallet-provider ethereumjs-wallet`
- move solidity file to contracts
  - ex) `contracts/Faucet.sol`
- comile
  - `truffle compile`
- deploy script
  - file is `/migrations/2_deploy_contracts.js`
  - ```
    const Faucet = artifacts.require("Faucet");
    
    module.exports = function (deployer) {
      deployer.deploy(Faucet);
    };
    ```
- deploy
  - `truffle migrate --network localnode`
  - 