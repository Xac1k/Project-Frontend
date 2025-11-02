import type { StateWorkZone } from "../views/workSpace/src/WorkSpace";
import type { Rect } from "./typesView";

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

function canSelect(stateWorkZone: React.RefObject<StateWorkZone>) {
  return !stateWorkZone.current.stateDnD.isEnd && !stateWorkZone.current.edit && !stateWorkZone.current.stateDnD.selectChanged;
}

function canFlipThrough(stateWorkZone: React.RefObject<StateWorkZone>) {
  return !stateWorkZone.current.edit;
}

function isStartedNotMovingDnd(stateWorkZone: React.RefObject<StateWorkZone>) {
  return stateWorkZone.current.stateDnD.isStarted && !stateWorkZone.current.stateDnD.isMoving && !stateWorkZone.current.edit;
}

function isMultiplyResize(stateWorkZone: React.RefObject<StateWorkZone>) {
  return stateWorkZone.current.stateSizing.isMultiply;
}

export { isURL, canFlipThrough, canSelect, canDragAndDrop, isStartedNotMovingDnd, canResize, isMultiplyResize };
