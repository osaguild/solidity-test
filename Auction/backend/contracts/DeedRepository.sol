// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DeedRepository is ERC721URIStorage {
    constructor(string memory _name, string memory _symbol)
        public
        ERC721(_name, _symbol)
    {}

    function registerDeed(uint256 _tokenId, string memory _uri) public {
        _mint(msg.sender, _tokenId);
        addDeedMetadata(_tokenId, _uri);
        emit DeedRegistered(msg.sender, _tokenId);
    }

    function addDeedMetadata(uint256 _tokenId, string memory _uri)
        public
        returns (bool)
    {
        _setTokenURI(_tokenId, _uri);
        return true;
    }

    event DeedRegistered(address _by, uint256 _tokenId);
}
