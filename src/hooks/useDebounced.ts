import { useEffect, useState } from "react";

export function useDebounced<T>(value: T, delay: number) {
  const [_value, setValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(setValue, delay, value);
    return () => clearTimeout(id);
  }, [value, delay]);

  return _value;
}
