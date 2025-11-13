import { bindActionCreators, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import selection from "./reducers/selectionReducer";
import title from "./reducers/titleReducer";
import slides from "./reducers/slidesReducer";
import { slidesActions } from "./reducers/slidesReducer";
import { titleActions } from "./reducers/titleReducer";
import { selectionActions } from "./reducers/selectionReducer";
import { dataJSON } from "./PresentationMax";

export const store = configureStore({
  preloadedState: dataJSON,
  reducer: {
    selection,
    title,
    slides,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...slidesActions, ...selectionActions, ...titleActions }, dispatch);
};
