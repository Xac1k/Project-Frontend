import type { Background, Presentation, Slide, SlideObj, Selection } from "./types";

function isURL(text: string | undefined): boolean {
  if (!text) return false;
  const SRC = /http[\n\w\\\/\:.?=\-&]*/g;
  return SRC.test(text);
}

function isBackground(arg: any): arg is Background {
  if (!arg || typeof arg !== "object") return false;

  const hasType = "type" in arg && typeof arg.type === "string";
  if (hasType) {
    if (arg.type === "color") {
      const isColorValid = "color" in arg && typeof arg.color === "string";
      return isColorValid;
    }

    if (arg.type === "image") {
      const isSrcValid = "src" in arg && typeof arg.src === "string" && isURL(arg.src);
      return isSrcValid;
    }
  }

  return false;
}

function isSLideObjects(arg: any): arg is SlideObj {
  if (!arg || typeof arg !== "object") return false;

  const hasType = "type" in arg && typeof arg.type === "string";
  const hasX = "x" in arg && typeof arg.x === "number";
  const hasY = "y" in arg && typeof arg.y === "number";
  const hasW = "w" in arg && typeof arg.w === "number";
  const hasH = "h" in arg && typeof arg.h === "number";
  const hasID = "id" in arg && typeof arg.id === "string";

  if (hasType && hasX && hasY && hasW && hasH && hasID) {
    if (arg.type === "text") {
      const hasText = "text" in arg && typeof arg.text === "string";
      const hasFontSize = "font_size" in arg && typeof arg.font_size === "number";
      const hasFontFamily = "font_family" in arg && typeof arg.font_family === "string";

      return hasText && hasFontSize && hasFontFamily;
    }
    if (arg.type === "image") {
      const hasSrc = "src" in arg && typeof arg.src === "string" && isURL(arg.src);

      return hasSrc;
    }
  }

  return false;
}

function isSlide(arg: any): arg is Slide {
  if (!arg || typeof arg !== "object") return false;

  const hasSlideObjects = Array.isArray(arg.slideObjects);
  const hasBackground = "background" in arg && typeof arg.background === "object";
  const hasID = "id" in arg && typeof arg.id === "string";

  if (hasSlideObjects && hasBackground && hasID) {
    const candidate = arg as Slide;
    const isBackgroundValid = isBackground(candidate.background);
    const isSlideObjectsValid = candidate.slideObjects.every((slideObj) => isSLideObjects(slideObj));

    return isBackgroundValid && isSlideObjectsValid;
  }

  return false;
}

function isSelection(arg: any): arg is Selection {
  const hasSelectedSlideID = Array.isArray(arg.selectedSlideID);
  const hasSelectedObjectID = Array.isArray(arg.selectedObjectID);

  if (hasSelectedSlideID && hasSelectedObjectID) {
    const candidate = arg as Selection;
    const isSelectedSlideIDValid = candidate.selectedSlideID.every((selectedSlideID) => typeof selectedSlideID === "string");
    const isSelectedObjectIDValid = candidate.selectedObjectID.every((selectedObjectID) => typeof selectedObjectID === "string");

    return isSelectedSlideIDValid && isSelectedObjectIDValid;
  }

  return false;
}

function isPresentation(arg: any): arg is Presentation {
  if (!arg || typeof arg !== "object") return false;

  const hasSelection = "selection" in arg && typeof arg.selection === "object";
  const hasSlides = Array.isArray(arg.slides);
  const hasTitle = "title" in arg && typeof arg.title === "string";
  const hasPresentationID = "presentationID" in arg && typeof arg.presentationID === "string";
  const hasEmail = "email" in arg && typeof arg.email === "string";

  if (hasSelection && hasSlides && hasTitle && hasPresentationID && hasEmail) {
    const candidate = arg as Presentation;
    const isSlidesValid = candidate.slides.every((slide) => isSlide(slide));
    const isSelectionValid = isSelection(candidate.selection);

    return isSlidesValid && isSelectionValid;
  }

  return false;
}

export { isURL, isPresentation };
