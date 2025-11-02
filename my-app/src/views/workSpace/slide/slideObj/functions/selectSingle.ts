import { dispatch, doFunc, getNumberSelectedSlideObj } from "../../../../../store/functions";
import { clearSlideObjSelected, setSlideObjAsSelected } from "../../../../../store/types";

function selectSingle(slideObjID: string) {
  const numSlideObj = getNumberSelectedSlideObj();
  doFunc(clearSlideObjSelected, {});
  if (numSlideObj > 1) {
    dispatch(setSlideObjAsSelected, { slideObjID: slideObjID });
    return;
  }
  dispatch(setSlideObjAsSelected, { slideObjID: slideObjID });
}

export { selectSingle };
