import type { PayloadAction } from "@reduxjs/toolkit";
import { blankSlide, type AddSlideProps, type InsertSlidesPayload, type Presentation, type RemoveSlideProps, type SetBackgroundProps } from "../types";
import slideObjectsReducer from "./slideObjectsReducer";
import { uu4v } from "../functions";

export default {
  addSlide: (state: Presentation, action: PayloadAction<AddSlideProps>) => {
    const insertionID = state.slides.findIndex((slide) => slide.id === action.payload.insertionID);

    state.slides.splice(insertionID, 0, {
      ...blankSlide,
      id: uu4v(),
    });
  },
  removeSlide: (state: Presentation, action: PayloadAction<RemoveSlideProps>) => {
    const slideIDsToRemove = action.payload.slideID;

    for (let i = state.slides.length - 1; i >= 0; i--) {
      if (slideIDsToRemove.includes(state.slides[i].id)) {
        state.slides.splice(i, 1);
      }
    }
  },
  insertSlidesOntoLayer: (state: Presentation, action: PayloadAction<InsertSlidesPayload>) => {
    const insertionSlideArrayID = state.slides.findIndex((slide) => slide.id === action.payload.insertionSlideID);
    if (insertionSlideArrayID === -1) return;
    for (const slideID of action.payload.slideIDs) {
      if (state.slides.findIndex((slide) => slide.id === slideID) === -1) return;
    }

    const targetPosition = insertionSlideArrayID + action.payload.position;
    const removedBeforeTarget = state.slides.slice(0, targetPosition).filter((slide) => action.payload.slideIDs.includes(slide.id)).length;
    const slidesForInserting = state.slides.filter((slide) => action.payload.slideIDs.includes(slide.id));
    for (let idx = state.slides.length - 1; idx >= 0; idx--) {
      if (action.payload.slideIDs.includes(state.slides[idx].id)) {
        state.slides.splice(idx, 1);
      }
    }
    state.slides.splice(targetPosition - removedBeforeTarget, 0, ...slidesForInserting);
  },
  setBackground: (state: Presentation, action: PayloadAction<SetBackgroundProps>) => {
    const slideIDinArray = state.slides.findIndex((slide) => slide.id === action.payload.slideID);
    if (action.payload.color) {
      state.slides[slideIDinArray].background = {
        type: "color",
        color: action.payload.color,
      };
    } else if (action.payload.src) {
      state.slides[slideIDinArray].background = {
        type: "image",
        src: action.payload.src,
      };
    }
  },

  ...slideObjectsReducer,
};
