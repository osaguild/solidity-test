// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DeedRepository.sol";

contract AuctionRepository {
    Auction[] public auctions;
    mapping(uint256 => Bid[]) public auctionBids;
    mapping(address => uint256[]) public auctionOwner;

    struct Bid {
        address payable from;
        uint256 amount;
    }

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

        require(deedOwner == address(this), "error");
        _;
    }

    function getCount() public view returns (uint256) {
        return auctions.length;
    }

    function getBidsCount(uint256 _auctionId) public view returns (uint256) {
        return auctionBids[_auctionId].length;
    }

    function getAuctionsOf(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory ownedAuctions = auctionOwner[_owner];
        return ownedAuctions;
    }

    function getCurrentBid(uint256 _auctionId)
        public
        view
        returns (uint256, address)
    {
        uint256 bidsLength = auctionBids[_auctionId].length;
        if (bidsLength > 0) {
            Bid memory lastBid = auctionBids[_auctionId][bidsLength - 1];
            return (lastBid.amount, lastBid.from);
        }
        return (uint256(0), address(0));
    }

    function getAuctionCountOfOwner(address _owner)
        public
        view
        returns (uint256)
    {
        return auctionOwner[_owner].length;
    }

    function getAuctionById(uint256 _auctionId)
        public
        view
        returns (
            string memory name,
            uint256 blockDeadline,
            uint256 startPrice,
            string memory metadata,
            uint256 deedId,
            address deedRepositoryAddress,
            address owner,
            bool active,
            bool finalized
        )
    {
        Auction memory auc = auctions[_auctionId];
        return (
            auc.name,
            auc.blockDeadline,
            auc.startPrice,
            auc.metadata,
            auc.deedId,
            auc.deedRepositoryAddress,
            auc.owner,
            auc.active,
            auc.finalized
        );
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

    function approveAndTransfer(
        address _from,
        address _to,
        address _deedRepositoryAddress,
        uint256 _deedId
    ) internal returns (bool) {
        DeedRepository remoteContract = DeedRepository(_deedRepositoryAddress);
        remoteContract.approve(_to, _deedId);
        remoteContract.transferFrom(_from, _to, _deedId);
        return true;
    }

    function cancelAuction(uint256 _auctionId) public {
        Auction memory myAuction = auctions[_auctionId];
        uint256 bidsLength = auctionBids[_auctionId].length;

        if (bidsLength > 0) {
            Bid memory lastBid = auctionBids[_auctionId][bidsLength - 1];
            lastBid.from.transfer(lastBid.amount);
            /* todo: send does not work
            if (!lastBid.from.send(lastBid.amount))
                revert("refund to last bidder is failed");
            */
        }

        if (
            approveAndTransfer(
                address(this),
                myAuction.owner,
                myAuction.deedRepositoryAddress,
                myAuction.deedId
            )
        ) {
            auctions[_auctionId].active = false;
            emit AuctionCanceled(msg.sender, _auctionId);
        }
    }

    function finalizeAuction(uint256 _auctionId) public {
        Auction memory myAuction = auctions[_auctionId];
        uint256 bidsLength = auctionBids[_auctionId].length;

        Bid memory lastBid = auctionBids[_auctionId][bidsLength - 1];

        approveAndTransfer(
            address(this),
            lastBid.from,
            myAuction.deedRepositoryAddress,
            myAuction.deedId
        );
    }

    function bidOnAuction(uint256 _auctionId) external payable {
        uint256 ethAmountSent = msg.value;
        Auction memory myAuction = auctions[_auctionId];

        if (myAuction.owner == msg.sender)
            revert("owner cannot bid on own auction");

        if (block.timestamp > myAuction.blockDeadline)
            revert("auction is expired");

        uint256 bidsLength = auctionBids[_auctionId].length;
        uint256 tempAmount = myAuction.startPrice;
        Bid memory lastBid;

        if (bidsLength > 0) {
            lastBid = auctionBids[_auctionId][bidsLength - 1];
            tempAmount = lastBid.amount;
        }

        if (ethAmountSent <= tempAmount) revert("bid amount is too low");

        if (bidsLength > 0) {
            lastBid.from.transfer(lastBid.amount);
            /* todo: send does not work
            if (!lastBid.from.send(lastBid.amount))
                revert("refund to last bidder is failed");
            */
        }

        Bid memory newBid;
        newBid.from = payable(msg.sender);
        newBid.amount = ethAmountSent;
        auctionBids[_auctionId].push(newBid);
        emit BidSuccess(msg.sender, _auctionId);
    }

    event BidSuccess(address _from, uint256 _auctionId);
    event AuctionCreated(address _owner, uint256 _auctionId);
    event AuctionCanceled(address _owner, uint256 _auctionId);
    event Debug(uint256 param1, uint256 param2);
}
