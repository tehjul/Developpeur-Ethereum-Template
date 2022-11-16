import { EthProvider } from "./contexts/EthContext";
import Button from "./components/Button";
import Mint from "./components/Mint";
import Wallet from "./components/Wallet";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Wallet />
          <hr />
          <Mint />
          <hr />
          <Button />
          <hr />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
