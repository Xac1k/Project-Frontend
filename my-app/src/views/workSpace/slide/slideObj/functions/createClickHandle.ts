import { canSelect } from "../../../../../store/Validation";
import type { StateWorkZone } from "../../../src/WorkSpace";
import { selectSingle } from "./selectSingle";
import { selectWithCtrl } from "./selectWithCtrl";
import { setAsEditable } from "./setAsEditable";

type createClickHandleSlideObjProps = {
  slideID: string;
  slideObjID: string;
  type: "img" | "text";
  stateWorkZone: React.RefObject<StateWorkZone>;
};

function createClickHandle({ slideID, slideObjID, type, stateWorkZone }: createClickHandleSlideObjProps): {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
} {
  let clickTimeout: number | null = null;
  const nullTimeout = () => {
    if (clickTimeout) clearTimeout(clickTimeout);
    clickTimeout = null;
  };
  let onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

  switch (type) {
    case "text":
      onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const waiting = 200;
        if (clickTimeout != null) {
          setAsEditable(slideID, slideObjID, e, nullTimeout, stateWorkZone);
        } else {
          if (!canSelect(stateWorkZone)) return;
          clickTimeout = setTimeout(() => {
            if (selectWithCtrl(slideObjID)) {
            } else selectSingle(slideObjID);
            nullTimeout();
          }, waiting);
        }
      };
      return { onClick };

    case "img":
      onClick = () => {
        if (!canSelect(stateWorkZone)) return;
        if (selectWithCtrl(slideObjID)) {
        } else selectSingle(slideObjID);
      };
      return { onClick };
  }
}

export { createClickHandle };
