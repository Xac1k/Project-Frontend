type BaseSlideObject = {
    x: number;
    y: number;
    w: number;
    h: number;
    id: number;
} 

type TextPlain = BaseSlideObject & {
    text: string;
    font_size: number;
    font_family: string;
    type: 'text';
} 

type Color = {
    color: string;
    type: 'color';
}

type Image = {
    src: string;
    type: 'image';
}

type Picture = BaseSlideObject & Image;
type SlideObj = TextPlain | Picture; 

 

type Background = Color | Image;

//Слайд, 
type Slide = {  
    slideObjects: Array<SlideObj>; 
    background: Background;
    id: number;
}

//Выделение.
type SelectionElt = {
    selectedSlideID: Array<number>;
    selectedObjectID: Array<number>;
}

//Презентация, 
type Presentation = SelectionElt & {
    slides: Array<Slide>;
    title: string;
}

function updateSlideID(Array: Slide[]): Slide[] {
    let newArray: Slide[] = structuredClone(Array);
    for (let idx: number = 0; idx < Array.length; idx++) {
        newArray[idx].id = idx;
    }
    return newArray;
}

function updateSlideObjID(Array: SlideObj[]): SlideObj[]  {
    let newArray: SlideObj[] = structuredClone(Array);
    for (let idx:number = 0; idx < Array.length; idx++) {
        newArray[idx].id = idx;
    }
    return newArray;
}

// изменение названия презентации
function changeTitle(presentation: Presentation, name: string): Presentation {
    let newPresentation: Presentation  = structuredClone(presentation);
    newPresentation.title = name;
    return newPresentation;
}

// добавление/удаление слайда
function removeSlide(presentation: Presentation, slideID: number): Presentation {
    let newPresentation: Presentation  = structuredClone(presentation);
    if (slideID >= newPresentation.slides.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideID=', slideID);
        return newPresentation;
    }
    newPresentation.slides.splice(slideID, 1);
    newPresentation.slides = updateSlideID(newPresentation.slides);
    return newPresentation;
}

function addSlide(presentation: Presentation, slide: Slide, insertionID: number|null = null): Presentation {
    let newPresentation: Presentation  = structuredClone(presentation);
    if (insertionID == null) {
        newPresentation.slides.splice(newPresentation.slides.length, 0, slide);
    }
    else if (insertionID >= newPresentation.slides.length) {
        console.error('TypeError: ID overflow. That InsertionID is not found:', 'InsertionID=', insertionID);
        return newPresentation;
    }
    else {
        newPresentation.slides.splice(insertionID, 0, slide);
    }    
    newPresentation.slides = updateSlideID(newPresentation.slides);
    return newPresentation;
}

// изменение позиции слайда
function changeLayer(presentation: Presentation, slideID: number, insertionID: number): Presentation {
    let newPresentation: Presentation  = structuredClone(presentation);
    if (slideID >= newPresentation.slides.length){
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideID=', slideID);
        return newPresentation;
    }
    if (insertionID >= newPresentation.slides.length) { 
        console.error('TypeError: ID overflow. That insertionID is not found:', 'InsertionID=', insertionID);
        return newPresentation; 
    }
    newPresentation = addSlide(newPresentation, newPresentation.slides[slideID], insertionID + 1);
    if (insertionID >= slideID) {
        newPresentation = removeSlide(newPresentation, slideID);
    }
    else {
        newPresentation = removeSlide(newPresentation, slideID + 1);
    }
    newPresentation.slides = updateSlideID(newPresentation.slides);
    return newPresentation;
}

// добавление/удаление текста и картинки
function removeSlideObject(presentation: Presentation, slideID: number, slideObjID: number): Presentation {
    let newPresentation: Presentation  = structuredClone(presentation);
    if (slideID >= newPresentation.slides.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideID=', slideID);
        return newPresentation;
    }
    if (slideObjID >= newPresentation.slides[slideID].slideObjects.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideObjID=', slideID);
        return newPresentation;
    }
    newPresentation.slides[slideID].slideObjects.splice(slideObjID, 1);
    newPresentation.slides[slideID].slideObjects = updateSlideObjID(newPresentation.slides[slideID].slideObjects);
    return newPresentation;
}

function addSlideObject(presentation: Presentation, type: string, slideID: number, x: number, y: number, w: number, h: number, src: string|null): Presentation {
    let newPresentation: Presentation  = structuredClone(presentation);
    let nextUnusedID: number = newPresentation.slides[slideID].slideObjects.length;
    if (slideID >= newPresentation.slides.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideID=', slideID);
        return newPresentation;
    }

    if (type == 'image' && src != null) {
        let picture: Picture = {
            type: 'image',
            src: src,
            x: x,
            y: y,
            w: w,
            h: h,
            id: nextUnusedID
        }
        newPresentation.slides[slideID].slideObjects.splice(nextUnusedID, 0, picture);
    }
    else if (type == 'text') {
        let text: TextPlain = {
            type: 'text',
            text: 'enter youn text',
            font_size: 14,
            font_family: '',
            x: x,
            y: y,
            w: w,
            h: h,
            id: nextUnusedID
        }
        newPresentation.slides[slideID].slideObjects.splice(nextUnusedID, 0, text);
    }
    newPresentation.slides[slideID].slideObjects = updateSlideObjID(newPresentation.slides[slideID].slideObjects);
    return newPresentation;
}

function changeLayerSlideObj(presentation: Presentation, slideID: number, slideObjID: number, insertionID: number): Presentation {
    let newPresentation: Presentation  = structuredClone(presentation);
    if (slideID >= newPresentation.slides.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideID=', slideID);
        return newPresentation;
    }

    let slideObjects: SlideObj[] = newPresentation.slides[slideID].slideObjects;
    if (slideObjID >= slideObjects.length) {
        console.error('TypeError: ID overflow. That slideObjID is not found:', 'SlideObjID=', slideObjID);
        return newPresentation;      
    }
      
    if (insertionID >= slideObjects.length) { 
        console.error('TypeError: ID overflow. That insertionID is not found:', 'InsertionID=', insertionID);
        return newPresentation; 
    }

    slideObjects = slideObjects.splice(insertionID + 1, 0, slideObjects[slideID]);
    if (insertionID >= slideObjID) {
        newPresentation = removeSlideObject(newPresentation, slideID, slideObjID);
    }
    else {
        newPresentation = removeSlideObject(newPresentation, slideID, slideObjID + 1);
    }
    slideObjects = updateSlideObjID(slideObjects);
    return newPresentation;
}

// изменение позиции текста/картинки
function setPosition(presentation: Presentation, slideID: number, slideObjID: number, x: number, y: number): Presentation {
    let newPresentation: Presentation = structuredClone(presentation);
    if (slideID >= newPresentation.slides.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideID=', slideID);
        return newPresentation;
    }
    if (slideObjID >= newPresentation.slides[slideID].slideObjects.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideObjID=', slideID);
        return newPresentation;
    }
    newPresentation.slides[slideID].slideObjects[slideObjID].x = x;
    newPresentation.slides[slideID].slideObjects[slideObjID].y = y;
    return newPresentation;
}

// изменение размера текста/картинки
function setSize(presentation: Presentation, slideID: number, slideObjID: number, w: number, h: number): Presentation {
    let newPresentation: Presentation = structuredClone(presentation);
    if (slideID >= newPresentation.slides.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideID=', slideID);
        return newPresentation;
    }
    if (slideObjID >= newPresentation.slides[slideID].slideObjects.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideObjID=', slideID);
        return newPresentation;
    }
    newPresentation.slides[slideID].slideObjects[slideObjID].w = w;
    newPresentation.slides[slideID].slideObjects[slideObjID].h = h;
    return newPresentation;
}

// изменение текста
function setContent(presentation: Presentation, slideID: number, slideObjID: number, text: string): Presentation {
    let newPresentation: Presentation = structuredClone(presentation);
    if (slideID >= newPresentation.slides.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideID=', slideID);
        return newPresentation;
    }
    if (slideObjID >= newPresentation.slides[slideID].slideObjects.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideObjID=', slideID);
        return newPresentation;
    }
    if (newPresentation.slides[slideID].slideObjects[slideObjID].type == 'text') {
        newPresentation.slides[slideID].slideObjects[slideObjID].text = text;
    }
    return newPresentation;
}

// изменение размера текста
function setFontSize(presentation: Presentation, slideID: number, slideObjID: number, size: number): Presentation {
    let newPresentation: Presentation = structuredClone(presentation);
    if (slideID >= newPresentation.slides.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideID=', slideID);
        return newPresentation;
    }
    if (slideObjID >= newPresentation.slides[slideID].slideObjects.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideObjID=', slideID);
        return newPresentation;
    }
    if (newPresentation.slides[slideID].slideObjects[slideObjID].type == 'text') {
        newPresentation.slides[slideID].slideObjects[slideObjID].font_size = size;
    }
    return newPresentation;
}

// изменение семейства шрифтов у текста
function setFontFamily(presentation: Presentation, slideID: number, slideObjID: number, font_family: string): Presentation {
    let newPresentation: Presentation = structuredClone(presentation);
    if (slideID >= newPresentation.slides.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideID=', slideID);
        return newPresentation;
    }
    if (slideObjID >= newPresentation.slides[slideID].slideObjects.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideObjID=', slideID);
        return newPresentation;
    }
    if (newPresentation.slides[slideID].slideObjects[slideObjID].type == 'text') {
        newPresentation.slides[slideID].slideObjects[slideObjID].font_family = font_family;
    }
    return newPresentation;
}

// изменение фона слайда
function setBackground(presentation: Presentation, slideID: number, src: string|null = null, color: string|null = null): Presentation {
    let newPresentation: Presentation = structuredClone(presentation);
    let countSlides: number = newPresentation.slides.length;
    if (slideID >= newPresentation.slides.length) {
        console.error('TypeError: ID overflow. That slideID is not found:', 'SlideID=', slideID);
        return newPresentation;
    }
    if (src != null) {
        newPresentation.slides[slideID].background = {
            type: 'image',
            src: src
        }
    }
    else if (color != null) {
        newPresentation.slides[slideID].background = {
            type: 'color',
            color: color
        }
    }
    return newPresentation;
}
// Функции не должны менять передаваемые параметры.

let presentationMin: Presentation = {
    title: 'TestMinimalDataSet',
    slides: [],
    selectedObjectID: [],
    selectedSlideID: [],
}

let presentationMax: Presentation = {
    title: 'TestMaximalDataSet',
    slides: [{
        id: 0,
        background: {
            src: 'https://test.png',
            type: 'image',
        },
        slideObjects: [{
            type: 'image',
            src: 'https://onemoreTest.png',
            x: 0,
            y: 100,
            w: 50,
            h: 100,
            id: 0
        }]
    }],
    selectedObjectID: [],
    selectedSlideID: [],
}

const blankSlide: Slide = {
        id: 0,
        background: {
            color: 'white',
            type: 'color',
        },
        slideObjects: [{
            type: 'text',
            text: 'Enter your text',
            font_family: 'Courier New',
            font_size: 14,
            x: 0,
            y: 100,
            w: 50,
            h: 100,
            id: 0
        }]
}

// presentationMin = addSlide(presentationMin, blankSlide);
// presentationMin = setBackground(presentationMin, 0, 'img.png', null);
// presentationMin = changeLayer(presentationMin, 0, 1);
// presentationMin = changeLayerSlideObj(presentationMin, 0, 0, 1);
// presentationMin = removeSlideObject(presentationMin, 0, 0);
// presentationMin = removeSlide(presentationMin, 0);
// presentationMin = setPosition(presentationMin, 0, 0, 100, 100);
// console.log(presentationMin);

// presentationMin = addSlide(presentationMin, blankSlide);
// presentationMin = addSlide(presentationMin, blankSlide);
// presentationMin = setBackground(presentationMin, 0, null, 'red'); 
// console.log('0: Backgroung has been colored', presentationMin);
// presentationMin = setBackground(presentationMin, 0, 'http://image.png', null); 
// console.log('0: Backgroung is picture', presentationMin);
// presentationMin = addSlide(presentationMin, blankSlide);
// console.log('2: The Slide has been added', presentationMin);
// presentationMin = changeLayer(presentationMin, 0, 1);
// console.log('0, 1: Slides has been replaced', presentationMin);
// presentationMin = changeTitle(presentationMin, 'Test to change title of slide');
// console.log('The title of presentation has been changed', presentationMin);
// presentationMin = setFontFamily(presentationMin, 0, 0, 'Arial');
// console.log('0_0 : The FontFamily has been set to Arial', presentationMin);
// presentationMin = setFontSize(presentationMin, 0, 0, 20);
// console.log('0_0 : The FontSize is set to 20', presentationMin);
// presentationMin = setContent(presentationMin, 0, 0, 'Test to change the text');
// console.log('0_0 : The content of text has been changed', presentationMin);
// presentationMin = setSize(presentationMin, 0, 0, 500, 500);
// console.log('0_0 : The content box has been resized', presentationMin);
// presentationMin = setPosition(presentationMin, 0, 0, 500, 500);
// console.log('0_0 : The content box has been relocated', presentationMin);
// presentationMin = addSlideObject(presentationMin, 'image', 0, 0, 0, 100, 100, 'https://setImage.png');
// console.log('0 : The image has been added to slide', presentationMin);
// presentationMin = changeLayerSlideObj(presentationMin, 0, 0, 1);
// console.log('0_0 0_1 : The slideObjects has been replaced', presentationMin);
// presentationMin = removeSlideObject(presentationMin, 0, 1);
// console.log('0_1 : The picture has been deleted', presentationMin);
// presentationMin = removeSlide(presentationMin, 0);
// console.log('0 : The slide with SlideID: 0  has been deleted', presentationMin);
// presentationMin = addSlide(presentationMin, blankSlide, presentationMin.slides.length);
// console.log('The lastes slide has been added', presentationMin);