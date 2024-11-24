import "../ui.css";
import { Activation } from "../../Hooks/useIcon";

const Button = () => {
  const [isActive, setIsActive] = Activation("active-status", false);

  const handleOnClickActive = async () => {
    const newState = !isActive;
    setIsActive(newState);
    await chrome.runtime.sendMessage({
      action: newState ? "activate" : "normal",
    });
  };

  return (
    <div>
      <button
        className={`button ${isActive && "active"}`}
        onClick={handleOnClickActive}
      >
        <span className="button_lg">
          <span className="button_sl"></span>
          <span className="button_text">
            {isActive ? "Deactivate" : "Activated"}
          </span>
        </span>
      </button>
    </div>
  );
};

export default Button;
