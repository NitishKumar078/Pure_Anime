import React from "react";
import "./Button.css";
import { Activation } from "../Hooks/useIcon";

const Button = () => {
  const [isactive, setisactive] = Activation("active-status", false);

  const handleonclick_active = async () => {
    const newState = !isactive;
    setisactive(newState);
    await chrome.runtime.sendMessage({
      action: newState ? "activate" : "normal",
    });
  };

  return (
    <button className="tigger-button" onClick={handleonclick_active}>
      {isactive ? "Deactivated" : "Activated"}
    </button>
  );
};

export default Button;
