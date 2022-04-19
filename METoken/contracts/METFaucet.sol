// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// A faucet for ERC20 token MET
contract METFaucet {
    ERC20 public METoken;
    address public METOwner;

    // METFaucet constructor, provide the address of METoken contract and
    // the owner address we will be approved to transferFrom
    constructor(address _METoken, address _METOwner) public {
        // Initialize the METoken from the address provided
        METoken = ERC20(_METoken);
        METOwner = _METOwner;
    }

    function withdraw(uint256 withdraw_amount) public {
        // Limit withdrawal amount to 10 MET
        require(withdraw_amount <= 1000);

        // Use the transferFrom function of METoken
        METoken.transferFrom(METOwner, msg.sender, withdraw_amount);
    }

    // REJECT any incoming ether
    fallback() external payable {
        require(msg.value > 0, "REJECT any incoming ether");
    }
}
