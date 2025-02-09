// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  uint256 value;
  string greeter;

  event valueChanged(uint _val);

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    require(newValue != 5, "error msg");
    value = newValue;
    emit valueChanged(newValue);
  }

  function greet() public view returns (string memory) {
    return greeter;
  }

  function setGreet(string calldata _newGreet) public {
    greeter = _newGreet;
  }
}
