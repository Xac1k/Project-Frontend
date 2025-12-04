import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Presentation, SetEmail, setPresentationID } from "../types";
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
  email: "",
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
    },
    setEmailName: (state, action: PayloadAction<SetEmail>) => {
      state.email = action.payload.email;
      console.log("Установили email", state.email);
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
