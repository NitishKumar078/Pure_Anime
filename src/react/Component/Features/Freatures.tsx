import React, { useState } from "react";
import "./Features.css";

const Features = () => {
  const [active, setActive] = useState(false);

  const show = () => {
    setActive((prev) => !prev);
  };

  const checklisendmesg = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "remove_top_layer" });
      }
    });
  };

  return (
    <div>
      <button className={`collapsible ${active && "expand"}`} onClick={show}>
        Options
      </button>
      <div className={`content ${active ? "show" : ""}`}>
        <ul id="feature_list">
          <div>
            <label className="container">
              <div>
                <input type="checkbox" onClick={checklisendmesg} />
                <div className="checkmark"></div>
              </div>
              <div>
                <div id="text">Remove the top layer</div>
              </div>
            </label>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Features;
