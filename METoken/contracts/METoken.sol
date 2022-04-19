// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract METoken is ERC20 {
    constructor() ERC20('Mastering Ethereum Token', 'MET') {
        _mint(msg.sender,2100000000);
    }
}