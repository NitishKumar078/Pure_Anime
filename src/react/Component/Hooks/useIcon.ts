import { useState } from "react";

export function Activation<T>(key: string, intialstate: T) {
  const [isactivated, setisactivated] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : intialstate;
  });

  // Function to toggle activation and update local storage
  return [isactivated, setisactivated] as const;
}
