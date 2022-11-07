import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Contract({ value, greeter }) {
  const spanEle = useRef(null);
  const [eventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState("");

  const { state: { contract } } = useEth();

  useEffect(() => {
    async function getEvents() {
      let oldEvents = await contract.getPastEvents('valueChanged', {
        fromBlock: 0,
        toBlock: 'latest'
      });
      let oldies = [];
      oldEvents.forEach(event => {
        oldies.push(event.returnValues._val + ",");
      });
      setOldEvents(oldies);

      await contract.events.valueChanged({ fromBlock: "earliest" })
        .on('data', event => {
          let lesevents = event.returnValues._val;
          setEventValue(lesevents);
        })
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log(err))
        .on('connected', str => console.log(str))
    }
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
      getEvents();
    };

  }, [value, contract]);

  return (
    <code>
      {`contract SimpleStorage {
  uint256 value = `}

      <span className="secondary-color" ref={spanEle}>
        <strong>{value}</strong>
      </span>

      {`;
  string greeter = `}

      <span className="secondary-color" ref={spanEle}>
        <strong>{greeter}</strong>
      </span>

      {`;

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }
  
  function greet() public view returns (string memory) {
    return greeter;
  }

  function setGreet(string calldata _newGreet) public {
    greeter = _newGreet;
  }
}
Events arriving: `} {eventValue} {`

Old events: `} {oldEvents}
    </code>
  );
}

export default Contract;
