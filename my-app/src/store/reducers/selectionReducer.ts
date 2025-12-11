import type { PayloadAction } from "@reduxjs/toolkit";
import type { Presentation, SelectFromToProps, setSlideAs, setSlideObjAs, setSlidesAs } from "../types";

export default {
  setSlideObjAsSingleSelected: (state: Presentation, action: PayloadAction<setSlideObjAs>) => {
    state.selection.selectedObjectID = [action.payload.slideObjID];
  },
  setSlideAsSingleSelected: (state: Presentation, action: PayloadAction<setSlideAs>) => {
    state.selection.selectedObjectID = [];
    state.selection.selectedSlideID = [action.payload.slideID];
  },
  selectSlideFromTo: (state: Presentation, action: PayloadAction<SelectFromToProps>) => {
    state.selection.selectedObjectID = [];
    const startSlideArrayID = state.slides.findIndex((slide) => slide.id == action.payload.startSlideID);
    const endSlideArrayID = state.slides.findIndex((slide) => slide.id == action.payload.endSlideID);

    for (let id = startSlideArrayID; id <= endSlideArrayID; ++id) {
      state.selection.selectedSlideID.push(state.slides[id].id);
    }
    for (let id = startSlideArrayID; id >= endSlideArrayID; --id) {
      state.selection.selectedSlideID.push(state.slides[id].id);
    }
  },
  setSlideAsSelected: (state: Presentation, action: PayloadAction<setSlideAs>) => {
    state.selection.selectedObjectID = [];
    state.selection.selectedSlideID.push(action.payload.slideID);
  },
  setSlideAsUnselected: (state: Presentation, action: PayloadAction<setSlideAs>) => {
    state.selection.selectedObjectID = [];
    state.selection.selectedSlideID = state.selection.selectedSlideID.filter((slideID) => slideID != action.payload.slideID);
  },
  setSlidesAsUnselected: (state: Presentation, action: PayloadAction<setSlidesAs>) => {
    state.selection.selectedObjectID = [];
    state.selection.selectedSlideID = state.selection.selectedSlideID.filter((slideID) => !action.payload.slideIDs.includes(slideID));
  },

  setSlideObjAsSelected: (state: Presentation, action: PayloadAction<setSlideObjAs>) => {
    state.selection.selectedObjectID.push(action.payload.slideObjID);
  },
  setSlideObjAsUnselected: (state: Presentation, action: PayloadAction<setSlideObjAs>) => {
    state.selection.selectedObjectID = state.selection.selectedObjectID.filter((slideID) => slideID != action.payload.slideObjID);
  },
};
