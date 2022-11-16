import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";

function Button() {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const mint = async () => {
    await contract.methods.mint(inputValue).send({ from: accounts[0] });
  };

  return (
    <div className="mint">
      <input
        type="text"
        placeholder="amount"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={mint} className="input-btn">
        mint BEER
      </button>
    </div>
  );
}

export default Button;
