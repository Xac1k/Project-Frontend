import type { ModifyFunction, Presentation } from "./types";
import {dataJSON} from "./PresentationMax"
export let presentation: Presentation = dataJSON;
let EditorChangeHandler: () => void;

function dispatch(modifyfn: ModifyFunction, payload: Object) {
  const newState = modifyfn(presentation, payload); //  принимаем payload как объект по типу пропса
  setEditor(newState);
  if (EditorChangeHandler) {
    EditorChangeHandler();
  }
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
  const slideArrayID = getEditor().selection.selectedSlideID.find(
    (slide) => slide === slideID,
  );
  return slideArrayID != undefined
}

//Узнать выделен ли Слайд
function getSlideObjState(slideObjID: string): boolean {
  const slideArrayID = getEditor().selection.selectedObjectID.find(
    (slideObj) => slideObj === slideObjID,
  );
  return slideArrayID != undefined
}

export { getEditor, setEditor, dispatch, addEditorChangeHandler, getSlideObjState, getSlideState };
