import { setSizeAndPositionArray, type ModifyFunction, type Presentation, type SlideObj } from "./types";
import { dataJSON } from "./PresentationMax";
import { computeSizeAndPosition } from "./computeSizeAndPosition";
import type { Rect } from "./typesView";
import type { Side } from "../views/workSpace/slide/functions/DragAndDropSize";
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

type payloadForResize = {
  slideID: string;
  slideObjID: string;
  x: number;
  y: number;
  w: number;
  h: number;
};
function recomputeSizeSlideObjects(
  AdditionSizeSelectedObj: Rect,
  bndRect: React.RefObject<Rect>,
  side: React.RefObject<Side>,
  slideObjects: SlideObj[],
  slideID: string,
) {
  console.log(
    "Расширяем и и передвигаем",
    slideObjects.map((slide) => slide.id),
    "на",
    AdditionSizeSelectedObj,
  );
  const payloads: payloadForResize[] = [];
  for (const slideObj of slideObjects) {
    const DataSize = {
      addSizeMarkedObj: AdditionSizeSelectedObj,
      bndRect: bndRect,
      side: side,
    };
    const newSize = computeSizeAndPosition(DataSize, slideObj);
    payloads.push({
      slideID,
      slideObjID: slideObj.id,
      x: newSize.x,
      y: newSize.y,
      w: newSize.w,
      h: newSize.h,
    });
  }
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
  recomputeSizeSlideObjects,
};
