import { useState } from "react";
import "./Counter.css";

function Counter() {
  const [counterValue, setCounterValue] = useState(0);
  const [inputValue, setInputValue] = useState(1);

  return (
    <div>
      <h3 data-testid="header">My Counter</h3>
      <h2 data-testid="counter">{counterValue}</h2>
      <button data-testid="add-btn">+</button>
      <input
        type="number"
        name=""
        value={inputValue}
        data-testid="input"
        className="text-center"
      />
      <button data-testid="subtract-btn">-</button>
    </div>
  );
}

export default Counter;
