const Faucet = artifacts.require("Faucet");

contract('Faucet', (accounts) => {
  it('check deploy', async () => {
    const faucetInstance = await Faucet.deployed();

    assert(faucetInstance, 'miss');
  });
  it('check withdraw', async () => {
    const faucetInstance = await Faucet.deployed();

    // send 1 eth to contract
    var r_b;
    await faucetInstance.send(web3.utils.toWei('1', 'ether'))
      .then(res => {
        r_b = res.receipt;
      })

    // check balance
    var r_b_a;
    var r_b_c;
    await web3.eth.getBalance(r_b.from)
      .then(res => {
        r_b_a = res;
      })
    await web3.eth.getBalance(r_b.to)
      .then(res => {
        r_b_c = res;
      })

    // withdraw 0.1 eth from contract
    var r_a;
    await faucetInstance.withdraw(web3.utils.toWei('0.1', "ether"))
      .then(res => {
        r_a = res.receipt;
      })

    // check balance
    var r_a_a;
    var r_a_c;
    await web3.eth.getBalance(r_a.from)
      .then(res => {
        r_a_a = res;
      })
    await web3.eth.getBalance(r_a.to)
      .then(res => {
        r_a_c = res;
      })

    console.log('      account balance  ', r_b_a, ' -> ', r_a_a, '(', r_b_a - r_a_a, ')');
    console.log('      contract balance ', r_b_c, ' -> ', r_a_c, '(', r_b_c - r_a_c, ')');

    assert.ok(true);
  });
  it('check destroy', async () => {
    const faucetInstance = await Faucet.deployed();

    // check destroy
    var destroy;
    await faucetInstance.destroy()
      .then(res => {
        destroy = res;
      })

    assert(destroy, 'miss');
  });
});
