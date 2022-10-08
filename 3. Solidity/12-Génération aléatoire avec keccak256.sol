// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

contract Random {
    uint256 private nonce;

    function random() public returns (uint256) {
      nonce++;
      return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % 100;
    }
}
