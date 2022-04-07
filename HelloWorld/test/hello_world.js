const HelloWorld = artifacts.require('HelloWorld');

contract('HelloWorld', () => {
    it('check deploy', async () => {
        const helloWorldInstance = await HelloWorld.deployed();

        assert(helloWorldInstance, "HelloWorld contract was not deployed");
    });
    it('check sayHello()', async () => {
        const hello = await HelloWorld.deployed();
        const sayHello = await hello.sayHello();

        assert.equal(sayHello, 'Hello World', "HelloWorld.sayHello() returned unexpected value");
    });
});