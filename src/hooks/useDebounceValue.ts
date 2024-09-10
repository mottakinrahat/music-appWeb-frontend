// import { useEffect, useState } from "react";

// export const useDebouncedValue = (value: number, delay: number) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);

//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debouncedValue;
// };
import { useEffect, useState } from "react";

export const useDebouncedValue = (value: number, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout on value or delay change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // Return both the immediate value and the debounced value
  return [value, debouncedValue] as const;
};
