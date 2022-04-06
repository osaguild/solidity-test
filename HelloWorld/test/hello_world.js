const HelloWorldContract = artifacts.require("HelloWorld");
 
contract("HelloWorld", () => {
  it("has been deployed successfully", async () => {
      const hello = await HelloWorldContract.deployed();
      assert(hello, "contract was not deployed");
  });
 
    describe("sayHello()", () => {
        it("returns 'Hello World'", async () => {
            const hello = await HelloWorldContract.deployed();
            const expected = "Hello World";
            const actual = await hello.sayHello();
            assert.equal(actual, expected, "Hello World");
        });
    });
});