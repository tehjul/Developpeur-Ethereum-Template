// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.12;

contract Fallback {
    mapping(address => uint256) balances;

    event BadRequest(address _address);
    event SuccessDeposit(address _address, uint256 _amount);

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit SuccessDeposit(msg.sender, msg.value);
    }

    fallback() external payable {
        emit BadRequest(msg.sender);
    }

    receive() external payable {
        emit SuccessDeposit(msg.sender, msg.value);
    }
}
