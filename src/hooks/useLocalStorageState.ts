import { useEffect, useState } from "react";

export const useLocalStorageState = <T>(
  key: string,
  defaultValue: T
): [T, typeof setValue] => {
  const [value, setValue] = useState(() => {
    const storedValue = global?.window?.localStorage?.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
