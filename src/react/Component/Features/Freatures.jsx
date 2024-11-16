import React, { useState } from "react";
import "./Features.css";

const Features = () => {
  const [active, setActive] = useState(false);

  const show = () => {
    setActive((prev) => !prev);
  };

  return (
    <div>
      <button
        className={`collapsible ${active ? "active" : ""}`}
        onClick={show}
      >
        {active ? "Close Section 1" : "Open Section 1"}
      </button>
      <div className={`content ${active ? "show" : ""}`}>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
