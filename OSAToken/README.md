# OSAToken
test for token sample is METoken


## create OSAToken
OSAToken is ERC20 base token. 
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
### create 2_deploy_contract.js
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


## create OSAFaucet
OSAFaucet is faucet of OSAToken. you can get OSAToken through OSAFaucet if you pay ETH
### create OSAFaucet.sol
- constructer set OSAToken as ERC20 token and address of owner is accounts[0]
- contract has withdraw method. you can get OSAToken if you pay ETH.
### edit 2_deploy_contract.js
- add deploy OSAFaucet
### compile and deploy at local
- `truffle develop`
- `compile`
- `migrate`
### test transfer OSA via OSAFaucet
- balance of OSA ...
  - owner : `OSAToken.deployed().then(instance=>{instance.balanceOf(accounts[0]).then(balance=>{console.log(balance)})})`
  - account[1] : `OSAToken.deployed().then(instance=>{instance.balanceOf(accounts[1]).then(balance=>{console.log(balance)})})`
  - OSAToken contract : `OSAToken.deployed().then(instance=>{instance.balanceOf(OSAToken.address).then(balance=>{console.log(balance)})})`
  - OSAFaucet contract : `OSAToken.deployed().then(instance=>{instance.balanceOf(OSAFaucet.address).then(balance=>{console.log(balance)})})`
- approve OSAFaucet to transfer OSA up to 5
  - `OSAToken.deployed().then(instance=>{instance.approve(OSAFaucet.address,10)})`
- transfer OSA from OSAFaucet to accounts[1]
  - `OSAFaucet.deployed().then(instance=>{instance.withdraw(5,{from:accounts[1]})})`
### test transfer OSA via OSAToken
- transfer OSA from OSAToken to accounts[1] 
  - `OSAToken.deployed().then(instance=>{instance.transfer(accounts[1],10)})`
### test transfer ETH
- balance of ETH ...
  - owner : `web3.eth.getBalance(accounts[0])`
  - accounts[1] : `web3.eth.getBalance(accounts[1])`
  - OSAToken contract : `web3.eth.getBalance(OSAToken.address)`
  - OSAFaucet contract : `web3.eth.getBalance(OSAFaucet.address)`
- transfer ETH from owner
  - to OSAFaucet : `OSAFaucet.deployed().then(instance=>{instance.send(web3.utils.toWei('1','ether'))})`
  - to OSAToken : `OSAToken.deployed().then(instance=>{instance.send(web3.utils.toWei('1','ether'))})`
### test approve -> increaseAllowance -> decreaseAllowance -> withdraw
- approve OSAFaucet 10 OSA
  - `OSAToken.deployed().then(instance=>{instance.approve(OSAFaucet.address,10)})`
  - withdraw 10.1 OSA -> ng
    - `OSAFaucet.deployed().then(instance=>{instance.withdraw(10.1,{from:accounts[1]})})`
  - withdraw 10 OSA -> ok
    - `OSAFaucet.deployed().then(instance=>{instance.withdraw(10,{from:accounts[1]})})`
- decrease allowance OSAFaucet 2 OSA
  - `OSAToken.deployed().then(instance=>{instance.decreaseAllowance(OSAFaucet.address,2)})`
  - withdraw 8.1 OSA -> ng
    - `OSAFaucet.deployed().then(instance=>{instance.withdraw(8.1,{from:accounts[1]})})`
  - withdraw 8 OSA -> ok
    - `OSAFaucet.deployed().then(instance=>{instance.withdraw(8,{from:accounts[1]})})`
- increase allowance OSAFaucet 2 OSA
  - `OSAToken.deployed().then(instance=>{instance.increaseAllowance(OSAFaucet.address,2)})`
  - withdraw 12.1 OSA -> ng
    - `OSAFaucet.deployed().then(instance=>{instance.withdraw(12.1,{from:accounts[1]})})`
  - withdraw 12 OSA -> ok
    - `OSAFaucet.deployed().then(instance=>{instance.withdraw(12,{from:accounts[1]})})`


## add mint to OSAToken
increase OSA total supply
### edit OSAToken
add increase method that mint OSA
### compile and deploy at local
- `truffle develop`
- `compile`
- `migrate`
### test mint OSA
- check total supply
  - `OSAToken.deployed().then(instance=>{instance.totalSupply().then(totalSupply=>{console.log(totalSupply)})})`
- mint OSA
  - `OSAToken.deployed().then(instance=>{instance.increase(10)})`
- check total supply
  - `OSAToken.deployed().then(instance=>{instance.totalSupply().then(totalSupply=>{console.log(totalSupply)})})`
- transfer 110 OSA
  - `OSAToken.deployed().then(instance=>{instance.transfer(accounts[1],110)})`
- balance of OSA ...
  - owner : `OSAToken.deployed().then(instance=>{instance.balanceOf(accounts[0]).then(balance=>{console.log(balance)})})`
  - account[1] : `OSAToken.deployed().then(instance=>{instance.balanceOf(accounts[1]).then(balance=>{console.log(balance)})})`
