import { bindActionCreators, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { dataJSON } from "./PresentationMax";
import { redoAction, undoable, undoAction } from "./reducers/undoable";
import presentationReducer, { presentationActions } from "./reducers/presentationReducer";
import { syncMiddleware } from "./Middleware/syncMiddleware";

export type PresentationState = ReturnType<typeof presentationReducer>;

export const store = configureStore({
  reducer: undoable(presentationReducer, dataJSON),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([syncMiddleware()]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ undoAction, redoAction, ...presentationActions }, dispatch);
};
