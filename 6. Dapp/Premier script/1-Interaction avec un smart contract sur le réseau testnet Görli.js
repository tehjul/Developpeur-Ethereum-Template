const Web3 = require('web3');
const rpcUrl = 'https://goerli.infura.io/v3/323fe67904054670b15d62dac4d5b9c5';
const web3 = new Web3(rpcUrl);
const ABI = [
  {
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const address = "0xfA95935932ECcd000765C772CF8A731B1E215d06";
const SimpleStorage = new web3.eth.Contract(ABI, address);

SimpleStorage.methods.get().call((err, data) => {
  console.log(data);
})