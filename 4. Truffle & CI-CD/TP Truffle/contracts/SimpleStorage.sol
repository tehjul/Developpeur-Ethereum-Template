// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;

contract SimpleStorage {

    uint256 data;
    event dataStored(uint256 data);

    function set(uint256 x) public {
        require(x > 80, "value should be greater than 80");
        data = x;
        emit dataStored(x);
    }

    function get() public view returns (uint256) {
        return data;
    }
}
