import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { blankSlide, type AddSlideProps, type InsertSlidesPayload, type RemoveSlideProps, type Slide, type SetBackgroundProps } from "../types";
import slideObjectsReducer from "./slideObjectsReducer";
import { uu4v } from "../functions";

export type SlidesState = Slide[];
const initialState: SlidesState = [];

export const slidesSlice = createSlice({
  name: "slides",
  initialState,
  reducers: {
    addSlide: (state, action: PayloadAction<AddSlideProps>) => {
      const insertionID = state.findIndex((slide) => slide.id === action.payload.insertionID);

      state.splice(insertionID, 0, {
        ...blankSlide,
        id: uu4v(),
      });
    },
    removeSlide: (state, action: PayloadAction<RemoveSlideProps>) => {
      const slideIDsToRemove = action.payload.slideID;

      for (let i = state.length - 1; i >= 0; i--) {
        if (slideIDsToRemove.includes(state[i].id)) {
          state.splice(i, 1);
        }
      }
    },
    insertSlidesOntoLayer: (state, action: PayloadAction<InsertSlidesPayload>) => {
      const insertionSlideArrayID = state.findIndex((slide) => slide.id === action.payload.insertionSlideID);
      if (insertionSlideArrayID === -1) return;
      for (const slideID of action.payload.slideIDs) {
        if (state.findIndex((slide) => slide.id === slideID) === -1) return;
      }

      const targetPosition = insertionSlideArrayID + action.payload.position;
      const removedBeforeTarget = state.slice(0, targetPosition).filter((slide) => action.payload.slideIDs.includes(slide.id)).length;
      const slidesForInserting = state.filter((slide) => action.payload.slideIDs.includes(slide.id));
      for (let idx = state.length - 1; idx >= 0; idx--) {
        if (action.payload.slideIDs.includes(state[idx].id)) {
          state.splice(idx, 1);
        }
      }
      state.splice(targetPosition - removedBeforeTarget, 0, ...slidesForInserting);
    },
    setBackground: (state, action: PayloadAction<SetBackgroundProps>) => {
      //Выносить функции в отдельный файл
      const slideIDinArray = state.findIndex((slide) => slide.id === action.payload.slideID);
      if (action.payload.color) {
        state[slideIDinArray].background = {
          type: "color",
          color: action.payload.color,
        };
      } else if (action.payload.src) {
        state[slideIDinArray].background = {
          type: "image",
          src: action.payload.src,
        };
      }
    },

    ...slideObjectsReducer,
  },
});

export const slidesActions = slidesSlice.actions;

export default slidesSlice.reducer;
