import type React from "react";
import { type SlideObj } from "../../../../store/types";
import { useCallback, useRef, useState } from "react";
import { getLastSelectedSlideID, recomputeSizeSlideObjects } from "../../../../store/functions";
import type { StateWorkZone } from "../../src/WorkSpace";
import { emptyRect } from "../../../../store/constant";
import type { Rect, Vector } from "../../../../store/typesView";
import { useDragAndDropDummy } from "./DragAndDrop";
import { canResize } from "../../../../store/Validation";
export type Side = "left" | "down" | "top" | "right" | "up-right" | "up-left" | "down-right" | "down-left" | "none";

function getCoeficientsForSizeShift(side: string): Rect {
  let shiftCoef: Rect = emptyRect;
  switch (side) {
    case "down-left":
      shiftCoef = { x: 1, y: 0, w: -1, h: 1 };
      break;
    case "left":
      shiftCoef = { x: 1, y: 0, w: -1, h: 0 };
      break;
    case "down-right":
      shiftCoef = { x: 0, y: 0, w: 1, h: 1 };
      break;
    case "right":
      shiftCoef = { x: 0, y: 0, w: 1, h: 0 };
      break;
    case "down":
      shiftCoef = { x: 0, y: 0, w: 0, h: 1 };
      break;
    case "up-right":
      shiftCoef = { x: 0, y: 1, w: 1, h: -1 };
      break;
    case "top":
      shiftCoef = { x: 0, y: 1, w: 0, h: -1 };
      break;
    case "up-left":
      shiftCoef = { x: 1, y: 1, w: -1, h: -1 };
      break;
  }

  return shiftCoef;
}

export type SizeData = {
  addSizeMarkedObj: Rect;
  bndRect: React.RefObject<Rect>;
  side: React.RefObject<string>;
};

type useReSizeProps = {
  stateWorkZone: React.RefObject<StateWorkZone>;
  selectedSlideObjects: SlideObj[];
};
function useReSize({ stateWorkZone, selectedSlideObjects }: useReSizeProps) {
  const [deltaSize, setDeltaSize] = useState<Rect>(emptyRect);
  const initialPosition = useRef<Vector>({ x: 0, y: 0 });
  const side = useRef<string>("none");

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    initialPosition.current = { x: e.clientX, y: e.clientY };
    side.current = e.currentTarget.id;
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const newDelta = { x: e.clientX - initialPosition.current.x, y: e.clientY - initialPosition.current.y };
    const sign = getCoeficientsForSizeShift(side.current);
    setDeltaSize({
      x: newDelta.x * sign.x,
      y: newDelta.y * sign.y,
      w: newDelta.x * sign.w,
      h: newDelta.y * sign.h,
    });
  }, []);

  const onMouseUp = useCallback(() => {
    if (canResize(stateWorkZone)) {
      recomputeSizeSlideObjects(deltaSize, side, selectedSlideObjects, getLastSelectedSlideID());
    }
    setDeltaSize(emptyRect);
  }, [deltaSize]);

  const handlerInitResize = useDragAndDropDummy({ onMouseDown, onMouseMove, onMouseUp });

  return { deltaSize, handlerInitResize };
}

export { useReSize };
