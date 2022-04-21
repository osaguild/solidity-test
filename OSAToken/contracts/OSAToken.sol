// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OSAToken is ERC20 {
    event Mint(address indexed player, uint256 ammount);

    address public OSATokenOwner;

    constructor(uint256 _initialSupply) ERC20("OSA Token", "OSA") {
        OSATokenOwner = msg.sender;
        _mint(msg.sender, _initialSupply);
        emit Mint(msg.sender, _initialSupply);
    }

    function increase(uint256 _OSAAmount) public {
        require(msg.sender == OSATokenOwner);
        require(_OSAAmount <= 100);
        _mint(msg.sender, _OSAAmount);
        emit Mint(msg.sender, _OSAAmount);
    }

    receive() external payable {}
}