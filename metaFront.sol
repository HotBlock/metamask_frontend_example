pragma solidity ^0.4.20;

contract MetaFront {
    address owner;
    address public user;
    
    int public num;
    
    function MetaFront() public {
        owner = msg.sender;
    }
    
    modifier isOwner {
        require(msg.sender == owner);
        _;
    }

    function setNum(int _num) public {
        num = _num;
        user = msg.sender;
    }
    
    function kill() public isOwner {
        selfdestruct(owner);
    }
    
}