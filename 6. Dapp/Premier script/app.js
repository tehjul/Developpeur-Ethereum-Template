const Web3 = require('web3');
const rpcUrl = 'https://goerli.infura.io/v3/323fe67904054670b15d62dac4d5b9c5';
const web3 = new Web3(rpcUrl);

web3.eth.getBalance("0x4b984D560387C22f399B76a38edabFE52903E599", (err, wei) => {
  const balance = web3.utils.fromWei(wei, 'ether');
  console.log(balance);
});