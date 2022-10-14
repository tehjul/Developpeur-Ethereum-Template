// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

contract Notation {
    address biologyTeacher;
    address mathTeacher;
    address frTeacher;

    struct Student {
        string name;
        uint256 noteBiology;
        uint256 noteMath;
        uint256 noteFr;
    }

    modifier onlyTeacher() {
        require(
            _biologyTeacher() || _mathTeacher() || _frTeacher(),
            "not a teacher"
        );
        _;
    }

    constructor(
        address _biologyTeacherAddress,
        address _mathTeacherAddress,
        address _frTeacherAddress
    ) {
        biologyTeacher = _biologyTeacherAddress;
        mathTeacher = _mathTeacherAddress;
        frTeacher = _frTeacherAddress;
    }

    // Helpers
    function _isSameAddress(address _address) private view returns (bool) {
        return msg.sender == _address;
    }

    function _biologyTeacher() private view returns (bool) {
        return _isSameAddress(biologyTeacher);
    }

    function _mathTeacher() private view returns (bool) {
        return _isSameAddress(mathTeacher);
    }

    function _frTeacher() private view returns (bool) {
        return _isSameAddress(frTeacher);
    }
}
