# Oraclize
test for oraclize


## create EthUsdPriceTickers
using provable
### set up
- `mkdir Oraclize`
- `cd Oraclize`
- `truffle init`
- `npm init`
- `npm install provable-eth-api`
### edit truffle-config.js
- i use only private and ganache as development
- specify compiler version is 0.5.12
### create ExampleContract.sol
- [sample code](https://docs.provable.xyz/#ethereum)
- add updatePrice and __callback method
### create 2_deploy_contract.js
- default
### compile and deploy at local
- `truffle develop`
- `compile`
- `migrate`
### test oraclize
- call updatePrice()
  - `ExampleContract.deployed().then(instance=>{instance.updatePrice()})`
