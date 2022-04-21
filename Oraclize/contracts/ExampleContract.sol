pragma solidity >= 0.5.0 < 0.6.0;

import "provable-eth-api/provableAPI_0.5.sol";

contract ExampleContract is usingProvable {

  string public ETHUSD;
  event LogConstructorInitiated(string nextStep);
  event LogPriceUpdated(string price);
  event LogNewProvableQuery(string description);

  constructor() public payable {
    emit LogConstructorInitiated("constructor was initiated. call updatePrice() to send the provable query");
  }

  function __callback(bytes32 _myid, string memory _result) public {
    if (msg.sender != provable_cbAddress()) revert();
    ETHUSD = _result;
    emit LogPriceUpdated(_result);
  }

  function updatePrice() public payable {
    if (provable_getPrice("URL") > address(this).balance) {
      emit LogNewProvableQuery("provable query was Not sent, Please add some ETH to cover for the query fee");
    } else {
      emit LogNewProvableQuery("provable query was sent, standing by for the answer..");
      provable_query("URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
    }
  }
}