const OSAToken = artifacts.require("OSAToken");

module.exports = function (deployer) {
	deployer.deploy(OSAToken, 100);
};