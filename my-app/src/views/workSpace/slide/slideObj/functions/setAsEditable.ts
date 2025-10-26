import { dispatch, doFunc } from "../../../../../store/functions";
import { setContent } from "../../../../../store/types";
import type { StateWorkZone } from "../../src/Slide";

function setAsEditable(
  slideID: string,
  slideObjID: string,
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  nullTimeout: () => void,
  stateWorkZone?: React.RefObject<StateWorkZone>,
) {
  if (stateWorkZone) {
    stateWorkZone.current.edit = true;
  }
  nullTimeout();
  dispatch(setContent, { slideID: slideID, slideObjID: slideObjID, text: e.currentTarget?.textContent });
  e.currentTarget?.setAttribute("contenteditable", "true");
  console.log(e.currentTarget);
  e.currentTarget?.focus();
  e.currentTarget.oninput = (event: Event) => {
    if (event.currentTarget instanceof HTMLElement)
      doFunc(setContent, { slideID: slideID, slideObjID: slideObjID, text: event.currentTarget?.textContent });
  };
  e.currentTarget.onblur = (event: Event) => {
    if (event.currentTarget instanceof HTMLElement) event.currentTarget?.setAttribute("contenteditable", "false");
    if (stateWorkZone) {
      stateWorkZone.current.edit = false;
    }
  };
}

export { setAsEditable };
