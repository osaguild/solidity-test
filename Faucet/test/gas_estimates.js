const Faucet = artifacts.require("Faucet");

contract('Faucet', (accounts) => {
  it('check deploy', async () => {
    const faucetInstance = await Faucet.deployed();

    assert(faucetInstance, 'miss');
  });
  it('check gas price', async () => {
    const faucetInstance = await Faucet.deployed();

    // contract gas price
    const gasPrice = await web3.eth.getGasPrice().then(res => {
      return res;
    });
    console.log('Gas Price is ', gasPrice, ' wei');

    // Get the contract instance
    await faucetInstance.send(web3.utils.toWei('1', 'ether'));
    const gas = await faucetInstance.withdraw.estimateGas(web3.utils.toWei('0.1', "ether"))
    .then(res => {
      return res;
    });
    console.log("gas estimation = " + Number(gas) + " units");

    console.log("gas cost estimation = " + (gas * gasPrice) + " wei");
    console.log("gas cost estimation = " +  web3.utils.fromWei(String(gas * gasPrice), 'ether') + " ether");
  });

  assert.ok(true);
});
