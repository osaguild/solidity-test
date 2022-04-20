// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OSAFaucet {
    ERC20 public OSAToken;
    address public OSATokenOwner;

    constructor(address _OSAToken, address _OSATokenOwner) public {
        OSAToken = ERC20(_OSAToken);
        OSATokenOwner = _OSATokenOwner;
    }

    function withdraw(uint256 osa_amount) public {
        require(osa_amount <= 10);

        OSAToken.transferFrom(OSATokenOwner, msg.sender, osa_amount);
    }
    
    receive() external payable {}
}
