interface Array<T> {
  findIndex(predicate: (value: T, index: number, obj: T[]) => boolean): number;
}

type BaseSlideObject = {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
};

export type TextPlain = BaseSlideObject & {
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

export type Picture = BaseSlideObject & Image;
export type SlideObj = TextPlain | Picture;
type Background = Color | Image;

//Слайд,
export type Slide = {
  slideObjects: SlideObj[];
  background: Background;
  id: string;
};

//Выделение.
type SelectionElt = {
  selectedSlideID: number[];
  selectedObjectID: number[];
};

//Презентация,
export type Presentation = SelectionElt & {
  slides: Slide[];
  title: string;
};

//шрифты могут поддерживать bold regular и т.д.

function getUniqID(): string {
  const uniqID: string = Date.now().toString(36) + Math.random().toString(36);
  return uniqID;
}

// изменение названия презентации
function changeTitle(presentation: Presentation, name: string): Presentation {
  const newPresentation: Presentation = { 
    ...presentation,
    title: name
  };
  return newPresentation;
}

// добавление/удаление слайда
function removeSlide(presentation: Presentation, slideID: string): Presentation {
  const newSlidesArray = presentation.slides.filter((slide) => slide.id != slideID);
  
  return { 
    ...presentation,
    slides: newSlidesArray
  };
}

function addSlide(presentation: Presentation, slide: Slide, slideID: string, insertionID: string | null = null): Presentation {
  const SlideExist = presentation.slides.findIndex(
    (slide) => slide.id === slideID,
  );
  if (SlideExist != -1) {
    console.error(
      "ID Error: This slide has been already exist. slideID=",
      slideID,
    );
    return presentation;
  };

  const newSlide = {
    ...slide, 
    id: slideID
  };

  const editedSlidesArray = [...presentation.slides];
  if (insertionID == null) {
    editedSlidesArray.push(newSlide);
  }
  else {
    const slideArrayInsertionID = presentation.slides.findIndex(
      (slide) => slide.id === insertionID,
    );
    if (slideArrayInsertionID == -1) {
      console.error(
        "ID Error: slideID for insert slide not found. slideID=",
        insertionID,
      );
      return presentation;
    }

    editedSlidesArray.splice(slideArrayInsertionID, 0, slide);
  }
  
  return { 
    ...presentation, 
    slides: editedSlidesArray
  };
}

// изменение позиции слайда

function changeLayer(presentation: Presentation, slideID: string, biasSlide: number): Presentation {
  const slideArrayID = presentation.slides.findIndex(
    (slide) => slide.id === slideID,
  );
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  };

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
    slides: newSlidesArray
  };
}

// добавление/удаление текста и картинки
function removeSlideObject(presentation: Presentation, slideID: string, slideObjID: string): Presentation {
  const slideArrayID = presentation.slides.findIndex(
    (slide) => slide.id === slideID,
  );
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }

  const newSlideObjArray = presentation.slides[slideArrayID].slideObjects.filter((slideObj) => slideObj.id != slideObjID);
  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray
  };

  return {
    ...presentation,
    slides: newSlidesArray
  };
}

function addSlideObject(presentation: Presentation, slideID: string, type: string, src: string | null, slideObjID: string): Presentation {
  const slideArrayID: number = presentation.slides.findIndex(
    (slide) => slide.id === slideID,
  );
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.length;
  let slideObj: SlideObj;

  if (type == "image" && src != null) {
    slideObj = {
      type: "image",
      x: 100,
      y: 100,
      w: 100,
      h: 100,
      id: slideObjID,
      src: src,
    };
  } else {
    slideObj = {
      type: "text",
      text: "Enter your text",
      font_size: 14,
      font_family: "Arial",
      x: 100,
      y: 100,
      w: 100,
      h: 100,
      id: slideObjID,
    };
  };

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray.splice(slideObjArrayID, 0, slideObj);

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray
  }

  return {
    ...presentation,
    slides: newSlidesArray
  };
}

function changeLayerSlideObj(presentation: Presentation, slideID: string, slideObjID: string, biasSlideObj: number): Presentation {
  const slideArrayID = presentation.slides.findIndex(
    (slide) => slide.id === slideID,
  );
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }
  const newSlideObjArrayID =
    biasSlideObj < 0
      ? slideObjArrayID + biasSlideObj
      : slideObjArrayID + biasSlideObj + 1;

  const newSlideObjects = [...presentation.slides[slideArrayID].slideObjects];

  const cloneSlideObj = { ...newSlideObjects[slideObjArrayID]};
  newSlideObjects.splice(newSlideObjArrayID, 0, cloneSlideObj);
  if (slideObjArrayID <= newSlideObjArrayID) {
    newSlideObjects.splice(slideObjArrayID, 1);
  } else {
    newSlideObjects.splice(slideObjArrayID + 1, 1);
  }

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjects
  }

  return {
    ...presentation,
    slides: newSlidesArray
  };
}

// изменение позиции текста/картинки
function setPosition(presentation: Presentation, slideID: string, slideObjID: string, x: number, y: number): Presentation {
  const slideArrayID = presentation.slides.findIndex(
    (slide) => slide.id === slideID,
  );
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  };

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }

  const selectedObj = presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  const editedSlideObject = {
    ...selectedObj,
    x: x,
    y: y
  }

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray[slideObjArrayID] = editedSlideObject;

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray
  }
  
  return {
    ...presentation,
    slides: newSlidesArray
  };
}

// изменение размера текста/картинки
function setSize(
  presentation: Presentation,
  slideID: string,
  slideObjID: string,
  w: number,
  h: number,
): Presentation {
  const slideArrayID = presentation.slides.findIndex(
    (slide) => slide.id === slideID,
  );
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  };

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }

  const selectedObj = presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  const editedSlideObject = {
    ...selectedObj,
    w: w,
    h: h
  }

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray[slideObjArrayID] = editedSlideObject;

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray
  }
  
  return {
    ...presentation,
    slides: newSlidesArray
  };
}

// изменение текста
function setContent(
  presentation: Presentation,
  slideID: string,
  slideObjID: string,
  text: string,
): Presentation {
  const slideArrayID = presentation.slides.findIndex(
    (slide) => slide.id === slideID,
  );
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  };

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }

  const selectedObj = presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  if (selectedObj.type != 'text') {
    console.error("Type error: The selected SlideObj isn't a text. SlideID:", slideID, "SlideObjID:", slideObjID);
    return presentation;
  }

  const editedSlideObject = {
    ...selectedObj,
    text: text,
  }

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray[slideObjArrayID] = editedSlideObject;

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray
  }
  
  return {
    ...presentation,
    slides: newSlidesArray
  };
}

// изменение размера текста
function setFontSize(
  presentation: Presentation,
  slideID: string,
  slideObjID: string,
  size: number,
): Presentation {
    const slideArrayID = presentation.slides.findIndex(
    (slide) => slide.id === slideID,
  );
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  };

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }

  const selectedObj = presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  if (selectedObj.type != 'text') {
    console.error("Type error: The selected SlideObj isn't a text. SlideID:", slideID, "SlideObjID:", slideObjID);
    return presentation;
  }
  
  const editedSlideObject = {
    ...selectedObj,
    font_size: size,
  }

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray[slideObjArrayID] = editedSlideObject;

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray
  }
  
  return {
    ...presentation,
    slides: newSlidesArray
  };
}

// изменение семейства шрифтов у текста
function setFontFamily(
  presentation: Presentation,
  slideID: string,
  slideObjID: string,
  font_family: string,
): Presentation {
      const slideArrayID = presentation.slides.findIndex(
    (slide) => slide.id === slideID,
  );
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  };

  const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }

  const selectedObj = presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  if (selectedObj.type != 'text') {
    console.error("Type error: The selected SlideObj isn't a text. SlideID:", slideID, "SlideObjID:", slideObjID);
    return presentation;
  }
  
  const editedSlideObject = {
    ...selectedObj,
    font_family: font_family,
  }

  const newSlideObjArray = [...presentation.slides[slideArrayID].slideObjects];
  newSlideObjArray[slideObjArrayID] = editedSlideObject;

  const newSlidesArray = [...presentation.slides];
  newSlidesArray[slideArrayID] = {
    ...newSlidesArray[slideArrayID],
    slideObjects: newSlideObjArray
  }
  
  return {
    ...presentation,
    slides: newSlidesArray
  };
}

// изменение фона слайда
function setBackground(
  presentation: Presentation,
  slideID: string,
  src: string | null = null,
  color: string | null = null,
): Presentation {
  const slideArrayID = presentation.slides.findIndex(
    (slide) => slide.id === slideID,
  );
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
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
      background: newBackground
    };

    newSlideArray[slideArrayID] = newSlide;
  } else if (color != null) {
    const newBackground: Background = {
      type: "color",
      color: color,
    };
    const newSlide = {
      ...presentation.slides[slideArrayID],
      background: newBackground
    };

    newSlideArray[slideArrayID] = newSlide;
  }
  return {
    ...presentation,
    slides: newSlideArray
  };
}
// Функции не должны менять передаваемые параметры.

const presentationMax: Presentation = {
  title: "TestMaximalDataSet",
  slides: [],
  selectedObjectID: [],
  selectedSlideID: [],
};

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

//const fs = require("fs");

function TestPresentationMax(presentationMax: Presentation) {
  presentationMax = addSlide(presentationMax, blankSlide, "0");
  presentationMax = addSlide(presentationMax, blankSlide, "1");
  presentationMax = addSlide(presentationMax, blankSlide, "2");
  presentationMax = addSlide(presentationMax, blankSlide, "3");
  presentationMax = addSlide(presentationMax, blankSlide, "4");
  presentationMax = addSlide(presentationMax, blankSlide, "5");
  presentationMax = addSlide(presentationMax, blankSlide, "6");
  presentationMax = addSlide(presentationMax, blankSlide, "7");
  presentationMax = addSlide(presentationMax, blankSlide, "8");
  presentationMax = addSlide(presentationMax, blankSlide, "9");

  presentationMax = addSlideObject(
    presentationMax,
    "0",
    "image",
    "https://setImage.png",
    "1",
  );
  presentationMax = addSlideObject(presentationMax, "0", "text", null, "2");
  presentationMax = addSlideObject(presentationMax, "0", "text", null, "3");
  presentationMax = addSlideObject(presentationMax, "0", "text", null, "4");
  presentationMax = setPosition(presentationMax, "0", "2", 450, 500);
  presentationMax = setPosition(presentationMax, "0", "3", 400, 500);
  presentationMax = setPosition(presentationMax, "0", "4", 300, 500);
  presentationMax = addSlideObject(
    presentationMax,
    "0",
    "image",
    "https://setImage.png",
    "5",
  );
  presentationMax = setPosition(presentationMax, "0", "5", 200, 500);
  presentationMax = setSize(presentationMax, "0", "5", 200, 500);
  const data_json = JSON.stringify(presentationMax);
  fs.writeFile("PresentationMax.json", data_json, () => {
    console.log("Json has been saved");
  });
}

function TestPresentationMin(presentationMin: Presentation) {
  presentationMin = addSlide(presentationMin, blankSlide, "0");
  presentationMin = addSlide(presentationMin, blankSlide, "1");
  presentationMin = setBackground(presentationMin, "0", null, "red");
  console.log("0: Backgroung has been colored", presentationMin);
  presentationMin = setBackground(
    presentationMin,
    "0",
    "http://image.png",
    null,
  );
  console.log("0: Backgroung is picture", presentationMin);
  presentationMin = addSlide(presentationMin, blankSlide, "2");
  console.log("2: The Slide has been added", presentationMin);
  presentationMin = changeLayer(presentationMin, "0", 1);
  console.log("0, 1: Slides has been replaced", presentationMin);
  presentationMin = changeTitle(
    presentationMin,
    "Test to change title of slide",
  );
  console.log("The title of presentation has been changed", presentationMin);
  presentationMin = setFontFamily(presentationMin, "0", "0", "Arial");
  console.log("0_0 : The FontFamily has been set to Arial", presentationMin);
  presentationMin = setFontSize(presentationMin, "0", "0", 20);
  console.log("0_0 : The FontSize is set to 20", presentationMin);
  presentationMin = setContent(
    presentationMin,
    "0",
    "0",
    "Test to change the text",
  );
  console.log("0_0 : The content of text has been changed", presentationMin);
  presentationMin = setSize(presentationMin, "0", "0", 500, 500);
  console.log("0_0 : The content box has been resized", presentationMin);
  presentationMin = setPosition(presentationMin, "0", "0", 500, 500);
  console.log("0_0 : The content box has been relocated", presentationMin);
  presentationMin = addSlideObject(
    presentationMin,
    "0",
    "image",
    "https://setImage.png",
    "1",
  );
  console.log("0 : The image has been added to slide", presentationMin);
  presentationMin = changeLayerSlideObj(presentationMin, "0", "0", 1);
  console.log("0_0 0_1 : The slideObjects has been replaced", presentationMin);
  presentationMin = removeSlideObject(presentationMin, "0", "1");
  console.log("0_1 : The picture has been deleted", presentationMin);
  presentationMin = removeSlide(presentationMin, "0");
  console.log(
    "0 : The slide with SlideID: 0  has been deleted",
    presentationMin,
  );
}

TestPresentationMin(presentationMax);

//autosave настроить
