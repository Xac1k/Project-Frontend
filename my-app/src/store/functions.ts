import { setSizeAndPositionArray, type ModifyFunction, type Picture, type Presentation, type SlideObj, type TextPlain } from "./types";
import { dataJSON } from "./PresentationMax";
import type { Rect } from "./typesView";
import { emptyRect } from "./constant";
export let presentation: Presentation = dataJSON;
let EditorChangeHandler: () => void;

function getUniqID(): string {
  const uniqID: string = Date.now().toString(36) + Math.random().toString(36);
  return uniqID;
}

function dispatch(modifyfn: ModifyFunction, payload: Object) {
  const newState = modifyfn(presentation, payload); //  принимаем payload как объект по типу пропса
  setEditor(newState);
  if (EditorChangeHandler) {
    EditorChangeHandler();
  }
}

function doFunc(modifyfn: ModifyFunction, payload: Object) {
  const newState = modifyfn(presentation, payload); //  принимаем payload как объект по типу пропса
  setEditor(newState);
}

function addEditorChangeHandler(handler: () => void) {
  EditorChangeHandler = handler;
}

function setEditor(newState: Presentation) {
  presentation = newState;
}

function getEditor() {
  return presentation;
}

//Узнать выделен ли Слайд
function getSlideState(slideID: string): boolean {
  const slideArrayID = getEditor().selection.selectedSlideID.find((slide) => slide === slideID);
  return slideArrayID != undefined;
}

//Узнать выделен ли Слайд
function getSlideObjState(slideObjID: string): boolean {
  const slideArrayID = getEditor().selection.selectedObjectID.find((slideObj) => slideObj === slideObjID);
  return slideArrayID != undefined;
}

function getFirtsSlideID(): string {
  const presentation = getEditor();
  const firstSlideID = presentation.slides[0].id;

  return firstSlideID;
}

function getLastSelectedSlideID(): string {
  const presentation = getEditor();
  const lastArrayID = presentation.selection.selectedSlideID.length - 1;
  const lastSlideID = presentation.selection.selectedSlideID[lastArrayID];

  return lastSlideID;
}

function getNumberSelectedSlide(): number {
  const presentation = getEditor();
  const lenSlideSelection = presentation.selection.selectedSlideID.length;

  return lenSlideSelection;
}

function getNumberSelectedSlideObj(): number {
  const presentation = getEditor();
  const lenSlideObjSelection = presentation.selection.selectedObjectID.length;

  return lenSlideObjSelection;
}

function getNextSlideID(curSlideID: string): string | undefined {
  const presentation = getEditor();
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id === curSlideID);
  if (slideArrayID == -1) {
    return undefined;
  }
  const nextSlideID = presentation.slides[slideArrayID + 1];
  if (nextSlideID) {
    return nextSlideID.id;
  }
  return undefined;
}

function getPrevSlideID(curSlideID: string): string | undefined {
  const presentation = getEditor();
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id === curSlideID);
  if (slideArrayID == -1 || slideArrayID - 1 < 0) {
    return undefined;
  }
  const nextSlideID = presentation.slides[slideArrayID - 1];
  return nextSlideID.id;
}

function getSelectionSlideObj() {
  return getEditor().selection.selectedObjectID;
}

function getSizeWithLimitation(bounds: Rect, deltaSize: Rect, side: string, slideObj: SlideObj) {
  let scaleX: number = (bounds.w + deltaSize.w) / bounds.w;
  let scaleY: number = (bounds.h + deltaSize.h) / bounds.h;
  switch (side) {
    case "down-left":
    case "left":
      if (slideObj.w * scaleX < 20) {
        scaleX = 20 / bounds.w;
        deltaSize.x = bounds.w - 20;
      }
      if (slideObj.h * scaleY < 20) {
        scaleY = 20 / bounds.h;
      }
      break;
    case "down-right":
    case "right":
    case "down":
      if (slideObj.w * scaleX < 20) {
        scaleX = 20 / bounds.w;
      }
      if (slideObj.h * scaleY < 20) {
        scaleY = 20 / bounds.h;
      }
      break;
    case "up-right":
    case "top":
      if (slideObj.h * scaleY < 20) {
        scaleY = 20 / bounds.h;
        deltaSize.y = bounds.h - 20;
      }
      if (slideObj.w * scaleX < 20) {
        scaleX = 20 / bounds.w;
      }
      break;
    case "up-left":
      if (slideObj.w * scaleX < 20) {
        scaleX = 20 / bounds.w;
        deltaSize.x = bounds.w - 20;
      }
      if (slideObj.h * scaleY < 20) {
        scaleY = 20 / bounds.h;
        deltaSize.y = bounds.h - 20;
      }
      break;
    case "none":
      return { scaleX, scaleY, deltaSizeWithLimit: deltaSize };
  }

  return { scaleX, scaleY, deltaSizeWithLimit: deltaSize };
}

function getCoeficientsForShiftWhenResize(side: string) {
  let isLeft: number = 0,
    isTop: number = 0;
  switch (side) {
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
  }

  return { isLeft, isTop };
}

function computeSizeAndPosition(initialBndRect: Rect, deltaSize: Rect, side: string, slideObj: TextPlain | Picture) {
  let newObjectSize: { x: number; y: number; w: number; h: number };
  const bounds = initialBndRect;

  const { isLeft, isTop } = getCoeficientsForShiftWhenResize(side);
  const { scaleX, scaleY, deltaSizeWithLimit } = getSizeWithLimitation(bounds, deltaSize, side, slideObj);

  newObjectSize = {
    x: bounds.x + (slideObj.x - bounds.x) * scaleX + deltaSizeWithLimit.x * isLeft,
    y: bounds.y + (slideObj.y - bounds.y) * scaleY + deltaSizeWithLimit.y * isTop,

    w: slideObj.w * scaleX,
    h: slideObj.h * scaleY,
  };
  return newObjectSize;
}

function getBoundingRect(slideObjects: SlideObj[]) {
  if (slideObjects.length < 1) {
    return emptyRect;
  }
  const rect: { x0: number; y0: number; x1: number; y1: number } = {
    x0: Infinity,
    y0: Infinity,
    x1: 0,
    y1: 0,
  };
  slideObjects.forEach((slide) => {
    if (slide.x < rect.x0) {
      rect.x0 = slide.x;
    }
    if (slide.y < rect.y0) {
      rect.y0 = slide.y;
    }
    if (slide.y + slide.h > rect.y1) {
      rect.y1 = slide.y + slide.h;
    }
    if (slide.x + slide.w > rect.x1) {
      rect.x1 = slide.x + slide.w;
    }
  });

  return {
    x: rect.x0,
    y: rect.y0,
    w: rect.x1 - rect.x0,
    h: rect.y1 - rect.y0,
  };
}

type payloadForResize = {
  slideID: string;
  slideObjID: string;
  x: number;
  y: number;
  w: number;
  h: number;
};
function recomputeSizeSlideObjects(deltaSize: Rect, side: React.RefObject<string>, slideObjects: SlideObj[], slideID: string) {
  console.log(
    "Расширяем и и передвигаем",
    slideObjects.map((slide) => slide.id),
    "на",
    deltaSize,
  );

  const boundingRect = getBoundingRect(slideObjects);
  const payloads: payloadForResize[] = [];
  slideObjects.forEach((slideObj) => {
    const newSize = computeSizeAndPosition(boundingRect, deltaSize, side.current, slideObj);

    payloads.push({ slideID, slideObjID: slideObj.id, ...newSize });
  });

  dispatch(setSizeAndPositionArray, { payloads: payloads });
}

export {
  doFunc,
  getUniqID,
  dispatch,
  addEditorChangeHandler,
  getSlideObjState,
  getSlideState,
  getFirtsSlideID,
  getLastSelectedSlideID,
  getNumberSelectedSlide,
  getNumberSelectedSlideObj,
  getNextSlideID,
  getPrevSlideID,
  computeSizeAndPosition,
  recomputeSizeSlideObjects,
  getBoundingRect,
  getSelectionSlideObj,
};
