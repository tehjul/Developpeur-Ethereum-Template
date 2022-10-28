pragma solidity 0.8.9;

contract auction {
    address highestBidder;
    uint256 highestBid;

    function bid() public payable {
        require(msg.value >= highestBid);

        if (highestBidder != address(0)) {
            (bool success, ) = highestBidder.call{value: highestBid}("");
            require(success); // if this call consistently fails, no one else can bid
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }
}

contract SafeAuction {
    address highestBidder;
    uint256 highestBid;

    mapping(address => uint) redeemable;

    function bid() public payable {
        require(msg.value >= highestBid);

        if (highestBidder != address(0)) {
            redeemable[msg.sender] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }

    function redeem() external {
      require(redeemable[msg.sender] > 0, "nothing to redeem");
      uint refund = redeemable[msg.sender];
      redeemable[msg.sender] = 0;
      (bool success, ) = msg.sender.call{value: refund}("");
      require(success);
    }
}
