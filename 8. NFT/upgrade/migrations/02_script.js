const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const StorageV1 = artifacts.require('Storage');
const StorageV2 = artifacts.require('Storage2');

module.exports = async function (deployer) {
  const existing = await StorageV1.deployed();
  const instance = await upgradeProxy(existing.address, StorageV2, { deployer });
  console.log('upgraded', instance.address);
}