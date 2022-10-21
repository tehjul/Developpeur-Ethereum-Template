const MyToken = artifacts.require("MyToken");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract("MyToken", accounts => {

  const _name = "Alyra";
  const _symbol = "ALY";
  const _initialSupply = new BN(10000);
  const _decimal = new BN(18);

  const _owner = accounts[0];
  const _user = accounts[1];

  let MyTokenInstance;

  beforeEach(async function () {
    MyTokenInstance = await MyToken.new(_initialSupply, { from: _owner });
  });

  it("has a name", async () => {
    expect(await MyTokenInstance.name()).to.equal(_name);
  });

  it("has a symbol", async () => {
    expect(await MyTokenInstance.symbol()).to.equal(_symbol);
  });

  it("has a decimal", async () => {
    expect(await MyTokenInstance.decimals()).to.be.bignumber.equal(_decimal);
  });

  it("check first balance", async () => {
    expect(await MyTokenInstance.balanceOf(_owner)).to.be.bignumber.equal(_initialSupply);
  });

  it("check balance after transfer", async () => {
    let amount = new BN(100);
    let ownerBalanceBeforeTransfer = await MyTokenInstance.balanceOf(_owner);
    let userBalanceBeforeTransfer = await MyTokenInstance.balanceOf(_user);
    expect(userBalanceBeforeTransfer).to.be.bignumber.equal(new BN(0));

    await MyTokenInstance.transfer(_user, amount, { from: _owner });

    let ownerBalanceAfterTransfer = await MyTokenInstance.balanceOf(_owner);
    let userBalanceAfterTransfer = await MyTokenInstance.balanceOf(_user);
    expect(ownerBalanceAfterTransfer).to.be.bignumber.equal(ownerBalanceBeforeTransfer.sub(amount));
    expect(userBalanceAfterTransfer).to.be.bignumber.equal(amount);
  });

  // approve (allowance)
  it("check approve", async () => {
    let amount = new BN(50);
    expect(await MyTokenInstance.allowance(_user, _owner)).to.be.bignumber.equal(new BN(0));
    await MyTokenInstance.approve(_owner, amount, { from: _user });
    expect(await MyTokenInstance.allowance(_user, _owner)).to.be.bignumber.equal(amount);
  });

  // transferFrom
  it("check transferFrom", async () => {
    let amount = new BN(50);
    await MyTokenInstance.approve(_user, amount);
    let ownerBalanceBeforeTransfer = await MyTokenInstance.balanceOf(_owner);
    let userBalanceBeforeTransfer = await MyTokenInstance.balanceOf(_user);
    expect(userBalanceBeforeTransfer).to.be.bignumber.equal(new BN(0));
    expect(ownerBalanceBeforeTransfer).to.be.bignumber.equal(new BN(10000));
    await MyTokenInstance.transferFrom(_owner, _user, amount, {from: _user});

    let ownerBalanceAfterTransfer = await MyTokenInstance.balanceOf(_owner);
    let userBalanceAfterTransfer = await MyTokenInstance.balanceOf(_user);
    expect(ownerBalanceAfterTransfer).to.be.bignumber.equal(ownerBalanceBeforeTransfer.sub(amount));
    expect(userBalanceAfterTransfer).to.be.bignumber.equal(amount);
  });

})