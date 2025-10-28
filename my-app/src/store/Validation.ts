import type { StateWorkZone } from "../views/workSpace/src/WorkSpace";

function isURL(text: string | undefined | null): boolean {
  if (!text) return false;
  const SRC = /http[\n\w\\\/\:.?=\-&]*/g;
  return SRC.test(text);
}

function canDragAndDrop(stateWorkZone: React.RefObject<StateWorkZone>) {
  return !stateWorkZone.current.edit;
}

function canResize(stateWorkZone: React.RefObject<StateWorkZone>) {
  return !stateWorkZone.current.edit 
}

function canSelect(stateWorkZone: React.RefObject<StateWorkZone>) {
  return !stateWorkZone.current.stateDnD.isEnd && !stateWorkZone.current.edit;
}

function canFlipThrough(stateWorkZone: React.RefObject<StateWorkZone>) {
  return !stateWorkZone.current.edit;
}

export { isURL, canFlipThrough, canSelect, canDragAndDrop };
