const Chainlink1 = artifacts.require("Chainlink1");

module.exports = async (deployer) => {
  await deployer.deploy(Chainlink1);
}