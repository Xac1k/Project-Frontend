import { useCallback, useEffect } from "react";
import { useAppActions } from "../../store/store";

function useUndoRedo() {
  const { undoAction, redoAction } = useAppActions();

  const checkUndoRedo = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === "Z" || e.key === "z" || e.key === "я" || e.key === "Я") && (e.ctrlKey || e.metaKey)) {
        undoAction();
      } else if ((e.key === "Y" || e.key === "y" || e.key === "н" || e.key === "Н") && (e.ctrlKey || e.metaKey)) {
        redoAction();
      }
    },
    [undoAction, redoAction],
  );

  useEffect(() => {
    window.addEventListener("keydown", checkUndoRedo);
    return () => window.removeEventListener("keydown", checkUndoRedo);
  }, [checkUndoRedo]);
}

export { useUndoRedo };
