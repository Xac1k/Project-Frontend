import { useCallback } from "react";

function useDebouncedFunc(func: () => void, timeout: number) {
  let timer: number;

  const DebouncedFunc = useCallback(() => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, timeout);
  }, [func, timeout]);

  return DebouncedFunc;
}

export { useDebouncedFunc };
