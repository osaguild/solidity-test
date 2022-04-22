// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DeedRepository.sol";

contract AuctionRepository {
    Auction[] public auctions;
    mapping(address => uint256[]) public auctionOwner;

    struct Auction {
        string name;
        uint256 blockDeadline;
        uint256 startPrice;
        string metadata;
        uint256 deedId;
        address deedRepositoryAddress;
        address payable owner;
        bool active;
        bool finalized;
    }

    modifier contractIsDeedOwner(
        address _deedRepositoryAddress,
        uint256 _deedId
    ) {
        address deedOwner = DeedRepository(_deedRepositoryAddress).ownerOf(
            _deedId
        );

        require(deedOwner == msg.sender, "error");
        /* todo: origin logic is below
        emit Debug(deedOwner, address(this));
        require(deedOwner == address(this), "error");
        */
        _;
    }

    function createAuction(
        address _deedRepositoryAddress,
        uint256 _deedId,
        string memory _auctionTitle,
        string memory _metadata,
        uint256 _startPrice,
        uint256 _blockDeadline
    )
        public
        contractIsDeedOwner(_deedRepositoryAddress, _deedId)
        returns (bool)
    {
        uint256 auctionId = auctions.length;
        Auction memory newAuction;
        newAuction.name = _auctionTitle;
        newAuction.blockDeadline = _blockDeadline;
        newAuction.startPrice = _startPrice;
        newAuction.metadata = _metadata;
        newAuction.deedId = _deedId;
        newAuction.deedRepositoryAddress = _deedRepositoryAddress;
        newAuction.owner = payable(msg.sender);
        newAuction.active = true;
        newAuction.finalized = false;

        auctions.push(newAuction);
        auctionOwner[msg.sender].push(auctionId);

        emit AuctionCreated(msg.sender, auctionId);
        return true;
    }

    event AuctionCreated(address _owner, uint256 _auctionId);
    //event Debug(address _deedOwner, address _this);
}
