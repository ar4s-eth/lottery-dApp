// SPDX-License-Identifier: CPL-1.0

pragma solidity ^0.8.3;

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor () {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > 0.01 ether, "Minimum of 0.01 ETH required");
        
        players.push(msg.sender);
    }
}