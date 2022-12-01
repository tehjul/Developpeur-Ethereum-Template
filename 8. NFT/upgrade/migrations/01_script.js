const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const StorageV1 = artifacts.require('Storage');

module.exports = async function (deployer) {
  const instance = await deployProxy(StorageV1, [3], { deployer, initializer: 'store' });
  console.log('Deployed', instance.address);
}