import { useState } from 'react';

const useDebounce = (func, timeout = 500) => {
  const [debounced, setDebounced] = useState(null);
  return () => {
    if (debounced) {
      clearTimeout(debounced);
    }

    setDebounced(setTimeout(func, timeout));
  }
}

export default useDebounce;
