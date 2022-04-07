# Faucet

## solidity command
- compile
  - `solc --optimize --bin hoge.sol`
- ABI (Application Binary Interface)
  - `solc --abi hoge.sol`

## 4 major context

### msg
- Transaction Call form EOA and Message Call from Contract
- attribute and method
  - `sender value gas data sig`

### tx
- Transaction info
- attribute and method
  - `gasprice origin`

### block
- Block info
- attribute and method
  - `blockhash() coinbase difficulty gaslimit number timestamp`

### address
- Address balance
- attribute and method
  - `balance transfer(amount) send(amount) call(payload) delegatecall() `

## truffle

### install and compile truffle
- install truffle
  - `npm -g install truffle`
  - `truffle version`
- init truffle
  - `truffle init`
- edit truffle-config.js
  - ```
    module.exports = {
      networks: {
        development: {
          host: "127.0.0.1",
          port: 7545,
          network_id: "*"
        }
      },
      compilers: {
        solc: {
          version: "0.6.12"
        }
      }
    };
    ```
- compile
  - `truffle compile`

### difference of development and develop
- development
  - development is **private network** that already built by someone like ganache
  - no need to build your own network, you just connect!
  - major private network tool is ganache that build private network and creates 10 accounts on your device
  - first launch ganache and build private network, second you can connect it
  - you can connect to ganache by typping `truffle console`
  - console changed to `truffle(development)> ` and connected to ganache
  - put `migrate`, you can deploy your contract on ganache
  - **sometimes ganache and truffle-config.js ports are different.** if you are not connected you need to check it.
- develop
  - develop is your **local network** that built by truffle
  - you type `truffle develop` and truffle build local network and you can connect to it
  - truffle creates 10 accounts in addition to building local network
  - console changed to `truffle(develop)> ` and connected to local network
  - truffle show you like blow
    - ```
      Truffle Develop started at http://127.0.0.1:9545/

      Accounts:
      (0) 0xed929a34fc0c389a4e0d85c2fc02890080c9e726
      (1) 0xdab02217958ac415b09bec86410fb871ad2b998b
      (2) 0x651b30348e8d081d41a93480b151e14373ab4b51
      (3) 0x09a10d05f4c1bbfd1d2e833a15ca35c5d782da86
      (4) 0xe0a25a08d21b0047b69dea625c0bae23e2e1ba83
      (5) 0xba14d5f1cdb3530388a2e8286743add9189737ac
      (6) 0xb0c659de6bff69313dd55ddd84adb60d15c53d06
      (7) 0x54c7f41ba832c38a20c2dc4fa480f72959af68c3
      (8) 0x68a821b2e0c7cbf7504a3fa955ed9e25c9ca7048
      (9) 0x230cf75e64bac071fb8886e374d3f060e5110789

      Private Keys:
      (0) d403d1c7f9763489d40c10c97a7bcaf64f6b6739fe8125c78da196444664c92f
      (1) d84733c4ecfb3e47585add83eb3c03685777032fcf44b4a99a74c46057823bd2
      (2) e616d4f84b3a235bf9789bee9e463be738da5ef842a42a48ea623d289e384bc4
      (3) 06a4928b6a211b83c43d32e91974556579915a7fa05b49b60409ae55e2c47993
      (4) 9568624a63a8cca56ab46c439b4051dcf7b9f8f938fba3300c58c03d99f7f950
      (5) 123b9634adfc26e772e0b035a4004d4f9f3351f549871c464c92b3874f00111f
      (6) 3ed8ba42dd89ace6e25df9b17f6f65e9a01340b382c8e411d25b309da41511f0
      (7) 197c1381012b493c3d53d6cf9f9f3061578373856e8ad7bad7947c0b153360e5
      (8) ad1673fa829e3f4519798bebe085b0798fe43399b9e1a2a58dffab05b516b7a7
      (9) e3606d2cb346f4bbad77d70f7b298e6bff0cb928f1ee03c39e2cf2b3e274a70a

      Mnemonic: exist accuse link near salon blade sausage call very tuition fan custom

      ⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
      Ensure you do not use it on production blockchains, or else you risk losing funds.
      ```
    - your default port is 9545, not private network
    - put `migrate`, you can deploy your contract on ganache
  