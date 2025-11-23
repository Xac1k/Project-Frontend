import { useEffect } from "react";
import { useAppActions, useAppSelector } from "../../store/store";

function useKeyboardDelSlideObj() {
  const { removeSlideObjects } = useAppActions();
  const selectedObjIDs = useAppSelector((state) => state.present.selection.selectedObjectID);
  const selectedSlideIDs = useAppSelector((state) => state.present.selection.selectedSlideID);
  const slideID = selectedSlideIDs.at(-1) ?? "";

  useEffect(() => {
    const deleteObjectsHandel = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        removeSlideObjects({ slideID, slideObjArrayID: selectedObjIDs });
      }
    };
    document.addEventListener("keydown", deleteObjectsHandel);
    return () => document.removeEventListener("keydown", deleteObjectsHandel);
  }, [selectedObjIDs, slideID]);
}

export { useKeyboardDelSlideObj };
