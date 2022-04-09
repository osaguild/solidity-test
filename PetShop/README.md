# pet shop
this projets is [tutorial](https://trufflesuite.com/tutorial/) of truffle

## set up

### fork project template
- `cd petshop`
- `truffle unbox pet-shop`

### create contraxt
- `truffle create contract Adoption`
- edit file

### compile
- `truffle compile`
  
### migration
- `truffle create migration Contract`
- edit file name
- edit file 

## deploy

### run ganache
- run ganache
- create new workspace
- set truffle project
- changee rpc server port `8545` to `7545`
  
### migration
- `truffle migrate`

### create test using javascript
- create file `./test/testAdoption.js`
- edit file
- `truffle test`

## create front-end
- edit file `./src/js/app.js`

### MetaMask
- launch MetaMask on your browser
- if you already logged in you need unlock
- click `import using secret recovery phrase`
- copy mnemonic phrase from ganache
- login using mnemonic phrase
- go to network setting `localhost 8545`
- update new rpc url to `http://127.0.0.1:7545`
- you can connect MetaMask to private network

### run npm
- `npm audit fix --force`
- `npm run dev`
- MetaMask tell you connect and trust
- click `adopt` and confirm on MetaMask
- change adopt button to success and add new block and transaction
