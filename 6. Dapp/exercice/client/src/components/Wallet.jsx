import { useState, useEffect } from "react";
import { useEth } from "../contexts/EthContext";

function Wallet() {
  const { state: { accounts, contract, web3 } } = useEth();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      const balance = await contract.methods.balanceOf(accounts[0]).call();
      let bal = web3.utils.fromWei(balance, 'ether');
      setBalance(bal);
    };
    getBalance();
  }, [accounts, contract, web3])

  return (
    <>
      {accounts ?
        <h4>
          Connected with wallet {accounts[0]}
          {balance > 0 && <p>Balance : {balance} BEER</p>}
        </h4>
        :
        <h4>
          Not connected
        </h4>
      }
    </>
  )
}

export default Wallet;