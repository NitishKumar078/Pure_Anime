import "../ui.css";
import { Activation } from "../../Hooks/useIcon";

const Button = () => {
  const [isActive, setIsActive] = Activation("active-status", false);

  const handleOnClickActive = () => {
    const newState = !isActive;
    setIsActive(newState);
    chrome.runtime.sendMessage({
      action: newState ? "activate" : "normal",
    });
  };

  return (
    <div className="action-button-wrapper">
      <button
        className={`modern-toggle-btn ${isActive ? "active" : ""}`}
        onClick={handleOnClickActive}
      >
        <div className="toggle-indicator"></div>
        <span className="toggle-text">{isActive ? "Enabled" : "Disabled"}</span>
      </button>
    </div>
  );
};

export default Button;
