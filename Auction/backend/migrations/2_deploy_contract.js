const DeedRepository = artifacts.require("DeedRepository");

module.exports = function(deployer) {
  deployer.deploy(DeedRepository, "Ultra Auction NFT", "UANFT");
};
