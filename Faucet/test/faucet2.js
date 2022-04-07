const Faucet2 = artifacts.require("Faucet2");

contract('Faucet2', (accounts) => {
  it('check deploy', async () => {
    const faucet2Instance = await Faucet2.deployed();

    assert(faucet2Instance, 'miss');
  });
});
