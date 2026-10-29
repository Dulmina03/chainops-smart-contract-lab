// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.34;

contract SimpleVoting {
 mapping(address => bool) public hasVoted;
  uint256[2] public voteCounts;
  function vote(uint256 candidateId) external {
  require(candidateId < 2, "Invalid candidate");
}
}