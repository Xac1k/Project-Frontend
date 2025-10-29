import type { Picture, TextPlain } from "./types";
import type { SizeData } from "../views/workSpace/slide/functions/DragAndDropSize";

function computeSizeAndPosition(dataSize: SizeData, slideObj: TextPlain | Picture) {
  let scaleX: number, scaleY: number, newObjectData: { x: number; y: number; w: number; h: number };
  const bounds = dataSize.bndRect.current;
  const delta = dataSize.addSizeMarkedObj;
  let isLeft: number = 0,
    isTop: number = 0;
  scaleX = (bounds.w + delta.w) / bounds.w;
  scaleY = (bounds.h + delta.h) / bounds.h;

  switch (dataSize.side.current) {
    case "down-left":
    case "left":
      isLeft = 1;
      break;
    case "down-right":
    case "right":
    case "down":
      break;
    case "up-right":
    case "top":
      isTop = 1;
      break;
    case "up-left":
      isLeft = 1;
      isTop = 1;
      break;
    case "none":
      return { x: slideObj.x, y: slideObj.y, w: slideObj.w, h: slideObj.h };
  }

  newObjectData = {
    x: bounds.x + (slideObj.x - bounds.x) * scaleX + delta.x * isLeft,
    y: bounds.y + (slideObj.y - bounds.y) * scaleY + delta.y * isTop,

    w: slideObj.w * scaleX,
    h: slideObj.h * scaleY,
  };
  return newObjectData;
}

export { computeSizeAndPosition };
