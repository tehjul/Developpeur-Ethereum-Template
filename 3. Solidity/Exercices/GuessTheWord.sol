// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

contract GuessTheWord {
  address owner;
  address winner;
  string word;
  string clue;

  mapping(address => bool) alreadyPlayed;

  modifier onlyOwner {
    require(msg.sender == owner, "not the owner!");
    _;
  }

  modifier onlyWinned {
    require(winner != address(0), "there is no winner yet !");
    _;
  }

  constructor() {
    owner = msg.sender;
  }

  function setWord(string memory _word) external onlyOwner {
    word = _word;
  }

  function setClue(string memory _clue) external onlyOwner {
    clue = _clue;
  }

  function getClue() public view returns(string memory) {
    return clue;
  }

  function getWinner() public view onlyWinned returns(address) {
    return winner;
  }

  function propose(string memory _proposal) public {
    require(winner == address(0), "someone already found the word !");
    require(!alreadyPlayed[msg.sender], "already played !");
    alreadyPlayed[msg.sender] = true;
    if (stringsEquals(word, _proposal)) {
      winner = msg.sender;
    }
  }

  function stringsEquals(string memory _string1, string memory _string2) private pure returns(bool) {
    return keccak256(abi.encodePacked(_string1)) == keccak256(abi.encodePacked(_string2));
  }

}