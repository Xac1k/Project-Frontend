import { type Picture, type SlideObj, type TextPlain } from "./types";
import type { Rect } from "./typesView";
import { emptyRect } from "./constant";

function uu4v(): string {
  const uniqID: string = Date.now().toString(36) + Math.random().toString(36);
  return uniqID;
}

// function isSlideSelect(slideID: string): boolean {
//   const selectedSlideIDs = useAppSelector((state) => state.selection.selectedSlideID);
//   return selectedSlideIDs.includes(slideID);
// }

// function isSlideObjSelect(slideObjID: string): boolean {
//   const selectedObIDs = useAppSelector((state) => state.selection.selectedObjectID);
//   return selectedObIDs.includes(slideObjID);
// }

// function getFirtsSlideID(): string {
//   const slides = useAppSelector((state) => state.slides);
//   return slides[0].id;
// }

// function getSelectedSlideID(): string {
//   const selectedSlideIDs = useAppSelector((state) => state.selection.selectedSlideID);
//   return selectedSlideIDs.at(-1) ?? "";
// }

// function getObjectsOntoCurrSlide(): SlideObj[] {
//   const slides = useAppSelector((state) => state.slides);
//   const currSlideID = getSelectedSlideID();
//   const slideObjects = slides.find((slide) => slide.id === currSlideID)?.slideObjects;
//   if (!slideObjects) return [];
//   return slideObjects;
// }

// function getNumberSelectedSlide(): number {
//   const selectedSlideIDs = useAppSelector((state) => state.selection.selectedSlideID);
//   return selectedSlideIDs.length;
// }

// function getNumberSelectedSlideObj(): number {
//   const selectedSlideObjIDs = useAppSelector((state) => state.selection.selectedObjectID);
//   return selectedSlideObjIDs.length;
// }

// function getNextSlideID(curSlideID: string): string | undefined {
//   const slides = useAppSelector((state) => state.slides);
//   const slideArrayID = slides.findIndex((slide) => slide.id === curSlideID);
//   if (slideArrayID == -1) {
//     return undefined;
//   }
//   const nextSlideID = slides[slideArrayID + 1];
//   if (nextSlideID) {
//     return nextSlideID.id;
//   }
//   return undefined;
// }

// function getPrevSlideID(curSlideID: string): string | undefined {
//   const slides = useAppSelector((state) => state.slides);
//   const slideArrayID = slides.findIndex((slide) => slide.id === curSlideID);
//   if (slideArrayID == -1 || slideArrayID - 1 < 0) {
//     return undefined;
//   }
//   const nextSlideID = slides[slideArrayID - 1];
//   return nextSlideID.id;
// }

function getSizeWithLimitation(bounds: Rect, deltaSize: Rect, side: string, slideObj: SlideObj) {
  let scaleX: number = (bounds.w + deltaSize.w) / bounds.w;
  let scaleY: number = (bounds.h + deltaSize.h) / bounds.h;
  switch (side) {
    case "down-left":
    case "left":
      if (slideObj.w * scaleX < 20) {
        scaleX = 20 / bounds.w;
        deltaSize.x = bounds.w - 20;
      }
      if (slideObj.h * scaleY < 20) {
        scaleY = 20 / bounds.h;
      }
      break;
    case "down-right":
    case "right":
    case "down":
      if (slideObj.w * scaleX < 20) {
        scaleX = 20 / bounds.w;
      }
      if (slideObj.h * scaleY < 20) {
        scaleY = 20 / bounds.h;
      }
      break;
    case "up-right":
    case "top":
      if (slideObj.h * scaleY < 20) {
        scaleY = 20 / bounds.h;
        deltaSize.y = bounds.h - 20;
      }
      if (slideObj.w * scaleX < 20) {
        scaleX = 20 / bounds.w;
      }
      break;
    case "up-left":
      if (slideObj.w * scaleX < 20) {
        scaleX = 20 / bounds.w;
        deltaSize.x = bounds.w - 20;
      }
      if (slideObj.h * scaleY < 20) {
        scaleY = 20 / bounds.h;
        deltaSize.y = bounds.h - 20;
      }
      break;
    case "none":
      return { scaleX, scaleY, deltaSizeWithLimit: deltaSize };
  }

  return { scaleX, scaleY, deltaSizeWithLimit: deltaSize };
}

function getCoeficientsForShiftWhenResize(side: string) {
  let isLeft: number = 0,
    isTop: number = 0;
  switch (side) {
    case "down-left":
    case "left":
      isLeft = 1;
      break;
    case "down-right":
    case "right":
    case "down":
      break;
    case "up-right":
    case "top":
      isTop = 1;
      break;
    case "up-left":
      isLeft = 1;
      isTop = 1;
      break;
  }

  return { isLeft, isTop };
}

function getSideOfChanging(deltaSize: Rect) {
  const isXEmpty = deltaSize.x == 0;
  const isYEmpty = deltaSize.y == 0;
  const isWEmpty = deltaSize.w == 0;
  const isHEmpty = deltaSize.h == 0;

  if (!isXEmpty && !isWEmpty && !isHEmpty && isYEmpty) {
    return "down-left";
  }
  if (!isXEmpty && !isWEmpty && isHEmpty && isYEmpty) {
    return "left";
  }
  if (isXEmpty && isYEmpty && !isWEmpty && !isHEmpty) {
    return "down-right";
  }
  if (isXEmpty && isYEmpty && !isWEmpty && isHEmpty) {
    return "right";
  }
  if (isXEmpty && isYEmpty && isWEmpty && !isHEmpty) {
    return "down";
  }
  if (isXEmpty && !isYEmpty && !isWEmpty && !isHEmpty) {
    return "up-right";
  }
  if (isXEmpty && !isYEmpty && isWEmpty && !isHEmpty) {
    return "top";
  }
  if (!isXEmpty && !isYEmpty && !isWEmpty && !isHEmpty) {
    return "up-left";
  }
  return "none";
}

function computeSizeAndPosition(initialBndRect: Rect, deltaSize: Rect | undefined, slideObj: TextPlain | Picture, side: string | undefined = undefined) {
  deltaSize = deltaSize ?? { x: 0, y: 0, w: 0, h: 0 };
  side = side ?? getSideOfChanging(deltaSize);
  const bounds = initialBndRect;

  const { isLeft, isTop } = getCoeficientsForShiftWhenResize(side);
  const { scaleX, scaleY, deltaSizeWithLimit } = getSizeWithLimitation(bounds, deltaSize, side, slideObj);

  const newObjectSize = {
    x: bounds.x + (slideObj.x - bounds.x) * scaleX + deltaSizeWithLimit.x * isLeft,
    y: bounds.y + (slideObj.y - bounds.y) * scaleY + deltaSizeWithLimit.y * isTop,

    w: slideObj.w * scaleX,
    h: slideObj.h * scaleY,
  };
  return newObjectSize;
}

function getBoundingRect(slideObjects: SlideObj[]) {
  if (slideObjects.length < 1) {
    return emptyRect;
  }
  const rect: { x0: number; y0: number; x1: number; y1: number } = {
    x0: Infinity,
    y0: Infinity,
    x1: 0,
    y1: 0,
  };
  slideObjects.forEach((slide) => {
    if (slide.x < rect.x0) {
      rect.x0 = slide.x;
    }
    if (slide.y < rect.y0) {
      rect.y0 = slide.y;
    }
    if (slide.y + slide.h > rect.y1) {
      rect.y1 = slide.y + slide.h;
    }
    if (slide.x + slide.w > rect.x1) {
      rect.x1 = slide.x + slide.w;
    }
  });

  return {
    x: rect.x0,
    y: rect.y0,
    w: rect.x1 - rect.x0,
    h: rect.y1 - rect.y0,
  };
}

export { uu4v, computeSizeAndPosition, getBoundingRect, getSideOfChanging };
