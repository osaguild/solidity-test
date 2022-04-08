const Faucet = artifacts.require("Faucet");
const Faucet2 = artifacts.require("Faucet2");
const calledLibrary = artifacts.require("calledLibrary");
const caller = artifacts.require("caller");
const calledContract = artifacts.require("calledContract");

module.exports = function (deployer) {
  deployer.deploy(Faucet);
  deployer.deploy(Faucet2);
  deployer.deploy(calledLibrary);
  deployer.link(calledLibrary, caller);
  deployer.deploy(caller);
  deployer.deploy(calledContract);
};
