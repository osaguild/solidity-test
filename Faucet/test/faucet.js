const Faucet = artifacts.require("Faucet");

contract('Faucet', (accounts) => {
  it('check deploy', async () => {
    const faucetInstance = await Faucet.deployed();

    assert(faucetInstance, 'miss');
  });
  it('check withdraw', async () => {
    const faucetInstance = await Faucet.deployed();

    // send 1 eth to contract
    var from_1;
    await faucetInstance.send(web3.utils.toWei('1', 'ether'))
      .then(res => {
        from_1 = res.receipt.from;
      })

    // check balance
    await web3.eth.getBalance(from_1)
      .then(res => {
        console.log(res);
      })

    // withdraw 0.1 eth from contract
    var from_2;
    await faucetInstance.withdraw(web3.utils.toWei('0.1', "ether"))
      .then(res => {
        from_2 = res.receipt.from;
      })

    // check balance
    await web3.eth.getBalance(from_2)
      .then(res => {
        console.log(res);
      })

    assert.ok(true);
  });
});
