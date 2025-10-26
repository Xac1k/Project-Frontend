type BaseSlideObject = {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
};

type TextPlain = BaseSlideObject & {
  text: string;
  font_size: number;
  font_family: string;
  type: "text";
};

type Color = {
  color: string;
  type: "color";
};

type Image = {
  src: string;
  type: "image";
};

type Picture = BaseSlideObject & Image;
type SlideObj = TextPlain | Picture;
type Background = Color | Image;

//Слайд,
type Slide = {
  slideObjects: SlideObj[];
  background: Background;
  id: string;
};

//Выделение.
type SelectionElt = {
  selectedSlideID: string[];
  selectedObjectID: string[];
};

//Презентация,
type Presentation = {
  slides: Slide[];
  title: string;
  selection: SelectionElt;
};

export type { Presentation, SelectionElt, Slide, SlideObj, Picture, TextPlain };

type ModifyFunction = (presentation: Presentation, payload: any) => Presentation;

export type { ModifyFunction };

//шрифты могут поддерживать bold regular и т.д.

// изменение названия презентации
function changeTitle(presentation: Presentation, { name }: ChangeTitleProps): Presentation {
  const newPresentation: Presentation = {
    ...presentation,
    title: name,
  };
  return newPresentation;
}
type ChangeTitleProps = {
  name: string;
};

// добавление/удаление слайда
function removeSlide(presentation: Presentation, { slideID }: RemoveSlideProps): Presentation {
  const newSlidesArray = presentation.slides.filter((slide) => slide.id != slideID);

  return {
    ...presentation,
    slides: newSlidesArray,
  };
}
type RemoveSlideProps = {
  slideID: string;
};

function addSlide(presentation: Presentation, { slide, slideID, insertionID = null }: AddSlideProps): Presentation {
  const SlideExist = presentation.slides.findIndex((slide) => slide.id === slideID);
  if (SlideExist != -1) {
    console.error("ID Error: This slide has been already exist. slideID=", slideID);
    return presentation;
  }

  const newSlide = {
    ...slide,
    id: slideID,
  };

  const editedSlidesArray = [...presentation.slides];
  if (insertionID == null) {
    editedSlidesArray.push(newSlide);
  } else {
    const slideArrayInsertionID = presentation.slides.findIndex((slide) => slide.id === insertionID);
    if (slideArrayInsertionID == -1) {
      console.error("ID Error: slideID for insert slide not found. slideID=", insertionID);
      return presentation;
    }

    editedSlidesArray.splice(slideArrayInsertionID, 0, slide);
  }

  return {
    ...presentation,
    slides: editedSlidesArray,
  };
}
type AddSlideProps = {
  slide: Slide;
  slideID: string;
  insertionID: string | null;
};

// изменение позиции слайда

function changeLayer(presentation: Presentation, { slideID, biasSlide }: ChangeLayerProps): Presentation {
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
  if (slideArrayID == -1) {
    console.error("ID error: SlideID not found in Slides array. SlideID=", slideID);
    return presentation;
  }

  const slideForChange = presentation.slides[slideArrayID];
  const newSlideArrayID = biasSlide < 0 ? slideArrayID + biasSlide : slideArrayID + biasSlide + 1;
  const newSlidesArray = [...presentation.slides];

  newSlidesArray.splice(newSlideArrayID, 0, slideForChange);
  if (slideArrayID <= newSlideArrayID) {
    newSlidesArray.splice(slideArrayID, 1);
  } else {
    newSlidesArray.splice(slideArrayID + 1, 1);
  }

  return {
    ...presentation,
    slides: newSlidesArray,
  };
}
type ChangeLayerProps = {
  slideID: string;
  biasSlide: number;
};

// добавление/удаление текста и картинки
function removeSlideObject(presentation: Presentation, { slideID, slideObjID }: RemoveSlideObjectProps): Presentation {
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id == slideID);
  if (slideArrayID == -1) {
    console.error("ID error: SlideID not found in Slides array. SlideID=", slideID);
    return presentation;
  }

  const newSlideObjArray = presentation.slides[slideArrayID].slideObjects.filter((slideObj) => slideObj.id != slideObjID);
  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray,
  };

  return {
    ...presentation,
    slides: newSlidesArray,
  };
}
type RemoveSlideObjectProps = {
  slideID: string;
  slideObjID: string;
};

function addSlideObject(
  presentation: Presentation,
  { slideID, type, src, slideObjID, x = 100, y = 100, w = 100, h = 100, text }: AddSlideObjectProps,
): Presentation {
  const slideArrayID: number = presentation.slides.findIndex((slide) => slide.id === slideID);
  if (slideArrayID == -1) {
    console.error("ID error: SlideID not found in Slides array. SlideID=", slideID);
    return presentation;
  }

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.length;
  let slideObj: SlideObj;

  console.log("ID", slideObjID);
  if (type == "image" && src != null) {
    slideObj = {
      type: "image",
      x: x,
      y: y,
      w: w,
      h: h,
      id: slideObjID,
      src: src,
    };
  } else if (text) {
    slideObj = {
      type: "text",
      text: text,
      font_size: 14,
      font_family: "Arial",
      x: x,
      y: y,
      w: w,
      h: h,
      id: slideObjID,
    };
  } else {
    return presentation;
  }

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray.splice(slideObjArrayID, 0, slideObj);

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray,
  };

  return {
    ...presentation,
    slides: newSlidesArray,
  };
}
type AddSlideObjectProps = {
  slideID: string;
  type: string;
  src: string | null;
  slideObjID: string;
  x: number | undefined;
  y: number | undefined;
  w: number | undefined;
  h: number | undefined;
  text: string | undefined;
};

function changeLayerSlideObj(presentation: Presentation, { slideID, slideObjID, biasSlideObj }: ChangeLayerSlideObjProps): Presentation {
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
  if (slideArrayID == -1) {
    console.error("ID error: SlideID not found in Slides array. SlideID=", slideID);
    return presentation;
  }

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error("ID error: SlideObjID not found in SlideObjects array. SlideObjID=", slideID);
    return presentation;
  }
  const newSlideObjArrayID = biasSlideObj < 0 ? slideObjArrayID + biasSlideObj : slideObjArrayID + biasSlideObj + 1;

  const newSlideObjects = [...presentation.slides[slideArrayID].slideObjects];

  const cloneSlideObj = { ...newSlideObjects[slideObjArrayID] };
  newSlideObjects.splice(newSlideObjArrayID, 0, cloneSlideObj);
  if (slideObjArrayID <= newSlideObjArrayID) {
    newSlideObjects.splice(slideObjArrayID, 1);
  } else {
    newSlideObjects.splice(slideObjArrayID + 1, 1);
  }

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjects,
  };

  return {
    ...presentation,
    slides: newSlidesArray,
  };
}
type ChangeLayerSlideObjProps = {
  slideID: string;
  slideObjID: string;
  biasSlideObj: number;
};

// изменение позиции текста/картинки
function setPosition(presentation: Presentation, { slideID, slideObjID, x, y }: SetPositionProps): Presentation {
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id == slideID);
  if (slideArrayID == -1) {
    console.error("ID error: SlideID not found in Slides array. SlideID=", slideID);
    return presentation;
  }

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error("ID error: SlideObjID not found in SlideObjects array. SlideObjID=", slideID);
    return presentation;
  }

  const selectedObj = presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  const editedSlideObject = {
    ...selectedObj,
    x: x,
    y: y,
  };

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray[slideObjArrayID] = editedSlideObject;

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray,
  };

  return {
    ...presentation,
    slides: newSlidesArray,
  };
}
type SetPositionProps = {
  slideID: string;
  slideObjID: string;
  x: number;
  y: number;
};

// изменение позиции текста/картинки на определённое смещение
function displaceSlideObj(presentation: Presentation, { slideID, slideObjectsID, shift }: displaceSlideObjProps): Presentation {
  console.log("Передвигаем", slideObjectsID);
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
  if (slideArrayID == -1) {
    console.error("ID error: SlideID not found in Slides array. SlideID=", slideID);
    return presentation;
  }
  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  const newSlidesArray = [...presentation.slides];

  for (let slideObjID of slideObjectsID) {
    const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
    if (slideObjArrayID == -1) {
      console.error("ID error: SlideObjID not found in SlideObjects array. SlideObjID=", slideID);
      return presentation;
    }

    const selectedObj = presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
    const editedSlideObject = {
      ...selectedObj,
      x: selectedObj.x + shift.x,
      y: selectedObj.y + shift.y,
    };

    newSlideObjArray[slideObjArrayID] = editedSlideObject;

    newSlidesArray[slideArrayID] = {
      ...newSlidesArray[slideArrayID],
      slideObjects: newSlideObjArray,
    };
  }

  return {
    ...presentation,
    slides: newSlidesArray,
  };
}
type displaceSlideObjProps = {
  slideID: string;
  slideObjectsID: string[];
  shift: { x: number; y: number };
};

// изменение размера текста/картинки
function setSize(presentation: Presentation, { slideID, slideObjID, w, h }: SetSizeProps): Presentation {
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
  if (slideArrayID == -1) {
    console.error("ID error: SlideID not found in Slides array. SlideID=", slideID);
    return presentation;
  }

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error("ID error: SlideObjID not found in SlideObjects array. SlideObjID=", slideID);
    return presentation;
  }

  const selectedObj = presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  const editedSlideObject = {
    ...selectedObj,
    w: w,
    h: h,
  };

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray[slideObjArrayID] = editedSlideObject;

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray,
  };

  return {
    ...presentation,
    slides: newSlidesArray,
  };
}
type SetSizeProps = {
  slideID: string;
  slideObjID: string;
  w: number;
  h: number;
};

// изменение текста
function setContent(presentation: Presentation, { slideID, slideObjID, text }: SetContentProps): Presentation {
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
  if (slideArrayID == -1) {
    console.error("ID error: SlideID not found in Slides array. SlideID=", slideID);
    return presentation;
  }

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error("ID error: SlideObjID not found in SlideObjects array. SlideObjID=", slideID);
    return presentation;
  }

  const selectedObj = presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  if (selectedObj.type != "text") {
    console.error("Type error: The selected SlideObj isn't a text. SlideID:", slideID, "SlideObjID:", slideObjID);
    return presentation;
  }

  const editedSlideObject = {
    ...selectedObj,
    text: text,
  };

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray[slideObjArrayID] = editedSlideObject;

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray,
  };

  return {
    ...presentation,
    slides: newSlidesArray,
  };
}
type SetContentProps = {
  slideID: string;
  slideObjID: string;
  text: string;
};

// изменение размера текста
function setFontSize(presentation: Presentation, { slideID, slideObjID, size }: SetFontSizeProps): Presentation {
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
  if (slideArrayID == -1) {
    console.error("ID error: SlideID not found in Slides array. SlideID=", slideID);
    return presentation;
  }

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error("ID error: SlideObjID not found in SlideObjects array. SlideObjID=", slideID);
    return presentation;
  }

  const selectedObj = presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  if (selectedObj.type != "text") {
    console.error("Type error: The selected SlideObj isn't a text. SlideID:", slideID, "SlideObjID:", slideObjID);
    return presentation;
  }

  const editedSlideObject = {
    ...selectedObj,
    font_size: size,
  };

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray[slideObjArrayID] = editedSlideObject;

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray,
  };

  return {
    ...presentation,
    slides: newSlidesArray,
  };
}
type SetFontSizeProps = {
  slideID: string;
  slideObjID: string;
  size: number;
};

// изменение семейства шрифтов у текста
function setFontFamily(presentation: Presentation, { slideID, slideObjID, font_family }: SetFontFamilyProps): Presentation {
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
  if (slideArrayID == -1) {
    console.error("ID error: SlideID not found in Slides array. SlideID=", slideID);
    return presentation;
  }

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error("ID error: SlideObjID not found in SlideObjects array. SlideObjID=", slideID);
    return presentation;
  }

  const selectedObj = presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  if (selectedObj.type != "text") {
    console.error("Type error: The selected SlideObj isn't a text. SlideID:", slideID, "SlideObjID:", slideObjID);
    return presentation;
  }

  const editedSlideObject = {
    ...selectedObj,
    font_family: font_family,
  };

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray[slideObjArrayID] = editedSlideObject;

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray,
  };

  return {
    ...presentation,
    slides: newSlidesArray,
  };
}
type SetFontFamilyProps = {
  slideID: string;
  slideObjID: string;
  font_family: string;
};

// изменение фона слайда
function setBackground(presentation: Presentation, { slideID, src, color }: SetBackgroundProps): Presentation {
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
  if (slideArrayID == -1) {
    console.error("ID error: SlideID not found in Slides array. SlideID=", slideID);
    return presentation;
  }

  const newSlideArray = [...presentation.slides];

  if (src != null) {
    const newBackground: Background = {
      type: "image",
      src: src,
    };
    const newSlide = {
      ...presentation.slides[slideArrayID],
      background: newBackground,
    };

    newSlideArray[slideArrayID] = newSlide;
  } else if (color != null) {
    const newBackground: Background = {
      type: "color",
      color: color,
    };
    const newSlide = {
      ...presentation.slides[slideArrayID],
      background: newBackground,
    };

    newSlideArray[slideArrayID] = newSlide;
  }
  return {
    ...presentation,
    slides: newSlideArray,
  };
}
type SetBackgroundProps = {
  slideID: string;
  src: string | null;
  color: string | null;
};

// Добавление слайдов в SelectionSlide
function setSlideAsSelected(presentation: Presentation, { slideID }: setSlideAs): Presentation {
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id == slideID);
  const isExist = presentation.selection.selectedSlideID.findIndex((slideArrayID) => slideArrayID == slideID);

  if (slideArrayID == -1) {
    console.error("ID Error: SlideID for select that slide isn't exist, SlideID:", slideID);
    return presentation;
  }

  if (isExist != -1) {
    console.log("Существует", isExist);
    return presentation;
  }

  const newSelectedSlidesArray = [...presentation.selection.selectedSlideID];
  newSelectedSlidesArray.push(slideID);

  return {
    ...presentation,
    selection: {
      ...presentation.selection,
      selectedSlideID: newSelectedSlidesArray,
    },
  };
}
type setSlideAs = {
  slideID: string;
};

// Удаление слайдов в SelectionSlide
function setSlideAsUnselected(presentation: Presentation, { slideID }: setSlideAs): Presentation {
  const newSelectedSlidesArray = presentation.selection.selectedSlideID.filter((selectedID) => selectedID != slideID);

  return {
    ...presentation,
    selection: {
      ...presentation.selection,
      selectedSlideID: newSelectedSlidesArray,
    },
  };
}

// Добавление Слайд Объекта в SelectionSlideObj
function setSlideObjAsSelected(presentation: Presentation, { slideObjID }: setSlideObjectAs): Presentation {
  const selectedSlide = presentation.selection.selectedSlideID;
  if (!selectedSlide.length) {
    console.error("В слайде нет объектов");
    return presentation;
  }
  const selectedSlideID = selectedSlide[selectedSlide.length - 1];
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id == selectedSlideID);
  if (slideArrayID == -1) {
    console.error("Выделенным слайд с таким  SlideID не найден:", selectedSlideID);
  }

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id == slideObjID);
  if (slideObjArrayID == -1) {
    console.error(
      "ID Error: SlideObj wiht SlideObjID:",
      slideObjID,
      "doesn't exist in Slide with SlideID:",
      presentation.slides[selectedSlide.length - 1].id,
    );
    return presentation;
  }
  const isExist = presentation.selection.selectedObjectID.find((id) => id === slideObjID);
  if (isExist) {
    console.error("Tries to mark this slideObj twice slideObj:", slideObjID);
    return presentation;
  }

  const newSelectedSlideObjArray = [...presentation.selection.selectedObjectID];
  newSelectedSlideObjArray.push(slideObjID);

  return {
    ...presentation,
    selection: {
      ...presentation.selection,
      selectedObjectID: newSelectedSlideObjArray,
    },
  };
}
type setSlideObjectAs = {
  slideObjID: string;
};

//Выделить все слайды с и по
function selectSlideFromTo(presentation: Presentation, { startSlideID, endSlideID }: SelectFromToProps): Presentation {
  const startSlideArrayID = presentation.slides.findIndex((slide) => slide.id == startSlideID);
  const endSlideArrayID = presentation.slides.findIndex((slide) => slide.id == endSlideID);

  if (startSlideArrayID < endSlideArrayID) {
    for (let id = startSlideArrayID; id <= endSlideArrayID; ++id) {
      presentation = setSlideAsSelected(presentation, {
        slideID: presentation.slides[id].id,
      });
    }
  } else {
    for (let id = startSlideArrayID; id >= endSlideArrayID; --id) {
      presentation = setSlideAsSelected(presentation, {
        slideID: presentation.slides[id].id,
      });
    }
  }
  return presentation;
}
type SelectFromToProps = {
  startSlideID: string;
  endSlideID: string;
};

// Удаление Слайд Объекта в SelectionSlide
function setSlideObjAsUnselected(presentation: Presentation, { slideObjID }: setSlideObjectAs): Presentation {
  const slideID = presentation.selection.selectedSlideID[0];
  const slideArrayID = presentation.slides.findIndex((slide) => slide.id == slideID);
  if (slideArrayID == -1) {
    console.error("Слайда с таким slideID не существует:", slideID);
    return presentation;
  }

  const newSelectedSlideObjArray = presentation.selection.selectedObjectID.filter((selectedID) => selectedID != slideObjID);

  return {
    ...presentation,
    selection: {
      ...presentation.selection,
      selectedObjectID: newSelectedSlideObjArray,
    },
  };
}

function clearSlideSelected(presentation: Presentation, {}): Presentation {
  presentation.selection.selectedSlideID = [];
  return presentation;
}

function clearSlideObjSelected(presentation: Presentation, {}): Presentation {
  presentation.selection.selectedObjectID = [];
  return presentation;
}

const blankSlide: Slide = {
  id: "0",
  background: {
    color: "white",
    type: "color",
  },
  slideObjects: [
    {
      type: "text",
      text: "Enter your text",
      font_family: "Courier New",
      font_size: 14,
      x: 0,
      y: 100,
      w: 50,
      h: 100,
      id: "0",
    },
  ],
};

export {
  blankSlide,
  changeTitle,
  removeSlide,
  addSlide,
  changeLayer,
  removeSlideObject,
  addSlideObject,
  changeLayerSlideObj,
  setPosition,
  setSize,
  setContent,
  setFontSize,
  setFontFamily,
  setBackground,
  setSlideAsSelected,
  setSlideAsUnselected,
  setSlideObjAsSelected,
  setSlideObjAsUnselected,
  clearSlideSelected,
  clearSlideObjSelected,
  selectSlideFromTo,
  displaceSlideObj,
};
