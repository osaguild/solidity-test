# OSAToken
test for token sample is METoken


## create OSA contract
### set up
- `mkdir OSAToken`
- `cd OSAToken`
- `truffle init`
- `npm init`
- `npm install @openzeppelin/contracts`
### edit truffle-config.js
- i use only private and ganache as development
- specify compiler version is 0.8.13
### create OSAToken.sol
- [sample code](https://docs.openzeppelin.com/contracts/4.x/erc20)
- i need just constructor is spcified initial supply
### create 2_deploy_osatoken.js
- specify 100 initial supply
### compile and deploy at local
- `truffle develop`
- `compile`
- `migrate`
### test
- ERC20 methods is [here](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- contract address
  - `OSAToken.address`
- total supply
  - `OSAToken.deployed().then(instance=>{instance.totalSupply().then(totalSupply=>{console.log(totalSupply)})})`
- balance of owner
  - `OSAToken.deployed().then(instance=>{instance.balanceOf(accounts[0]).then(balance=>{console.log(balance)})})`
- name
  - `OSAToken.deployed().then(instance=>{instance.name().then(name=>{console.log(name)})})`
- symbol
  - `OSAToken.deployed().then(instance=>{instance.symbol().then(symbol=>{console.log(symbol)})})`
- decimals
  - `OSAToken.deployed().then(instance=>{instance.decimals().then(decimal=>{console.log(decimal)})})`
