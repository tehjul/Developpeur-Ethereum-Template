// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Saving is Ownable {

  //address admin;
  uint balance;
  uint currentDepositId;

  mapping(uint => Deposit) deposits;

  struct Deposit {
    uint timestamp;
    uint quantity;
  }

  // modifier onlyAdmin() {
  //   require(msg.sender == admin, "not the admin !");
  //   _;
  // }

  constructor() {
    //admin = msg.sender;
  }

  function getBalance() external view onlyOwner returns(uint) {
    return balance;
  }

  function deposit() public payable onlyOwner {
    require(msg.value > 0, "you can't deposit 0 !");
    balance += msg.value;
    deposits[currentDepositId] = Deposit(block.timestamp, msg.value);
    currentDepositId++;
  }

  function withdraw() external onlyOwner {
    require(deposits[0].timestamp > 0, "you must make a first deposit !");
    require(block.timestamp >= deposits[0].timestamp + 2 minutes, "you can't withdraw before 3 months after your first deposit !");
    // (bool success, ) = admin.call{value: balance}("");
    (bool success, ) = msg.sender.call{value: balance}("");
    require(success, "ETH transfer failed !");
    balance = 0;
  }

}