import { useState, useEffect } from "react";

const useIcon = () => {
  const [icon, setIcon] = useState(false);

  // Load the icon state from local storage on mount
  useEffect(() => {
    const storedIcon = localStorage.getItem("icon");
    setIcon(storedIcon === "true");
  }, []);

  // Function to toggle icon and update local storage
  const toggleIcon = async () => {
    const newState = !icon;
    setIcon(newState);
    localStorage.setItem("icon", newState.toString());
    // Communicate with the Chrome extension
    await chrome.runtime.sendMessage({
      action: newState ? "set-active" : "set-normal",
    });
  };

  return { icon, toggleIcon };
};

export default useIcon;
