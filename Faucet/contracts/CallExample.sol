pragma solidity ^0.6.4;

contract calledContract {
    event callEvent(address sender, address origin, address from);

    function calledFunction() public {
        emit callEvent(msg.sender, tx.origin, address(this));
    }
}

library calledLibrary {
    event callEvent(address sender, address origin, address from);

    function calledFunction() public {
        emit callEvent(msg.sender, tx.origin, address(this));
    }
}

contract caller {
    function make_calls(calledContract _calledContract) public {
        // Calling calledContract and calledLibrary directry
        _calledContract.calledFunction();
        calledLibrary.calledFunction();

        // Low-Level calls using the address object for calledContract
        (bool success_call,) = address(_calledContract).call(abi.encodeWithSignature("calledFunction()"));
        (bool success_delegatecall,) = address(_calledContract).delegatecall(abi.encodeWithSignature("calledFunction()"));
        require(success_call);
        require(success_delegatecall);
    }
}
