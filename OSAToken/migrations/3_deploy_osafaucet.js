const OSAToken = artifacts.require("OSAToken");
const OSAFaucet = artifacts.require("OSAFaucet");

async function getOwner() {
	let owner;
	await web3.eth.getAccounts().then(res => {
		const accounts = res;
		owner = accounts[0];
	});

	return owner
}

module.exports = function (deployer) {
	const owner = getOwner();
	deployer.deploy(OSAFaucet, OSAToken.address, owner);
};

/*
module.exports = async function (deployer) {
	const accounts = await web3.eth.getAccounts();
	const owner = accounts[0];
	deployer.deploy(OSAFaucet, OSAToken.address, owner);
};
*/