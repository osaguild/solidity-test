const Faucet = artifacts.require("Faucet");
const Faucet2 = artifacts.require("Faucet2");

module.exports = function (deployer) {
  deployer.deploy(Faucet);
  deployer.deploy(Faucet2);
};
