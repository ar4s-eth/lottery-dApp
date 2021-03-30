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

  function pseudoRandom() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
  }

  function pickWinner() public {
      uint index = pseudoRandom() % players.length;
      payable(players[index]).transfer(address(this).balance);
  }
}

// add chainlink random number generation