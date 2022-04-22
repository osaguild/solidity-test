const DeedRepository = artifacts.require("DeedRepository");
const AuctionRepository = artifacts.require("AuctionRepository");

module.exports = async function(deployer) {
  await deployer.deploy(AuctionRepository);
  await deployer.deploy(DeedRepository, "Ultra Auction NFT", "UANFT");
};
