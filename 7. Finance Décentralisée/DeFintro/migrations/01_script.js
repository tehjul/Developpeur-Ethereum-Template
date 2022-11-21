const Dai = artifacts.require("Dai");
const DeFiProject = artifacts.require("DeFiProject");

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(Dai);
  const dai = await Dai.deployed();

  await deployer.deploy(DeFiProject, dai.address);
  const defiProject = await DeFiProject.deployed();

  await dai.faucet(defiProject.address, 100);
  const balance00 = await dai.balanceOf(defiProject.address);
  console.log(balance00.toString());

  await defiProject.foo(accounts[0], 100);

  const balance0 = await dai.balanceOf(defiProject.address);
  const balance1 = await dai.balanceOf(accounts[0]);

  console.log(balance0.toString());
  console.log(balance1.toString());
}