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

## create AuctionRepository.sol
### develop
- `truffle create contract AuctionRepository`
- edit AuctionRepository.sol
- [sample code](https://docs.openzeppelin.com/contracts/4.x/erc721)
- edit 2_deploy_contract.js
### test
- call registerDeed
  - `DeedRepository.deployed().then(instance=>{instance.registerDeed(001, "https://001.com/").then(res=>{console.log(res.logs[0].args);console.log(res.logs[1].args)})})`
- call createAuction
  - `AuctionRepository.deployed().then(instance=>{instance.createAuction(DeedRepository.address,001,"sample auction","hello auction",web3.utils.toWei('1','ether'),1743433200).then(res=>{console.log(res.logs[0].args)})})` 
- get auction by id
  - `AuctionRepository.deployed().then(instance=>{instance.getAuctionById(0).then(res=>{console.log(res)})})` 
- add deed and auction
  - `DeedRepository.deployed().then(instance=>{instance.registerDeed(002, "https://002.com/").then(res=>{console.log(res.logs[0].args);console.log(res.logs[1].args)})})`
  - `AuctionRepository.deployed().then(instance=>{instance.createAuction(DeedRepository.address,002,"second auction","hi auction",web3.utils.toWei('1','ether'),1743433200).then(res=>{console.log(res.logs[0].args)})})` 
- get count
  - `AuctionRepository.deployed().then(instance=>{instance.getCount().then(res=>{console.log(res)})})`
- get owned auctions
  - `AuctionRepository.deployed().then(instance=>{instance.getAuctionsOf(accounts[0]).then(res=>{console.log(res)})})`
- get owned auction counts
  - `AuctionRepository.deployed().then(instance=>{instance.getAuctionCountOfOwner(accounts[0]).then(res=>{console.log(res)})})`
- call bid 200 eth from accounts[1]
  - `AuctionRepository.deployed().then(instance=>{instance.bidOnAuction(0,{from:accounts[1],value:web3.utils.toWei('2','ether')}).then(res=>{console.log(res.logs[0].args)})})`
  - `web3.eth.getBalance(accounts[1])`
  - `web3.eth.getBalance(AuctionRepository.address)`
- call bid 300 eth from accounts[2]
  - `AuctionRepository.deployed().then(instance=>{instance.bidOnAuction(0,{from:accounts[2],value:web3.utils.toWei('3','ether')}).then(res=>{console.log(res.logs[0])})})`
  - `web3.eth.getBalance(accounts[1])`
  - `web3.eth.getBalance(accounts[2])`
  - `web3.eth.getBalance(AuctionRepository.address)`