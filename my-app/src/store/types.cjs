"use strict";
// interface Array<T> {
//   findIndex(predicate: (value: T, index: number, obj: T[]) => boolean): number;
// }
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };

//шрифты могут поддерживать bold regular и т.д.
function getUniqID() {
  var uniqID = Date.now().toString(36) + Math.random().toString(36);
  return uniqID;
}
// изменение названия презентации
function changeTitle(presentation, name) {
  var newPresentation = __assign(__assign({}, presentation), { title: name });
  return newPresentation;
}
// добавление/удаление слайда
function removeSlide(presentation, slideID) {
  var newSlidesArray = presentation.slides.filter(function (slide) {
    return slide.id != slideID;
  });
  return __assign(__assign({}, presentation), { slides: newSlidesArray });
}
function addSlide(presentation, slide, slideID, insertionID) {
  if (insertionID === void 0) {
    insertionID = null;
  }
  var SlideExist = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (SlideExist != -1) {
    console.error(
      "ID Error: This slide has been already exist. slideID=",
      slideID,
    );
    return presentation;
  }
  var newSlide = __assign(__assign({}, slide), { id: slideID });
  var editedSlidesArray = __spreadArray([], presentation.slides, true);
  if (insertionID == null) {
    editedSlidesArray.push(newSlide);
  } else {
    var slideArrayInsertionID = presentation.slides.findIndex(function (slide) {
      return slide.id === insertionID;
    });
    if (slideArrayInsertionID == -1) {
      console.error(
        "ID Error: slideID for insert slide not found. slideID=",
        insertionID,
      );
      return presentation;
    }
    editedSlidesArray.splice(slideArrayInsertionID, 0, slide);
  }
  return __assign(__assign({}, presentation), { slides: editedSlidesArray });
}
// изменение позиции слайда
function changeLayer(presentation, slideID, biasSlide) {
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }
  var slideForChange = presentation.slides[slideArrayID];
  var newSlideArrayID =
    biasSlide < 0 ? slideArrayID + biasSlide : slideArrayID + biasSlide + 1;
  var newSlidesArray = __spreadArray([], presentation.slides, true);
  newSlidesArray.splice(newSlideArrayID, 0, slideForChange);
  if (slideArrayID <= newSlideArrayID) {
    newSlidesArray.splice(slideArrayID, 1);
  } else {
    newSlidesArray.splice(slideArrayID + 1, 1);
  }
  return __assign(__assign({}, presentation), { slides: newSlidesArray });
}
// добавление/удаление текста и картинки
function removeSlideObject(presentation, slideID, slideObjID) {
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }
  var newSlideObjArray = presentation.slides[slideArrayID].slideObjects.filter(
    function (slideObj) {
      return slideObj.id != slideObjID;
    },
  );
  var newSlidesArray = __spreadArray([], presentation.slides, true);
  newSlidesArray[slideArrayID] = __assign(
    __assign({}, newSlidesArray[slideArrayID]),
    { slideObjects: newSlideObjArray },
  );
  return __assign(__assign({}, presentation), { slides: newSlidesArray });
}
function addSlideObject(presentation, slideID, type, src, slideObjID) {
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }
  var slideObjArrayID = presentation.slides[slideArrayID].slideObjects.length;
  var slideObj;
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
  }
  var newSlideObjArray = __spreadArray(
    [],
    presentation.slides[slideArrayID].slideObjects,
    true,
  );
  newSlideObjArray.splice(slideObjArrayID, 0, slideObj);
  var newSlidesArray = __spreadArray([], presentation.slides, true);
  newSlidesArray[slideArrayID] = __assign(
    __assign({}, newSlidesArray[slideArrayID]),
    { slideObjects: newSlideObjArray },
  );
  return __assign(__assign({}, presentation), { slides: newSlidesArray });
}
function changeLayerSlideObj(presentation, slideID, slideObjID, biasSlideObj) {
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }
  var slideObjArrayID = presentation.slides[
    slideArrayID
  ].slideObjects.findIndex(function (slideObj) {
    return slideObj.id === slideObjID;
  });
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }
  var newSlideObjArrayID =
    biasSlideObj < 0
      ? slideObjArrayID + biasSlideObj
      : slideObjArrayID + biasSlideObj + 1;
  var newSlideObjects = __spreadArray(
    [],
    presentation.slides[slideArrayID].slideObjects,
    true,
  );
  var cloneSlideObj = __assign({}, newSlideObjects[slideObjArrayID]);
  newSlideObjects.splice(newSlideObjArrayID, 0, cloneSlideObj);
  if (slideObjArrayID <= newSlideObjArrayID) {
    newSlideObjects.splice(slideObjArrayID, 1);
  } else {
    newSlideObjects.splice(slideObjArrayID + 1, 1);
  }
  var newSlidesArray = __spreadArray([], presentation.slides, true);
  newSlidesArray[slideArrayID] = __assign(
    __assign({}, newSlidesArray[slideArrayID]),
    { slideObjects: newSlideObjects },
  );
  return __assign(__assign({}, presentation), { slides: newSlidesArray });
}
// изменение позиции текста/картинки
function setPosition(presentation, slideID, slideObjID, x, y) {
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }
  var slideObjArrayID = presentation.slides[
    slideArrayID
  ].slideObjects.findIndex(function (slideObj) {
    return slideObj.id === slideObjID;
  });
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }
  var selectedObj =
    presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  var editedSlideObject = __assign(__assign({}, selectedObj), { x: x, y: y });
  var newSlideObjArray = __spreadArray(
    [],
    presentation.slides[slideArrayID].slideObjects,
    true,
  );
  newSlideObjArray[slideObjArrayID] = editedSlideObject;
  var newSlidesArray = __spreadArray([], presentation.slides, true);
  newSlidesArray[slideArrayID] = __assign(
    __assign({}, newSlidesArray[slideArrayID]),
    { slideObjects: newSlideObjArray },
  );
  return __assign(__assign({}, presentation), { slides: newSlidesArray });
}
// изменение размера текста/картинки
function setSize(presentation, slideID, slideObjID, w, h) {
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }
  var slideObjArrayID = presentation.slides[
    slideArrayID
  ].slideObjects.findIndex(function (slideObj) {
    return slideObj.id === slideObjID;
  });
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }
  var selectedObj =
    presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  var editedSlideObject = __assign(__assign({}, selectedObj), { w: w, h: h });
  var newSlideObjArray = __spreadArray(
    [],
    presentation.slides[slideArrayID].slideObjects,
    true,
  );
  newSlideObjArray[slideObjArrayID] = editedSlideObject;
  var newSlidesArray = __spreadArray([], presentation.slides, true);
  newSlidesArray[slideArrayID] = __assign(
    __assign({}, newSlidesArray[slideArrayID]),
    { slideObjects: newSlideObjArray },
  );
  return __assign(__assign({}, presentation), { slides: newSlidesArray });
}
// изменение текста
function setContent(presentation, slideID, slideObjID, text) {
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }
  var slideObjArrayID = presentation.slides[
    slideArrayID
  ].slideObjects.findIndex(function (slideObj) {
    return slideObj.id === slideObjID;
  });
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }
  var selectedObj =
    presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  if (selectedObj.type != "text") {
    console.error(
      "Type error: The selected SlideObj isn't a text. SlideID:",
      slideID,
      "SlideObjID:",
      slideObjID,
    );
    return presentation;
  }
  var editedSlideObject = __assign(__assign({}, selectedObj), { text: text });
  var newSlideObjArray = __spreadArray(
    [],
    presentation.slides[slideArrayID].slideObjects,
    true,
  );
  newSlideObjArray[slideObjArrayID] = editedSlideObject;
  var newSlidesArray = __spreadArray([], presentation.slides, true);
  newSlidesArray[slideArrayID] = __assign(
    __assign({}, newSlidesArray[slideArrayID]),
    { slideObjects: newSlideObjArray },
  );
  return __assign(__assign({}, presentation), { slides: newSlidesArray });
}
// изменение размера текста
function setFontSize(presentation, slideID, slideObjID, size) {
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }
  var slideObjArrayID = presentation.slides[
    slideArrayID
  ].slideObjects.findIndex(function (slideObj) {
    return slideObj.id === slideObjID;
  });
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }
  var selectedObj =
    presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  if (selectedObj.type != "text") {
    console.error(
      "Type error: The selected SlideObj isn't a text. SlideID:",
      slideID,
      "SlideObjID:",
      slideObjID,
    );
    return presentation;
  }
  var editedSlideObject = __assign(__assign({}, selectedObj), {
    font_size: size,
  });
  var newSlideObjArray = __spreadArray(
    [],
    presentation.slides[slideArrayID].slideObjects,
    true,
  );
  newSlideObjArray[slideObjArrayID] = editedSlideObject;
  var newSlidesArray = __spreadArray([], presentation.slides, true);
  newSlidesArray[slideArrayID] = __assign(
    __assign({}, newSlidesArray[slideArrayID]),
    { slideObjects: newSlideObjArray },
  );
  return __assign(__assign({}, presentation), { slides: newSlidesArray });
}
// изменение семейства шрифтов у текста
function setFontFamily(presentation, slideID, slideObjID, font_family) {
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }
  var slideObjArrayID = presentation.slides[
    slideArrayID
  ].slideObjects.findIndex(function (slideObj) {
    return slideObj.id === slideObjID;
  });
  if (slideObjArrayID == -1) {
    console.error(
      "ID error: SlideObjID not found in SlideObjects array. SlideObjID=",
      slideID,
    );
    return presentation;
  }
  var selectedObj =
    presentation.slides[slideArrayID].slideObjects[slideObjArrayID];
  if (selectedObj.type != "text") {
    console.error(
      "Type error: The selected SlideObj isn't a text. SlideID:",
      slideID,
      "SlideObjID:",
      slideObjID,
    );
    return presentation;
  }
  var editedSlideObject = __assign(__assign({}, selectedObj), {
    font_family: font_family,
  });
  var newSlideObjArray = __spreadArray(
    [],
    presentation.slides[slideArrayID].slideObjects,
    true,
  );
  newSlideObjArray[slideObjArrayID] = editedSlideObject;
  var newSlidesArray = __spreadArray([], presentation.slides, true);
  newSlidesArray[slideArrayID] = __assign(
    __assign({}, newSlidesArray[slideArrayID]),
    { slideObjects: newSlideObjArray },
  );
  return __assign(__assign({}, presentation), { slides: newSlidesArray });
}
// изменение фона слайда
function setBackground(presentation, slideID, src, color) {
  if (src === void 0) {
    src = null;
  }
  if (color === void 0) {
    color = null;
  }
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (slideArrayID == -1) {
    console.error(
      "ID error: SlideID not found in Slides array. SlideID=",
      slideID,
    );
    return presentation;
  }
  var newSlideArray = __spreadArray([], presentation.slides, true);
  if (src != null) {
    var newBackground = {
      type: "image",
      src: src,
    };
    var newSlide = __assign(__assign({}, presentation.slides[slideArrayID]), {
      background: newBackground,
    });
    newSlideArray[slideArrayID] = newSlide;
  } else if (color != null) {
    var newBackground = {
      type: "color",
      color: color,
    };
    var newSlide = __assign(__assign({}, presentation.slides[slideArrayID]), {
      background: newBackground,
    });
    newSlideArray[slideArrayID] = newSlide;
  }
  return __assign(__assign({}, presentation), { slides: newSlideArray });
}
// Добавление слайдов в SelectionSlide
function setSlideAsSelected(presentation, slideID) {
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (!slideArrayID) {
    console.error(
      "ID Error: SlideID for select that slide isn't exist, SlideID:",
      slideID,
    );
    return presentation;
  }
  var newSelectedSlidesArray = __spreadArray(
    [],
    presentation.selection.selectedSlideID,
    true,
  );
  newSelectedSlidesArray.push(slideID);
  return __assign(__assign({}, presentation), {
    selection: __assign(__assign({}, presentation.selection), {
      selectedSlideID: newSelectedSlidesArray,
    }),
  });
}
// Удаление слайдов в SelectionSlide
function setSlideAsUnselected(presentation, slideID) {
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  if (!slideArrayID) {
    console.error(
      "ID Error: SlideID for select that slide isn't exist, SlideID:",
      slideID,
    );
    return presentation;
  }
  var newSelectedSlidesArray = presentation.selection.selectedSlideID.filter(
    function (selectedID) {
      return selectedID != slideID;
    },
  );
  return __assign(__assign({}, presentation), {
    selection: __assign(__assign({}, presentation.selection), {
      selectedSlideID: newSelectedSlidesArray,
    }),
  });
}
// Добавление Слайд Объекта в SelectionSlideObj
function setSlideObjAsSelected(presentation, slideObjID) {
  var slideID = presentation.selection.selectedSlideID[0];
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  var slideObjArrayID = presentation.slides[
    slideArrayID
  ].slideObjects.findIndex(function (slideObj) {
    return slideObj.id === slideObjID;
  });
  if (!slideObjArrayID) {
    console.error(
      "ID Error: SlideObj wiht SlideObjID:",
      slideObjID,
      "doesn't exist in Slide with SlideID:",
      slideID,
    );
    return presentation;
  }
  var newSelectedSlideObjArray = __spreadArray(
    [],
    presentation.selection.selectedObjectID,
    true,
  );
  newSelectedSlideObjArray.push(slideObjID);
  return __assign(__assign({}, presentation), {
    selection: __assign(__assign({}, presentation.selection), {
      selectedSlideID: newSelectedSlideObjArray,
    }),
  });
}
// Удаление Слайд Объекта в SelectionSlide
function setSlideObjAsUnselected(presentation, slideObjID) {
  var slideID = presentation.selection.selectedSlideID[0];
  var slideArrayID = presentation.slides.findIndex(function (slide) {
    return slide.id === slideID;
  });
  var slideObjArrayID = presentation.slides[
    slideArrayID
  ].slideObjects.findIndex(function (slideObj) {
    return slideObj.id === slideObjID;
  });
  if (!slideObjArrayID) {
    console.error(
      "ID Error: SlideObj wiht SlideObjID:",
      slideObjID,
      "doesn't exist in Slide with SlideID:",
      slideID,
    );
    return presentation;
  }
  var newSelectedSlideObjArray = presentation.selection.selectedObjectID.filter(
    function (selectedID) {
      return selectedID != slideObjID;
    },
  );
  return __assign(__assign({}, presentation), {
    selection: __assign(__assign({}, presentation.selection), {
      selectedObjectID: newSelectedSlideObjArray,
    }),
  });
}
var presentationMax = {
  title: "TestMaximalDataSet",
  slides: [],
  selection: {
    selectedObjectID: [],
    selectedSlideID: [],
  },
};
var blankSlide = {
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

const fs = require("fs");

function TestPresentationMax(presentationMax) {
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

  presentationMax = setBackground(
    presentationMax,
    "1",
    "https://avatars.mds.yandex.net/i?id=605ad3dc45adebf385b090aa593e8b8a89aaaa91-5490649-images-thumbs&n=13",
  );
  presentationMax = setContent(presentationMax, "1", "0", "Они уже близко");
  presentationMax = setFontSize(presentationMax, "1", "0", 56);
  presentationMax = setPosition(
    presentationMax,
    "1",
    "0",
    1011 / 2 - 100,
    654 / 2 - 100,
  );

  presentationMax = addSlideObject(
    presentationMax,
    "2",
    "image",
    "https://avatars.mds.yandex.net/i?id=f6e09bde2405237379ccaba3503e4203223ab0ff-6298174-images-thumbs&n=13",
    "2",
  );
  presentationMax = setPosition(
    presentationMax,
    "2",
    "2",
    1011 / 2 - 100,
    654 / 2 - 100,
  );
  presentationMax = setSize(presentationMax, "2", "2", 250, 250);

  presentationMax = addSlideObject(
    presentationMax,
    "2",
    "image",
    "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-17/400/677/646/191/10/100055355046b0.png",
    "3",
  );
  presentationMax = setPosition(
    presentationMax,
    "2",
    "3",
    1011 / 2 - 200,
    654 / 2 - 200,
  );
  presentationMax = setSize(presentationMax, "2", "3", 250, 250);

  presentationMax = setPosition(
    presentationMax,
    "2",
    "0",
    1011 / 2,
    654 / 2 + 100,
  );
  presentationMax = setFontSize(presentationMax, "2", "0", 96);
  presentationMax = setSize(presentationMax, "2", "0", 1000, 120);

  presentationMax = setBackground(presentationMax, "0", null, "#6e750e");
  presentationMax = addSlideObject(
    presentationMax,
    "0",
    "image",
    "https://ts3.mm.bing.net/th?id=OIP.nRzTAfZoTeXvH3_ueUbqCgHaHa&pid=15.1",
    "1",
  );
  presentationMax = setSize(presentationMax, "0", "1", 400, 400);

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

  presentationMax = setSlideAsSelected(presentationMax, "1");

  const data_json = JSON.stringify(presentationMax);
  fs.writeFile("PresentationMax.json", data_json, () => {
    console.log("Json has been saved");
  });
}
// function TestPresentationMin(presentationMin) {
//     presentationMin = addSlide(presentationMin, blankSlide, "0");
//     presentationMin = addSlide(presentationMin, blankSlide, "1");
//     presentationMin = setBackground(presentationMin, "0", null, "red");
//     console.log("0: Backgroung has been colored", presentationMin);
//     presentationMin = setBackground(presentationMin, "0", "http://image.png", null);
//     console.log("0: Backgroung is picture", presentationMin);
//     presentationMin = addSlide(presentationMin, blankSlide, "2");
//     console.log("2: The Slide has been added", presentationMin);
//     presentationMin = changeLayer(presentationMin, "0", 1);
//     console.log("0, 1: Slides has been replaced", presentationMin);
//     presentationMin = changeTitle(presentationMin, "Test to change title of slide");
//     console.log("The title of presentation has been changed", presentationMin);
//     presentationMin = setFontFamily(presentationMin, "0", "0", "Arial");
//     console.log("0_0 : The FontFamily has been set to Arial", presentationMin);
//     presentationMin = setFontSize(presentationMin, "0", "0", 20);
//     console.log("0_0 : The FontSize is set to 20", presentationMin);
//     presentationMin = setContent(presentationMin, "0", "0", "Test to change the text");
//     console.log("0_0 : The content of text has been changed", presentationMin);
//     presentationMin = setSize(presentationMin, "0", "0", 500, 500);
//     console.log("0_0 : The content box has been resized", presentationMin);
//     presentationMin = setPosition(presentationMin, "0", "0", 500, 500);
//     console.log("0_0 : The content box has been relocated", presentationMin);
//     presentationMin = addSlideObject(presentationMin, "0", "image", "https://setImage.png", "1");
//     console.log("0 : The image has been added to slide", presentationMin);
//     presentationMin = changeLayerSlideObj(presentationMin, "0", "0", 1);
//     console.log("0_0 0_1 : The slideObjects has been replaced", presentationMin);
//     presentationMin = removeSlideObject(presentationMin, "0", "1");
//     console.log("0_1 : The picture has been deleted", presentationMin);
//     presentationMin = removeSlide(presentationMin, "0");
//     console.log("0 : The slide with SlideID: 0  has been deleted", presentationMin);
// }
TestPresentationMax(presentationMax);
