# Security

## set up

### init truffle 
- `cd Security`
- `truffle init`

### edit truffle-config.js
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

### create contract
- `truffle create contract {{contract name}}`
- `truffle create migration {{contract name}}`
- change migration file name like `2_contract_name.js`
- change migiration file like blow
  - ```
    var HelloWorld = artifacts.require("HelloWorld");
    
    module.exports = function(deployer) {
      deployer.deploy(HelloWorld);
    };
    ```

## deploy and run
### deploy on local chain
- `truffle develop`
- `compile`
- `migrate`

### run script on local chain
- `exec {{script name}}`