const Auction = artifacts.require("AuctionRepository");
const Deed = artifacts.require("DeedRepository");

let deedInstance;
let auctionInstance;

const tokenId = 001;
const uri = "https://001.com/";
const title = "test auction";
const metaData = "sample meta data";
const startPrice = web3.utils.toWei('1', "ether");
const blockDeadline = 1743433200;
let auctionId;

contract("Deed and Auction", (accounts) => {
  it("check deploy", async () => {
    deedInstance = await Deed.deployed();
    assert(deedInstance.address, "deploy of deed is failed");

    auctionInstance = await Auction.deployed();
    assert(auctionInstance.address, "deploy of auction is failed");
  });
  it("register deed", async () => {
    await deedInstance.registerDeed(tokenId, uri);

    await deedInstance.balanceOf(accounts[0]).then(res => {
      assert.equal(res.toString(), "1", "balance is not 1");
    });
    await deedInstance.ownerOf(tokenId).then(res => {
      assert.equal(res, accounts[0], "owner is not accounts[0]");
    });
    await deedInstance.tokenURI(tokenId).then(res => {
      assert.equal(res, uri, `uri is not ${uri}`);
    });
  });
  it("transfer deed", async () => {
    await deedInstance.transferFrom(accounts[0], auctionInstance.address, tokenId);
    await deedInstance.ownerOf(tokenId).then(res => {
      assert.equal(res, auctionInstance.address, "owner is not auctionInstance.address");
    });
  });
  it("create auction", async () => {
    await auctionInstance.createAuction(deedInstance.address, tokenId, title, metaData, startPrice, blockDeadline).then(res => {
      if (res.logs[0].event == "AuctionCreated") {
        auctionId = res.logs[0].args._auctionId.toString();
      } else {
        assert.ok(false);
      }
    });
    await auctionInstance.getAuctionById(auctionId).then(res => {
      assert.equal(res.name, title, `name is not ${title}`);
      assert.equal(res.blockDeadline.toString(), blockDeadline, `blockDeadline is not ${blockDeadline}`);
      assert.equal(res.startPrice.toString(), startPrice, `startPrice is not ${startPrice}`);
      assert.equal(res.metadata, metaData, `metaData is not ${metaData}`);
      assert.equal(res.deedId.toString(), tokenId, `deedId is not ${tokenId}`);
      assert.equal(res.deedRepositoryAddress, deedInstance.address, `deedRepositoryAddress is not ${deedInstance.address}`);
      assert.equal(res.owner, accounts[0], `owner is not accounts[0]`);
    });
  });
  it("bid 2eth from accounts[1]", async () => {
    await auctionInstance.bidOnAuction(auctionId, { from: accounts[1], value: web3.utils.toWei("2", "ether") });
    await auctionInstance.getCurrentBid(auctionId).then(res => {
      assert.equal(res[0].toString(), web3.utils.toWei("2", "ether"), "bid amount is not 2eth");
      assert.equal(res[1], accounts[1], "bidder is not accounts[1]");
    });
    await auctionInstance.getBidsCount(auctionId).then(res => {
      assert.equal(res.toString(), "1", "bids count is not 1");
    });
    await web3.eth.getBalance(auctionInstance.address).then(res => {
      assert.equal(res, web3.utils.toWei("2", "ether"), "auction balance is not 2eth");
    });
  });
  it("bid 3eth from accounts[2]", async () => {
    await auctionInstance.bidOnAuction(auctionId, { from: accounts[2], value: web3.utils.toWei("3", "ether") });
    await auctionInstance.getCurrentBid(auctionId).then(res => {
      assert.equal(res[0].toString(), web3.utils.toWei("3", "ether"), "bid amount is not 3eth");
      assert.equal(res[1], accounts[2], "bidder is not accounts[2]");
    });
    await auctionInstance.getBidsCount(auctionId).then(res => {
      assert.equal(res.toString(), "2", "bids count is not 2");
    });
    await web3.eth.getBalance(auctionInstance.address).then(res => {
      assert.equal(res, web3.utils.toWei("3", "ether"), "auction balance is not 3eth");
    });
  });
  it("cancel auction", async () => {
    await auctionInstance.cancelAuction(auctionId);
    await deedInstance.ownerOf(tokenId).then(res => {
      assert.equal(res, accounts[0], "owner is not accounts[0]");
    });
    await web3.eth.getBalance(auctionInstance.address).then(res => {
      assert.equal(res, web3.utils.toWei("0", "ether"), "auction balance is not 0eth");
    });
  });
  it("finalize auction", async()=>{
    await deedInstance.registerDeed(002, "https://002.com/");
    await deedInstance.transferFrom(accounts[0], auctionInstance.address, 002);
    await auctionInstance.createAuction(deedInstance.address, 002, title, metaData, startPrice, blockDeadline);
    await auctionInstance.bidOnAuction(1, { from: accounts[1], value: web3.utils.toWei("2", "ether") });
    await auctionInstance.bidOnAuction(1, { from: accounts[2], value: web3.utils.toWei("3", "ether") });
    await auctionInstance.finalizeAuction(1);
    await deedInstance.ownerOf(002).then(res => {
      assert.equal(res, accounts[2], "owner is not accounts[2]");
    });
    await web3.eth.getBalance(auctionInstance.address).then(res => {
      assert.equal(res, web3.utils.toWei("0", "ether"), "auction balance is not 0eth");
    });
  });
});