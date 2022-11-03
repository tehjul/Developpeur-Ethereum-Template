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
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const address = "0x1f9C83F7311c1b0AD188E9925E2705a3B60c4b1d";

const SimpleStorage = new web3.eth.Contract(ABI, address);

SimpleStorage.methods.get().call((err, data) => {
  console.log(data);
})