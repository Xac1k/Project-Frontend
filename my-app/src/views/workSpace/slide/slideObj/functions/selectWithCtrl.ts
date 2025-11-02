import { dispatch } from "../../../../../store/functions";
import { setSlideObjAsSelected } from "../../../../../store/types";

function selectWithCtrl(e: React.MouseEvent<HTMLDivElement, MouseEvent>, slideObjID: string): boolean {
  if (e.ctrlKey) {
    dispatch(setSlideObjAsSelected, { slideObjID: slideObjID });
    return true;
  }
  return false;
}

export { selectWithCtrl };
