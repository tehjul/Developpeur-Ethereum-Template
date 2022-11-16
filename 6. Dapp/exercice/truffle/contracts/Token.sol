// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("Beer Token", "BEER") {
        // _mint(msg.sender, 1000 * 10**18);
    }

    function mint(uint256 _amount) external {
        _mint(msg.sender, _amount * 10**18);
    }
}
