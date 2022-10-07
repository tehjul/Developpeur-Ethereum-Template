// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

contract Whitelist {
    mapping(address => bool) whitelist;

    event Authorized(address _address);

    constructor() {
        whitelist[msg.sender] = true;
    }

    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "Not whitelisted");
        _;
    }

    function authorize(address _address) public onlyWhitelisted {
        whitelist[_address] = true;
        emit Authorized(_address);
    }
}
