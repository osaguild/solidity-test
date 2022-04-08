const Caller = artifacts.require("caller");
const CalledContract = artifacts.require("calledContract");

contract('caller', (accounts) => {
  it('check caller deploy', async () => {
    const callerInstance = await Caller.deployed();

    assert(callerInstance, 'miss');
  });
  it('check call', async () => {
    const callerInstance = await Caller.deployed();
    
    // account address
    const account = await web3.eth.getAccounts();
    console.log('account        :', account[0]);

    // caller address
    console.log('caller         :', Caller.address);

    // calledContract address
    console.log('calledContract :', CalledContract.address);

    // call make_calls
    await callerInstance.make_calls(CalledContract.address)
      .then(res => {
        res.logs.forEach(log => {
          console.log(log.args);
        })
      });

    assert.ok(true);
  });
});
