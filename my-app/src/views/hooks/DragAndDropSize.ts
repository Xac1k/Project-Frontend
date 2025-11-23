import type React from "react";
import { useCallback, useRef, useState } from "react";
import { computeSizeAndPosition, getBoundingRect } from "../../store/functions";
import { emptyRect } from "../../store/constant";
import type { Rect, Vector } from "../../store/typesView";
import { useDragAndDropDummy } from "./DragAndDrop";
import { useAppActions, useAppSelector } from "../../store/store";
import type { SetSizeAndPositionProps } from "../../store/types";
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

function useReSize() {
  const slides = useAppSelector((state) => state.present.slides);
  const selectedObjIDs = useAppSelector((state) => state.present.selection.selectedObjectID);
  const selectedIDs = useAppSelector((state) => state.present.selection.selectedSlideID);
  const currSlide = slides.filter((slide) => selectedIDs.includes(slide.id)).at(-1);
  const [deltaSize, setDeltaSize] = useState<Rect>(emptyRect);
  const initialPosition = useRef<Vector>({ x: 0, y: 0 });
  const side = useRef<string>("none");
  const { setSizeAndPositionArray } = useAppActions();

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
    if (!currSlide) return;
    const selectedSlideObjectsData = currSlide.slideObjects.filter((slide) => selectedObjIDs.includes(slide.id));
    const boundingRect = getBoundingRect(selectedSlideObjectsData);
    const payloads: SetSizeAndPositionProps[] = [];
    selectedSlideObjectsData.forEach((slideObj) => {
      const newSize = computeSizeAndPosition(boundingRect, deltaSize, slideObj, side.current);
      payloads.push({ slideObjID: slideObj.id, ...newSize });
    });
    setSizeAndPositionArray({ slideID: currSlide.id, payloads: payloads });
    setDeltaSize(emptyRect);
  }, [deltaSize, currSlide]);

  const handlerInitResize = useDragAndDropDummy({ onMouseDown, onMouseMove, onMouseUp });

  return { deltaSize, handlerInitResize };
}

export { useReSize };
