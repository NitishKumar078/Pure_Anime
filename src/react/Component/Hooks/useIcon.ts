import { useEffect, useState } from "react";
import { getItem, setItem } from "../utils/LocalStorage";

export function Activation<T>(key: string, intialstate: T) {
  const [isactivated, setisactivated] = useState(() => {
    const storedValue = getItem(key);
    return (storedValue as T) || intialstate;
  });

  useEffect(() => {
    setItem(key, isactivated);
  }, [isactivated]);

  // Function to toggle activation and update local storage
  return [isactivated, setisactivated] as const;
}
