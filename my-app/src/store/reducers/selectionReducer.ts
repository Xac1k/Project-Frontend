import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SelectFromToProps, Selection, setSlideAs, setSlideObjAs, setSlidesAs } from "../types";

const initialState: Selection = {
  selectedObjectID: [],
  selectedSlideID: [],
};

export const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    setSlideObjAsSingleSelected: (state, action: PayloadAction<setSlideObjAs>) => {
      state.selectedObjectID = [action.payload.slideObjID];
    },
    setSlideAsSingleSelected: (state, action: PayloadAction<setSlideAs>) => {
      state.selectedObjectID = [];
      state.selectedSlideID = [action.payload.slideID];
    },
    selectSlideFromTo: (state, action: PayloadAction<SelectFromToProps>) => {
      state.selectedObjectID = [];
      const startSlideArrayID = action.payload.slides.findIndex((slide) => slide.id == action.payload.startSlideID);
      const endSlideArrayID = action.payload.slides.findIndex((slide) => slide.id == action.payload.endSlideID);

      for (let id = startSlideArrayID; id <= endSlideArrayID; ++id) {
        state.selectedSlideID.push(action.payload.slides[id].id);
      }
      for (let id = startSlideArrayID; id >= endSlideArrayID; --id) {
        state.selectedSlideID.push(action.payload.slides[id].id);
      }
    },
    setSlideAsSelected: (state, action: PayloadAction<setSlideAs>) => {
      state.selectedObjectID = [];
      state.selectedSlideID.push(action.payload.slideID);
    },
    setSlideAsUnselected: (state, action: PayloadAction<setSlideAs>) => {
      state.selectedObjectID = [];
      state.selectedSlideID = state.selectedSlideID.filter((slideID) => slideID != action.payload.slideID);
    },
    setSlidesAsUnselected: (state, action: PayloadAction<setSlidesAs>) => {
      state.selectedObjectID = [];
      state.selectedSlideID = state.selectedSlideID.filter((slideID) => !action.payload.slideIDs.includes(slideID));
    },

    setSlideObjAsSelected: (state, action: PayloadAction<setSlideObjAs>) => {
      state.selectedObjectID.push(action.payload.slideObjID);
    },
    setSlideObjAsUnselected: (state, action: PayloadAction<setSlideObjAs>) => {
      state.selectedObjectID = state.selectedObjectID.filter((slideID) => slideID != action.payload.slideObjID);
    },
  },
});

export const selectionActions = selectionSlice.actions;

export default selectionSlice.reducer;
