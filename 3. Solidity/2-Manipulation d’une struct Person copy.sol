// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

contract People {
  
    struct Person {
        string name;
        uint256 age;
    }

    Person public moi;

    function modifyPerson(string calldata _name, uint256 _age) public {
        moi.name = _name;
        moi.age = _age;
    }
}
