// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Admin is Ownable {
    mapping(address => bool) whitelisted;
    mapping(address => bool) blacklisted;

    event Whitelisted(address _address);
    event Blacklisted(address _address);

    modifier isNotAlreadyWhitelistedOrBlaklisted(address _address) {
        require(!blacklisted[_address], "Already blacklisted");
        require(!whitelisted[_address], "Already whitelisted");
        _;
    }

    function whitelist(address _address)
        public
        onlyOwner
        isNotAlreadyWhitelistedOrBlaklisted(_address)
    {
        whitelisted[_address] = true;
        emit Whitelisted(_address);
    }

    function blacklist(address _address)
        public
        onlyOwner
        isNotAlreadyWhitelistedOrBlaklisted(_address)
    {
        blacklisted[_address] = true;
        emit Blacklisted(_address);
    }

    function isWhitelisted(address _address) public view returns (bool) {
        return whitelisted[_address];
    }

    function isBlacklisted(address _address) public view returns (bool) {
        return blacklisted[_address];
    }
}
