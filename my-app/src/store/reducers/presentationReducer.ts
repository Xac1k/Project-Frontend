import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Presentation, setPresentationID } from "../types";
import slideObjectsReducer from "./slideObjectsReducer";
import selectionReducer from "./selectionReducer";
import titleReducer from "./titleReducer";
import slidesReducer from "./slidesReducer";
import { downloadPresentationDB } from "../Middleware/dataLoaderDB";

const initialState: Presentation = {
  slides: [],
  title: "",
  selection: {
    selectedSlideID: [],
    selectedObjectID: [],
  },
  presentationID: "",
};

export const presentationSlice = createSlice({
  name: "presentation",
  initialState: initialState,
  reducers: {
    ...slideObjectsReducer,
    ...selectionReducer,
    ...titleReducer,
    ...slidesReducer,
    setPresentationID: (state, action: PayloadAction<setPresentationID>) => {
      state.presentationID = action.payload.presentationID;
    },
    setData: (state, action: PayloadAction<Presentation>) => {
      state.selection = action.payload.selection;
      state.slides = action.payload.slides;
      state.title = action.payload.title;
    },
    clearPresID: (state) => {
      state.presentationID = "";
      console.log("Очищение");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(downloadPresentationDB.fulfilled, (state, action) => {
      state.selection = action.payload.selection;
      state.slides = action.payload.slides;
      state.title = action.payload.title;
      state.presentationID = action.meta.arg;
    });
  },
});

export const presentationActions = presentationSlice.actions;

export default presentationSlice.reducer;
