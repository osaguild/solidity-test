# backend

## set up
- `truffle init`
- edit truffle-config.js
- set compiler versin is 0.8.13
- `npm init`
- `npm install @openzeppelin/contracts`

## create DeedRepository.sol
### develop
- `truffle create contract DeedRepository`
- edit DeedRepository.sol
- [sample code](https://docs.openzeppelin.com/contracts/4.x/erc721)
- `truffle create migration DeedRepository`
- rename and edit 2_deploy_contract.js
### test
- call registerDeed
  - `DeedRepository.deployed().then(instance=>{instance.registerDeed(12345, "https://osaguild.com/").then(event=>{console.log(event)})})`
- check ERC721 token
  - `DeedRepository.deployed().then(instance=>{instance.balanceOf(accounts[0]).then(balance=>{console.log(balance)})})`
  - `DeedRepository.deployed().then(instance=>{instance.ownerOf(12345).then(owner=>{console.log(owner)})})`
  - `DeedRepository.deployed().then(instance=>{instance.tokenURI(12345).then(uri=>{console.log(uri)})})`