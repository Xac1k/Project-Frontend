import type { Middleware } from "redux";
import { saveToDB } from "../Table/tableDB";
import type { PresentationState } from "../store";
import type { UndoRedoState } from "../reducers/undoable";

let timer: number | null = null;
const TIMEOUT = 5000;

function syncMiddleware(): Middleware<{}, UndoRedoState<PresentationState>> {
  return (store) => (next) => (action) => {
    const prevState = store.getState();
    const result = next(action);
    const currState = store.getState();

    if (currState.present.slides === prevState.present.slides && currState.present.title === prevState.present.title) return result;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => saveToDB(currState.present, currState.present.presentationID), TIMEOUT);

    return result;
  };
}

export { syncMiddleware };
