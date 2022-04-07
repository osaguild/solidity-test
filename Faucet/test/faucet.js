const Faucet = artifacts.require("Faucet");

contract('Faucet', (accounts) => {
  it('check deploy', async () => {
    const faucetInstance = await Faucet.deployed();

    assert(faucetInstance, 'miss');
  });
  it('check withdraw', async () => {
    const faucetInstance = await Faucet.deployed();
    var withdraw_tx;

    // send 1 eth to contract
    await faucetInstance.send(web3.utils.toWei('1', 'ether'))
    .then(res => {
      console.log('send tx: ', res.tx);
    })

    // withdraw 0.1 eth from contract
    await faucetInstance.withdraw(web3.utils.toWei('0.1', "ether"))
    .then(res => {
      console.log('withdraw tx: ', res.tx);
    })
    
    assert.ok(true);
  });
});
