import type { PayloadAction } from "@reduxjs/toolkit";
import {
  type PutTextProps,
  type SetFontFamilyProps,
  type RemoveSlideObjectProps,
  type SetFontSizeProps,
  type DisplaceSlideObjProps,
  type AddSlideObjectProps,
  blankText,
  blankImage,
  type SetSizeAndPositionArrayProps,
} from "../types";
import type { SlidesState } from "./slidesReducer";
import { uu4v } from "../functions";

export default {
  addSlideObject: (state: SlidesState, action: PayloadAction<AddSlideObjectProps>) => {
    const slideIDinArray = state.findIndex((slide) => slide.id === action.payload.slideID);
    const x = action.payload.x ?? blankText.x;
    const y = action.payload.y ?? blankText.y;
    const w = action.payload.w ?? blankText.w;
    const h = action.payload.h ?? blankText.h;
    const rect = { x: x, y: y, w: w, h: h };
    if (action.payload.src) {
      state[slideIDinArray].slideObjects.push({ ...blankImage, ...rect, src: action.payload.src, id: uu4v() });
    } else if (action.payload.text) {
      state[slideIDinArray].slideObjects.push({ ...blankText, ...rect, text: action.payload.text, id: uu4v() });
    }
  },
  removeSlideObjects: (state: SlidesState, action: PayloadAction<RemoveSlideObjectProps>) => {
    const slideIDinArray = state.findIndex((slide) => slide.id === action.payload.slideID);
    state[slideIDinArray].slideObjects = state[slideIDinArray].slideObjects.filter((slideObj) => !action.payload.slideObjArrayID.includes(slideObj.id));
  },
  putText: (state: SlidesState, action: PayloadAction<PutTextProps>) => {
    const slideIDinArray = state.findIndex((slide) => slide.id === action.payload.slideID);
    const slideObjIDinArray = state[slideIDinArray].slideObjects.findIndex((slideObj) => slideObj.id === action.payload.slideObjID);
    if (state[slideIDinArray].slideObjects[slideObjIDinArray].type === "text") {
      state[slideIDinArray].slideObjects[slideObjIDinArray].text = action.payload.text;
    }
  },
  setFontFamily: (state: SlidesState, action: PayloadAction<SetFontFamilyProps>) => {
    const slideIDinArray = state.findIndex((slide) => slide.id === action.payload.slideID);
    const slideObjIDinArray = state[slideIDinArray].slideObjects.findIndex((slideObj) => slideObj.id === action.payload.slideObjID);
    if (state[slideIDinArray].slideObjects[slideObjIDinArray].type === "text") {
      state[slideIDinArray].slideObjects[slideObjIDinArray].font_family = action.payload.font_family;
    }
  },
  setFontSize: (state: SlidesState, action: PayloadAction<SetFontSizeProps>) => {
    const slideIDinArray = state.findIndex((slide) => slide.id === action.payload.slideID);
    const slideObjIDinArray = state[slideIDinArray].slideObjects.findIndex((slideObj) => slideObj.id === action.payload.slideObjID);
    if (state[slideIDinArray].slideObjects[slideObjIDinArray].type === "text") {
      state[slideIDinArray].slideObjects[slideObjIDinArray].font_size = action.payload.size;
    }
  },
  displaceSlideObj: (state: SlidesState, action: PayloadAction<DisplaceSlideObjProps>) => {
    const slideIDinArray = state.findIndex((slide) => slide.id === action.payload.slideID);
    state[slideIDinArray].slideObjects.forEach((slideObj) => {
      if (action.payload.slideObjectsID.includes(slideObj.id)) {
        slideObj.x += action.payload.shift.x;
        slideObj.y += action.payload.shift.y;
      }
    });
  },
  setSizeAndPositionArray: (state: SlidesState, action: PayloadAction<SetSizeAndPositionArrayProps>) => {
    const slideArrayID = state.findIndex((slide) => slide.id === action.payload.slideID);
    console.log(slideArrayID);
    for (const payload of action.payload.payloads) {
      const slideObjArrayID = state[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === payload.slideObjID);
      state[slideArrayID].slideObjects[slideObjArrayID] = {
        ...state[slideArrayID].slideObjects[slideObjArrayID],
        x: payload.x,
        y: payload.y,
        w: payload.w,
        h: payload.h,
      };
    }
  },

  //   changeLayerSlideObj: (state: SlidesState, action: PayloadAction<ChangeLayerSlideObjProps>) => {
  //         const slideIDinArray = state.findIndex((slide) => slide.id === action.payload.slideID);
  //         const layerBias = action.payload.biasSlideObj;

  //         const insertionSlideArrayID = state[slideIDinArray].slideObjects.findIndex((slideObj) => slideObj.id === action.payload.);
  //         if (insertionSlideArrayID === -1) return;
  //         for (const slideObjID of action.payload.slideObjIDs) {
  //           if (state[slideIDinArray].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID) === -1) return;
  //         }

  //         const targetPosition = insertionSlideArrayID + action.payload.biasSlideObj;
  //         const removedBeforeTarget = state.slice(0, targetPosition).filter((slide) => action.payload.slideIDs.includes(slide.id)).length;
  //         const slidesForInserting = state.filter((slide) => action.payload.slideIDs.includes(slide.id));
  //         state = state.filter((slide) => !action.payload.slideIDs.includes(slide.id));
  //         state.splice(targetPosition - removedBeforeTarget, 0, ...slidesForInserting);
  //       },
};
