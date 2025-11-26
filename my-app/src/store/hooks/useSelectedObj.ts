import { useAppSelector } from "../store";
import { useSelectedSlideSelect } from "./useSelectedSlide";

function useSelectedObj() {
  const currSlide = useSelectedSlideSelect();
  const selectedObIDs = useAppSelector((state) => state.present.selection.selectedObjectID);
  const selectedObjects = currSlide?.slideObjects.filter((slideObj) => selectedObIDs.includes(slideObj.id));
  return selectedObjects;
}

export { useSelectedObj };
