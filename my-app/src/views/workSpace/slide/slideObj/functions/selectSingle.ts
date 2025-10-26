import { dispatch, doFunc, getNumberSelectedSlideObj, getSlideObjState } from "../../../../../store/functions";
import { clearSlideObjSelected, setSlideObjAsSelected, setSlideObjAsUnselected } from "../../../../../store/types";

function selectSingle(slideObjID: string) {
  const state = getSlideObjState(slideObjID);
  const numSlideObj = getNumberSelectedSlideObj();
  doFunc(clearSlideObjSelected, {});
  if (numSlideObj > 1) {
    dispatch(setSlideObjAsSelected, { slideObjID: slideObjID });
    return;
  }
  if (state) {
    dispatch(setSlideObjAsUnselected, { slideObjID: slideObjID });
  } else {
    dispatch(setSlideObjAsSelected, { slideObjID: slideObjID });
  }
}

export { selectSingle };
