import { canSelect } from "../../../../../store/Validation";
import type { StateWorkZone } from "../../../src/WorkSpace";
import { selectSingle } from "./selectSingle";
import { selectWithCtrl } from "./selectWithCtrl";

function getHandlerForSelect(
  slideObjID: string,
  type: "image" | "text",
  stateWorkZone: React.RefObject<StateWorkZone>,
): (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void {
  let onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

  switch (type) {
    case "text":
      onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!canSelect(stateWorkZone)) return;
        //TODO Сделать обработку для того чтобы текст можно было редактировать
        if (selectWithCtrl(e, slideObjID)) {
        } else selectSingle(slideObjID);
      };
      return onMouseDown;

    case "image":
      onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!canSelect(stateWorkZone)) return;
        if (selectWithCtrl(e, slideObjID)) {
        } else selectSingle(slideObjID);
      };
      return onMouseDown;
  }
}

export { getHandlerForSelect };
