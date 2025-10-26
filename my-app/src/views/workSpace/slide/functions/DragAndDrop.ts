import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { dispatch, doFunc, getNumberSelectedSlideObj, getSlideObjState } from "../../../../store/functions";
import { clearSlideObjSelected, displaceSlideObj, setSlideObjAsSelected } from "../../../../store/types";
import type { StateWorkZone } from "../../src/WorkSpace";

function setFocusIfNotingSelected(div: HTMLDivElement | null) {
  if (!div) return;
  if (getNumberSelectedSlideObj() == 0) {
    dispatch(setSlideObjAsSelected, { slideObjID: div.id.split("-")[1] });
  }
}

function setFocusIfAnotherObjIsSelected(div: HTMLDivElement | null) {
  if (!div) return;
  const id = div.id.split("-")[1];
  if (!getSlideObjState(id)) {
    doFunc(clearSlideObjSelected, {});
    dispatch(setSlideObjAsSelected, { slideObjID: id });
  }
}

function setGrabingCursor(div: HTMLDivElement | null) {
  if (!div) return;
  div.style.cursor = "grabbing";
}

function setGrabCursor(div: HTMLDivElement | null) {
  if (!div) return;
  div.style.cursor = "grab";
}

type createDragAndDropHandleProps = {
  slideID: string;
  selectedObjID: string[];
  stateWorkZone: React.RefObject<StateWorkZone>;
};
function useDnD({ slideID, selectedObjID, stateWorkZone }: createDragAndDropHandleProps) {
  const [shiftSelectedObj, setShiftSelectedObj] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stateWorkZone.current.edit) {
      initialPosition.current = { x: e.clientX, y: e.clientY };
      stateWorkZone.current.stateDnD.isStarted = true;
      ((stateWorkZone.current.stateDnD.target = e.currentTarget), setGrabingCursor(stateWorkZone.current.stateDnD.target));
    }
  };

  const onMouseUp = useCallback(()=> {

  }, [selectedObjID])

  useEffect(() => {
    console.log("Смена");
    const onMouseMove = (e: MouseEvent) => {
      if (stateWorkZone.current.stateDnD.isStarted) {
        setFocusIfNotingSelected(stateWorkZone.current.stateDnD.target);
        setFocusIfAnotherObjIsSelected(stateWorkZone.current.stateDnD.target);
        const shift = { x: e.clientX - initialPosition.current.x, y: e.clientY - initialPosition.current.y };
        setShiftSelectedObj(shift);
        stateWorkZone.current.stateDnD.isMoving = true;
      }
    };
    const onMouseUp = () => {
      if (stateWorkZone.current.stateDnD.isMoving) {
        doFunc(displaceSlideObj, { slideID: slideID, slideObjectsID: selectedObjID, shift: shiftSelectedObj });
        setShiftSelectedObj({ x: 0, y: 0 });
        stateWorkZone.current.stateDnD.isEnd = true;
        setTimeout(() => {
          stateWorkZone.current.stateDnD.isEnd = false;
        }, 100);
      }
      stateWorkZone.current.stateDnD.isStarted = false;
      stateWorkZone.current.stateDnD.isMoving = false;
      setGrabCursor(stateWorkZone.current.stateDnD.target);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [selectedObjID]);

  return {
    onMouseDown,
    shiftSelectedObj,
  };
}

export { useDnD };
