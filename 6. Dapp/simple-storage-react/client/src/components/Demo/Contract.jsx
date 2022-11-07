import { useRef, useEffect } from "react";

function Contract({ value, greeter }) {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [value]);

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
}`}
    </code>
  );
}

export default Contract;
