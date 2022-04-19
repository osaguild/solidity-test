# METoken

## Development

### set up
- `mkdir METoken`
- `cd METoken`
- `truffle init`
- `npm init`
- `npm install --save-dev dotenv truffle-wallet-provider ethereumjs-wallet`
- edit `truffle-config.js`
  - coment out dev, mainnet, ropsten, kovan
- `npm install @openzeppelin/contracts`
- add and edit `METoken.sol`
- add and edit `2_deploy_contracts.js`

### compile
- compile ver is `v0.8.13+commit.abaa5c0e`
- `truffle compile`

### deploy
- `truffle migrate --network ganache`


## Test 

### connect truffle console
- `truffle console --network ganache`

### check instance address
- `METoken`
  - `'0x4F0a590a4421eE67bfF2d9FE4f75f5876F8Caba0'`

### check totoal supply of MET
- `METoken.deployed().then(instance => instance.totalSupply())`
  - ```
    BN {
      negative: 0,
      words: [ 19625216, 31, <1 empty item> ],
      length: 2,
      red: null
    }
    ```

### get account0 MET
- ```
  let accounts
  web3.eth.getAccounts((err,res) => { accounts = res })
  accounts[0]
  ```
  - `'0x384C2c9e24c54397C5E55799e9d0FBa1E94eF70F'`
- `METoken.deployed().then(instance => { instance.balanceOf(accounts[0]).then(console.log) })`
  - ```
    truffle(ganache)> BN {
      negative: 0,
      words: [ 19625216, 31, <1 empty item> ],
      length: 2,
      red: null
    }    
    ```

### transfer MET account0 to account1
- `METoken.deployed().then(instance => { instance.transfer(accounts[1], 100000) })`
  - `✓ Transaction submitted successfully. Hash: 0xc700c5e4e3b152e699ae6aa00195a725f0ecc1ca78f088e1d1996f3b000b59f3`
- `METoken.deployed().then(instance => { instance.balanceOf(accounts[0]).then(console.log) })`
  - ```
    truffle(ganache)> BN {
      negative: 0,
      words: [ 19525216, 31, <1 empty item> ],
      length: 2,
      red: null
    }
    ```
- `METoken.deployed().then(instance => { instance.balanceOf(accounts[1]).then(console.log) })`
  - ```
    truffle(ganache)> BN {
      negative: 0,
      words: [ 100000, <1 empty item> ],
      length: 1,
      red: null
    }    
    ```

# METoken x Faucet

## Development

### set up
- add and edit `Faucet.sol`
- add and edit `3_deploy_faucet.js`

### compile
- `truffle compile`

### deploy
- `truffle migrate --network ganache`

## Test

### connect truffle console
- `truffle console --network ganache`

### transfer MET METoken contract to Faucet contract
- `METoken.deployed().then(instance => { instance.transfer(Faucet.address, 100000) })`
  - `Transaction submitted successfully. Hash: 0x6b99edc4b8be36870a1c5fd0050fd4acb1d5828728ad9ebdf26daeaa9183a706`
- `METoken.deployed().then(instance => { instance.balanceOf(Faucet.address).then(console.log)})`
  - ```
    truffle(ganache)> BN {
      negative: 0,
      words: [ 100000, <1 empty item> ],
      length: 1,
      red: null
    }
    ```
- `METoken.deployed().then(instance => { instance.balanceOf(accounts[0]).then(console.log) })`
  - ```
    truffle(ganache)> BN {
      negative: 0,
      words: [ 19425216, 31, <1 empty item> ],
      length: 2,
      red: null
    }
    ```
- `METoken.deployed().then(instance => { instance.balanceOf(accounts[1]).then(console.log) })`
  - ```
    truffle(ganache)> BN {
      negative: 0,
      words: [ 100000, <1 empty item> ],
      length: 1,
      red: null
    }
    ```

# METoken x METFaucet

## Development

### set up
- add and edit `METFaucet.sol`
- add and edit `4_deploy_metfaucet.js`

### compile
- `truffle compile`
- some warnings are occured
  - ```
        Warning: This contract has a payable fallback function, but no receive ether function. Consider adding a receive ether function.
    --> project:/contracts/METFaucet.sol:7:1:
      |
    7 | contract METFaucet {
      | ^ (Relevant source part starts here and spans across multiple lines).
    ```
  - ```
    ,Warning: Visibility for constructor is ignored. If you want the contract to be non-deployable, making it "abstract" is sufficient.
      --> project:/contracts/METFaucet.sol:13:5:
      |
    13 |     constructor(address _METoken, address _METOwner) public {
      |     ^ (Relevant source part starts here and spans across multiple lines).
    ```

### deploy
- `truffle migrate --network ganache`

## Test

### connect truffle console
- `truffle console --network ganache`

### transfer MET METoken contract to METFaucet contract
- `METoken.deployed().then(instance => { instance.approve(METFaucet.address, 100000) })`
  - `✓ Transaction submitted successfully. Hash: 0x13e263d06bb19f6483e15715550d52233ad5c9f10d21fd43f77965342da245ce`
- `METoken.deployed().then(instance => { instance.balanceOf(accounts[1]).then(console.log) })`
  - ```
    truffle(ganache)> BN {
      negative: 0,
      words: [ 100000, <1 empty item> ],
      length: 1,
      red: null
    }
    ```
- `METFaucet.deployed().then(instance => { instance.withdraw(1000, {from:accounts[1]}) } )`
  - `✓ Transaction submitted successfully. Hash: 0x2e791ed9422a871e2cc260c77620a22b4e4c265eb0f354d900056b385c8e0b33`
- `METoken.deployed().then(instance => { instance.balanceOf(accounts[1]).then(console.log) })`
  - ```
    ruffle(ganache)> BN {
      negative: 0,
      words: [ 101000, <1 empty item> ],
      length: 1,
      red: null
    }
    ```
- `METoken.deployed().then(instance => { instance.balanceOf(accounts[0]).then(console.log) })`
  - ```
    truffle(ganache)> BN {
      negative: 0,
      words: [ 19424216, 31, <1 empty item> ],
      length: 2,
      red: null
    }
    ```