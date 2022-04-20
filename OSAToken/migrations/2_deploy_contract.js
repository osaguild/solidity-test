const OSAToken = artifacts.require("OSAToken");
const OSAFaucet = artifacts.require("OSAFaucet");

module.exports = async function (deployer) {
	await deployer.deploy(OSAToken, 100);
	
	const osaTokenInstance = await OSAToken.deployed();
	const accounts = await web3.eth.getAccounts();
	const owner = accounts[0];
	
	await deployer.deploy(OSAFaucet, osaTokenInstance.address, owner);
};