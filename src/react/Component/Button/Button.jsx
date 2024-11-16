import React from "react";
import "./Button.css";
import useIcon from "../Hooks/useIcon";

const Button = () => {
  const { icon, toggleIcon } = useIcon(); // Access and update the icon state

  return (
    <button className="tigger-button" onClick={toggleIcon}>
      {icon ? "Deactivated" : "Activated"}
    </button>
  );
};

export default Button;
