const SimpleStorage = artifacts.require("SimpleStorage");
const {BN, expectRevert, expectEvent} = require('@openzeppelin/test-helpers');
const {expect} = require('chai');

contract("SimpleStorage", accounts => {

  let owner = accounts[0];
  let simpleStorageInstance

  beforeEach(async function () {
    simpleStorageInstance = await SimpleStorage.deployed();
  })

  it("...should store the value 89.", async () => {
    // Set value of 89
    // transaction renvoie des logs
    await simpleStorageInstance.set(89, { from: owner });
    // Get stored value
    const storedData = await simpleStorageInstance.get.call();
    // assert.equal(storedData, 89, "The value 89 was not stored.");
    expect(storedData).to.be.bignumber.equal(BN(89));
  });

  it("...should not store a value lower than 80", async () => {
    await expectRevert(simpleStorageInstance.set(BN(79), { from: owner }), "value should be greater than 80");
  });

  it("...should emit an event", async () => {
    const transaction = await simpleStorageInstance.set(BN(90), { from: owner });
    expectEvent(transaction, "dataStored", {data: BN(90)});
  });
  
  // expect(storedData).to.be.bignumber.equal(new BN(89));
  // await expectRevert(ContractInstance.namefunction(param, {from: owner}), "message de revert");
  // expectEvent(uneTX, "nameEvent", {_param1: value1, _param2: value2});
  // console.log("Salut, ceci est un log :" + uneVariable);

});