import { dispatch, getLastSelectedSlideID } from "../../../../../store/functions";
import { setContent } from "../../../../../store/types";
import type { StateWorkZone } from "../../../src/WorkSpace";

function setAsEditable(slideObjID: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>, stateWorkZone: React.RefObject<StateWorkZone>) {
  stateWorkZone.current.edit = true;
  dispatch(setContent, { slideID: getLastSelectedSlideID(), slideObjID: slideObjID, text: e.currentTarget?.textContent });
  e.currentTarget?.setAttribute("contenteditable", "true");
  e.currentTarget.style.cursor = "text";
  let wasChanged: boolean = false;

  e.currentTarget.oninput = () => {
    wasChanged = true;
  };

  e.currentTarget.onblur = (event: Event) => {
    if (stateWorkZone) {
      stateWorkZone.current.edit = false;
    }
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.setAttribute("contenteditable", "false");
      event.currentTarget.style.cursor = "grab";
      if (wasChanged) {
        dispatch(setContent, { slideID: getLastSelectedSlideID(), slideObjID: slideObjID, text: event.currentTarget.textContent });
      }
    }
  };
}

export { setAsEditable };
