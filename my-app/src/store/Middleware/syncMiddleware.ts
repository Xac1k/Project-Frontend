import type { Middleware } from "redux";
import { saveToDB } from "../Table/tableDB";
import type { PresentationState } from "../store";
import type { UndoRedoState } from "../reducers/undoable";

function syncMiddleware(): Middleware<{}, UndoRedoState<PresentationState>> {
  return (store) => (next) => (action) => {
    const prevState = store.getState();
    console.log("PrevState", prevState);
    const result = next(action);
    const currState = store.getState();
    console.log("CurrState", currState);

    if (currState.present.slides === prevState.present.slides && currState.present.title === prevState.present.title) return result;

    saveToDB(currState.present, currState.present.presentationID);
    return result;
  };
}

export { syncMiddleware };
