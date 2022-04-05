# memo for practice

## command
- compile
  - `solc --optimize --bin hoge.sol`
- ABI (Application Binary Interface)
  - `solc --abi hoge.sol`

## 3 major context

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