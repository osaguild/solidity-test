# HelloWorld

## set up
- `cd HelloWorld`
- `truffle init`

## edit truffle-config.js
- ```
  module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "*"
      }
    }
  };
  ```

## launch ganache
- click ganache in your application
- create new workspace

## create contract
- `truffle console`
- `truffle create contract HelloWorld`
- edit HelloWorld.sol on your editor
  - ```
    pragma solidity >=0.4.22 <0.9.0;

    contract HelloWorld {
      
      function sayHello() public pure returns (string memory) {
        return "Hello World";
      }
    }
    ```
- change your compiler version like blow
  - check your truffle and solidity version
    - `truffle version`
  - resule image
    - ```
      Truffle v5.5.7 (core: 5.5.7)
      Ganache v^7.0.3
      Solidity v0.5.16 (solc-js)
      Node v16.14.2
      Web3.js v1.5.3
      ```
  - right click editor space of HelloWorld.sol on VScode
  - choose "solidity: download compiler and set workspace local path
  - choose solidity version that matches your contract

## compile
- back to truffle console
- `truffle compile`

## deploy
- create migration file
  - `truffle create migration HelloWorld`
- change file name
  - `2_hello_world.js`
- edit file
  - ```
    var HelloWorld = artifacts.require("HelloWorld");
    
    module.exports = function(deployer) {
      deployer.deploy(HelloWorld);
    };
    ```
- deploy
  - `truffle migrate`

## check
- input command on truffle console
  - `var helloWorld; HelloWorld.deployed().then((obj) => { helloWorld = obj; })`
  - `helloWorld.sayHello()`
