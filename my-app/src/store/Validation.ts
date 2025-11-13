import type { StateWorkZone } from "../views/workSpace/WorkSpace";

function isURL(text: string | undefined | null): boolean {
  if (!text) return false;
  const SRC = /http[\n\w\\\/\:.?=\-&]*/g;
  return SRC.test(text);
}

function canDragAndDrop(stateWorkZone: React.RefObject<StateWorkZone>) {
  return !stateWorkZone.current.edit;
}

function canResize(stateWorkZone: React.RefObject<StateWorkZone>) {
  return !stateWorkZone.current.stateDnD.active && !stateWorkZone.current.edit;
}

function canFlipThrough(stateWorkZone: React.RefObject<StateWorkZone>) {
  return !stateWorkZone.current.edit;
}

function isMultiplyResize(stateWorkZone: React.RefObject<StateWorkZone>) {
  return stateWorkZone.current.stateSizing.isMultiply;
}

export { isURL, canFlipThrough, canDragAndDrop, canResize, isMultiplyResize };
