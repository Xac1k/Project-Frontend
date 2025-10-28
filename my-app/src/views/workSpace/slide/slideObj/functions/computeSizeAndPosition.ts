import type { Picture, TextPlain } from "../../../../../store/types";
import type { SizeData } from "../../functions/DragAndDropSize";

function computeSizeAndPosition(dataSize: SizeData, slideObj: TextPlain | Picture) {
  let scaleX: number, scaleY: number, newObjectData: { x: number; y: number; w: number; h: number };
  const bounds = dataSize.bndRect.current;
  const delta = dataSize.addSizeMarkedObj;
  switch (dataSize.side.current) {
    case "right":
    case "down":
      scaleX = (bounds.w + delta.w) / bounds.w;
      scaleY = (bounds.h + delta.h) / bounds.h;

      newObjectData = {
        x: bounds.x + (slideObj.x - bounds.x) * scaleX,
        y: bounds.y + (slideObj.y - bounds.y) * scaleY,

        w: slideObj.w * scaleX,
        h: slideObj.h * scaleY,
      };
      return newObjectData;
    case "top":
    case "left":
      scaleX = (bounds.w + delta.w) / bounds.w;
      scaleY = (bounds.h + delta.h) / bounds.h;
      console.log(scaleX, scaleY);

      newObjectData = {
        x: bounds.x + (slideObj.x - bounds.x) * scaleX + delta.x,
        y: bounds.y + (slideObj.y - bounds.y) * scaleY + delta.y,

        w: slideObj.w * scaleX,
        h: slideObj.h * scaleY,
      };
      return newObjectData;
    default:
      return { x: slideObj.x, y: slideObj.y, w: slideObj.w, h: slideObj.h };
  }
}

export { computeSizeAndPosition };
