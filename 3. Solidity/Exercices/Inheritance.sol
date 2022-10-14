// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

contract Parent {
    uint256 number;

    function setNumber(uint256 _number) public {
        number = _number;
    }
}

contract Child is Parent {
    function getParentNumber() public view returns (uint256) {
        return number;
    }
}

contract Caller {
    Child child = new Child();
    function getChildParentNumber(uint256 _newValue) public returns (uint256) {
        child.setNumber(_newValue);
        return child.getParentNumber();
    }
}
