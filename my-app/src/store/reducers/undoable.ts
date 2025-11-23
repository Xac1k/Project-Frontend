import { createAction } from "@reduxjs/toolkit";
import type { Reducer, UnknownAction } from "redux";
import type { PresentationState } from "../store";

export type UndoRedoState<PresentationState> = {
  past: PresentationState[];
  present: PresentationState;
  future: PresentationState[];
};

export const undoAction = createAction("undo");
export const redoAction = createAction("redo");

type UndoActionType = {
  type: "undo";
};

type RedoActionType = {
  type: "redo";
};

export function undoable(
  reducer: Reducer<PresentationState, UnknownAction>,
  initialState: PresentationState,
): Reducer<UndoRedoState<PresentationState>, UnknownAction | UndoActionType | RedoActionType> {
  const initialUndoState: UndoRedoState<PresentationState> = {
    past: [],
    present: initialState,
    future: [],
  };

  function isUndoAction(action: UnknownAction | UndoActionType | RedoActionType): action is UndoActionType | RedoActionType {
    return action.type === "undo" || action.type === "redo";
  }

  return function (state = initialUndoState, action: UnknownAction | UndoActionType | RedoActionType) {
    switch (action.type) {
      case "undo": //отменить
        if (state.past.length === 0) return state;
        const prev = state.past[state.past.length - 1];
        const newPrev = state.past.slice(0, state.past.length - 1);

        return {
          past: newPrev,
          present: prev,
          future: [state.present, ...state.future],
        };

        break;
      case "redo": //востановить
        if (state.future.length === 0) return state;
        const next = state.future[0];
        const newFuture = state.future.slice(1);

        return {
          past: [...state.past, state.present],
          present: next,
          future: newFuture,
        };

        break;
      default:
        if (isUndoAction(action)) return state;
        const newPresent = reducer(state.present, action);

        if (newPresent.slides === state.present.slides && newPresent.title === state.present.title)
          return {
            ...state,
            present: { ...state.present, selection: newPresent.selection },
          };

        return {
          past: [...state.past, state.present],
          present: newPresent,
          future: [],
        };
    }
  };
}
