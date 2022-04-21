// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OSAFaucet {
    event Withdraw(address indexed player, address indexed target, uint256 ammount);

    ERC20 public OSAToken;
    address public OSATokenOwner;

    constructor(address _OSAToken, address _OSATokenOwner) public {
        OSAToken = ERC20(_OSAToken);
        OSATokenOwner = _OSATokenOwner;
    }

    function withdraw(uint256 _OSAAmount) public {
        require(_OSAAmount <= 10);
        OSAToken.transferFrom(OSATokenOwner, msg.sender, _OSAAmount);
        emit Withdraw(msg.sender, msg.sender, _OSAAmount);
    }

    receive() external payable {}
}
