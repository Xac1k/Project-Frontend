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
  type Presentation,
} from "../types";
import { uu4v } from "../functions";

export default {
  addSlideObject: (state: Presentation, action: PayloadAction<AddSlideObjectProps>) => {
    const slideIDinArray = state.slides.findIndex((slide) => slide.id === action.payload.slideID);
    const x = action.payload.x ?? blankText.x;
    const y = action.payload.y ?? blankText.y;
    const w = action.payload.w ?? blankText.w;
    const h = action.payload.h ?? blankText.h;
    const rect = { x: x, y: y, w: w, h: h };
    if (action.payload.src) {
      state.slides[slideIDinArray].slideObjects.push({ ...blankImage, ...rect, src: action.payload.src, id: uu4v() });
    } else if (action.payload.text) {
      state.slides[slideIDinArray].slideObjects.push({ ...blankText, ...rect, text: action.payload.text, id: uu4v() });
    }
  },
  removeSlideObjects: (state: Presentation, action: PayloadAction<RemoveSlideObjectProps>) => {
    const slideIDinArray = state.slides.findIndex((slide) => slide.id === action.payload.slideID);
    state.slides[slideIDinArray].slideObjects = state.slides[slideIDinArray].slideObjects.filter((slideObj) => !action.payload.slideObjArrayID.includes(slideObj.id));
  },
  putText: (state: Presentation, action: PayloadAction<PutTextProps>) => {
    const slideIDinArray = state.slides.findIndex((slide) => slide.id === action.payload.slideID);
    const slideObjIDinArray = state.slides[slideIDinArray].slideObjects.findIndex((slideObj) => slideObj.id === action.payload.slideObjID);
    if (state.slides[slideIDinArray].slideObjects[slideObjIDinArray].type === "text") {
      state.slides[slideIDinArray].slideObjects[slideObjIDinArray].text = action.payload.text;
    }
  },
  setFontFamily: (state: Presentation, action: PayloadAction<SetFontFamilyProps>) => {
    const slideIDinArray = state.slides.findIndex((slide) => slide.id === action.payload.slideID);
    const slideObjIDinArray = state.slides[slideIDinArray].slideObjects.findIndex((slideObj) => slideObj.id === action.payload.slideObjID);
    if (state.slides[slideIDinArray].slideObjects[slideObjIDinArray].type === "text") {
      state.slides[slideIDinArray].slideObjects[slideObjIDinArray].font_family = action.payload.font_family;
    }
  },
  setFontSize: (state: Presentation, action: PayloadAction<SetFontSizeProps>) => {
    const slideIDinArray = state.slides.findIndex((slide) => slide.id === action.payload.slideID);
    const slideObjIDinArray = state.slides[slideIDinArray].slideObjects.findIndex((slideObj) => slideObj.id === action.payload.slideObjID);
    if (state.slides[slideIDinArray].slideObjects[slideObjIDinArray].type === "text") {
      state.slides[slideIDinArray].slideObjects[slideObjIDinArray].font_size = action.payload.size;
    }
  },
  displaceSlideObj: (state: Presentation, action: PayloadAction<DisplaceSlideObjProps>) => {
    const slideIDinArray = state.slides.findIndex((slide) => slide.id === action.payload.slideID);
    state.slides[slideIDinArray].slideObjects.forEach((slideObj) => {
      if (action.payload.slideObjectsID.includes(slideObj.id)) {
        slideObj.x += action.payload.shift.x;
        slideObj.y += action.payload.shift.y;
      }
    });
  },
  setSizeAndPositionArray: (state: Presentation, action: PayloadAction<SetSizeAndPositionArrayProps>) => {
    const slideArrayID = state.slides.findIndex((slide) => slide.id === action.payload.slideID);
    for (const payload of action.payload.payloads) {
      const slideObjArrayID = state.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === payload.slideObjID);
      state.slides[slideArrayID].slideObjects[slideObjArrayID] = {
        ...state.slides[slideArrayID].slideObjects[slideObjArrayID],
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
