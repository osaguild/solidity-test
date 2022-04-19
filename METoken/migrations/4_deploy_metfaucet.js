const METoken = artifacts.require("METoken");
const METFaucet = artifacts.require("METFaucet");

async function getOwner() {
	let owner;
	await web3.eth.getAccounts().then(res => {
		console.log("accounts:", res);
		const accounts = res;
		owner = accounts[0];
	});

	return owner
}

module.exports = function (deployer) {
	const owner = getOwner();
	deployer.deploy(METFaucet, METoken.address, owner);
};