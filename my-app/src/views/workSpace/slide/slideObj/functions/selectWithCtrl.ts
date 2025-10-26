import { dispatch, getSlideObjState } from "../../../../../store/functions";
import { getHotKey } from "../../../../../store/HotKey";
import { setSlideObjAsSelected, setSlideObjAsUnselected } from "../../../../../store/types";

function selectWithCtrl(slideObjID: string): boolean {
  if (getHotKey(['Control'])) {
    if (getSlideObjState(slideObjID)) {
      dispatch(setSlideObjAsUnselected, {slideObjID: slideObjID})
    }
    else {
      dispatch(setSlideObjAsSelected, {slideObjID: slideObjID})
    }
    return true;
  }
  return false;
}

export {
    selectWithCtrl
}