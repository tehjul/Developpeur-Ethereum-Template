const DeFiProject = artifacts.require("DeFiProject");

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(DeFiProject, "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60");
}