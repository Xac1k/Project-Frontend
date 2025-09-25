interface Array<T> {
    findIndex(predicate: (value: T, index: number, obj: T[]) => boolean): number;
}

type BaseSlideObject = {
    x: number;
    y: number;
    w: number;
    h: number;
    id: string;
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
    id: string;
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

//шрифты могут поддерживать bold regular и т.д.

function getUniqID(): string {
    const uniqID: string = Date.now().toString(36) + Math.random().toString(36);
    return uniqID;
}

// изменение названия презентации
function changeTitle(presentation: Presentation, name: string): Presentation {
    const newPresentation: Presentation  = structuredClone(presentation);
    newPresentation.title = name;
    return newPresentation;
}

// добавление/удаление слайда
function removeSlide(presentation: Presentation, slideID: string): Presentation {
    const newPresentation: Presentation  = structuredClone(presentation);
    const slideArrayID: number = presentation.slides.findIndex(slide => slide.id === slideID);
    if (slideArrayID == -1) {
        console.error('ID error: SlideID not found in Slides array. SlideID=', slideID);
        return newPresentation;
    }
    newPresentation.slides.splice(slideArrayID, 1);
    return newPresentation;
}

function addSlide(presentation: Presentation, slide: Slide, slideID: string, insertionID: string|null = null): Presentation {
    const newPresentation: Presentation  = structuredClone(presentation);
    const SlideExist = presentation.slides.findIndex((slide) => slide.id === slideID);
    if (SlideExist != -1) {
        console.error('ID Error: This slide has been already exist. slideID=', slideID);
        return newPresentation;
    }
    slide.id = slideID;
    if (insertionID == null) {
        newPresentation.slides.splice(newPresentation.slides.length, 0, slide);
        return newPresentation;
    }
    
    const slideArrayInsertionID = presentation.slides.findIndex((slide) => slide.id === insertionID);
    if (slideArrayInsertionID == -1)  {
        console.error('ID Error: slideID for insert slide not found. slideID=', insertionID);
        return newPresentation;
    }
    newPresentation.slides.splice(slideArrayInsertionID, 0, slide);
    return newPresentation;
}

// изменение позиции слайда

function changeLayer(presentation: Presentation, slideID: string, biasSlide: number): Presentation {
    let newPresentation: Presentation  = structuredClone(presentation);
    const slideArrayID = newPresentation.slides.findIndex((slide) => slide.id === slideID);
    if (slideArrayID == -1) {
        console.error('ID error: SlideID not found in Slides array. SlideID=', slideID);
        return newPresentation;
    }

    let slides = newPresentation.slides;
    const newSlideArrayID = biasSlide < 0 ? slideArrayID + biasSlide : slideArrayID + biasSlide + 1;

    let cloneSlide = structuredClone(slides[slideArrayID]);
    newPresentation.slides[slideArrayID].id = slideID + '.rm';
    slides = slides.splice(newSlideArrayID, 0, cloneSlide);
    newPresentation = removeSlide(newPresentation, slideID + '.rm');
    return newPresentation;
}

// добавление/удаление текста и картинки
function removeSlideObject(presentation: Presentation, slideID: string, slideObjID: string): Presentation {
    const newPresentation: Presentation  = structuredClone(presentation);
    const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
    if (slideArrayID == -1) {
        console.error('ID error: SlideID not found in Slides array. SlideID=', slideID);
        return newPresentation;
    }
    const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
    if (slideObjArrayID == -1) {
        console.error('ID error: SlideObjID not found in SlideObjects array. SlideObjID=', slideID);
        return newPresentation;
    }

    newPresentation.slides[slideArrayID].slideObjects.splice(slideObjArrayID, 1);
    return newPresentation;
}

function addSlideObject(presentation: Presentation, slideID: string, type: string,  src: string|null, slideObjID: string): Presentation {
    const newPresentation: Presentation  = structuredClone(presentation);
    const slideArrayID = newPresentation.slides.findIndex((slide) => slide.id === slideID);
    if (slideArrayID == -1) {
        console.error('ID error: SlideID not found in Slides array. SlideID=', slideID);
        return newPresentation;
    }
    const slideObjArrayID = newPresentation.slides[slideArrayID].slideObjects.length;
    let slideObj: SlideObj;
    
    if (type == 'image' && src != null) {
        slideObj = {
            type: 'image',
            x: 100,
            y: 100,
            w: 100,
            h: 100,
            id: slideObjID,
            src: src,
        }
    }
    else {
        slideObj = {
            type: 'text',
            text: 'Enter your text',
            font_size: 14,
            font_family: 'Arial',
            x: 100,
            y: 100,
            w: 100,
            h: 100,
            id: slideObjID,
        }
    }
    newPresentation.slides[slideArrayID].slideObjects.splice(slideObjArrayID, 0, slideObj);
    return newPresentation;
}

function changeLayerSlideObj(presentation: Presentation, slideID: string, slideObjID: string, biasSlideObj: number): Presentation {
    let newPresentation: Presentation  = structuredClone(presentation);
    const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
    if (slideArrayID == -1) {
        console.error('ID error: SlideID not found in Slides array. SlideID=', slideID);
        return newPresentation;
    }
    const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
    if (slideObjArrayID == -1) {
        console.error('ID error: SlideObjID not found in SlideObjects array. SlideObjID=', slideID);
        return newPresentation;
    }
    const newSlideArrayID = biasSlideObj < 0 ? slideArrayID + biasSlideObj : slideArrayID + biasSlideObj + 1;

    let slideObjects: SlideObj[] = newPresentation.slides[slideArrayID].slideObjects;
    let cloneSlideObj = structuredClone(slideObjects[slideObjArrayID]);
    newPresentation.slides[slideArrayID].slideObjects[slideObjArrayID].id = slideID + '.rm';
    slideObjects = slideObjects.splice(newSlideArrayID, 0, cloneSlideObj);
    newPresentation = removeSlideObject(newPresentation, slideID, slideObjID + '.rm');
    return newPresentation;
}

// изменение позиции текста/картинки
function setPosition(presentation: Presentation, slideID: string, slideObjID: string, x: number, y: number): Presentation {
    const newPresentation: Presentation = structuredClone(presentation);
    const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
    if (slideArrayID == -1) {
        console.error('ID error: SlideID not found in Slides array. SlideID=', slideID);
        return newPresentation;
    }
    const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
    if (slideObjArrayID == -1) {
        console.error('ID error: SlideObjID not found in SlideObjects array. SlideObjID=', slideID);
        return newPresentation;
    }

    newPresentation.slides[slideArrayID].slideObjects[slideObjArrayID].x = x;
    newPresentation.slides[slideArrayID].slideObjects[slideObjArrayID].y = y;
    return newPresentation;
}

// изменение размера текста/картинки
function setSize(presentation: Presentation, slideID: string, slideObjID: string, w: number, h: number): Presentation {
    const newPresentation: Presentation = structuredClone(presentation);
    const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
    if (slideArrayID == -1) {
        console.error('ID error: SlideID not found in Slides array. SlideID=', slideID);
        return newPresentation;
    }
    const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
    if (slideObjArrayID == -1) {
        console.error('ID error: SlideObjID not found in SlideObjects array. SlideObjID=', slideID);
        return newPresentation;
    }

    newPresentation.slides[slideArrayID].slideObjects[slideObjArrayID].w = w;
    newPresentation.slides[slideArrayID].slideObjects[slideObjArrayID].h = h;
    return newPresentation;
}

// изменение текста
function setContent(presentation: Presentation, slideID: string, slideObjID: string, text: string): Presentation {
    const newPresentation: Presentation = structuredClone(presentation);
    const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
    if (slideArrayID == -1) {
        console.error('ID error: SlideID not found in Slides array. SlideID=', slideID);
        return newPresentation;
    }
    const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
    if (slideObjArrayID == -1) {
        console.error('ID error: SlideObjID not found in SlideObjects array. SlideObjID=', slideID);
        return newPresentation;
    }

    if (newPresentation.slides[slideArrayID].slideObjects[slideObjArrayID].type == 'text') {
        newPresentation.slides[slideArrayID].slideObjects[slideObjArrayID].text = text;
    }
    return newPresentation;
}

// изменение размера текста
function setFontSize(presentation: Presentation, slideID: string, slideObjID: string, size: number): Presentation {
    const newPresentation: Presentation = structuredClone(presentation);
    const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
    if (slideArrayID == -1) {
        console.error('ID error: SlideID not found in Slides array. SlideID=', slideID);
        return newPresentation;
    }
    const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
    if (slideObjArrayID == -1) {
        console.error('ID error: SlideObjID not found in SlideObjects array. SlideObjID=', slideID);
        return newPresentation;
    }

    if (newPresentation.slides[slideArrayID].slideObjects[slideObjArrayID].type == 'text') {
        newPresentation.slides[slideArrayID].slideObjects[slideObjArrayID].font_size = size;
    }
    return newPresentation;
}

// изменение семейства шрифтов у текста
function setFontFamily(presentation: Presentation, slideID: string, slideObjID: string, font_family: string): Presentation {
    const newPresentation: Presentation = structuredClone(presentation);
    const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
    if (slideArrayID == -1) {
        console.error('ID error: SlideID not found in Slides array. SlideID=', slideID);
        return newPresentation;
    }
    const slideObjArrayID = presentation.slides[slideArrayID].slideObjects.findIndex((slideObj) => slideObj.id === slideObjID);
    if (slideObjArrayID == -1) {
        console.error('ID error: SlideObjID not found in SlideObjects array. SlideObjID=', slideID);
        return newPresentation;
    }

    if (newPresentation.slides[slideArrayID].slideObjects[slideObjArrayID].type == 'text') {
        newPresentation.slides[slideArrayID].slideObjects[slideObjArrayID].font_family = font_family;
    }
    return newPresentation;
}

// изменение фона слайда
function setBackground(presentation: Presentation, slideID: string, src: string|null = null, color: string|null = null): Presentation {
    const newPresentation: Presentation = structuredClone(presentation);
    const slideArrayID = presentation.slides.findIndex((slide) => slide.id === slideID);
    if (slideArrayID == -1) {
        console.error('ID error: SlideID not found in Slides array. SlideID=', slideID);
        return newPresentation;
    }

    if (src != null) {
        newPresentation.slides[slideArrayID].background = {
            type: 'image',
            src: src
        }
    }
    else if (color != null) {
        newPresentation.slides[slideArrayID].background = {
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
    slides: [],
    selectedObjectID: [],
    selectedSlideID: [],
}

const blankSlide: Slide = {
    id: '0',
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
        id: '0'
    }]
}

const fs = require('fs');

function TestPresentationMax(presentationMax: Presentation) {
    presentationMax = addSlide(presentationMax, blankSlide, '0');
    presentationMax = addSlide(presentationMax, blankSlide, '1');
    presentationMax = addSlide(presentationMax, blankSlide, '2');
    presentationMax = addSlide(presentationMax, blankSlide, '3');
    presentationMax = addSlide(presentationMax, blankSlide, '4');
    presentationMax = addSlide(presentationMax, blankSlide, '5');
    presentationMax = addSlide(presentationMax, blankSlide, '6');
    presentationMax = addSlide(presentationMax, blankSlide, '7');
    presentationMax = addSlide(presentationMax, blankSlide, '8');
    presentationMax = addSlide(presentationMax, blankSlide, '9');

    presentationMax = addSlideObject(presentationMax, '0', 'image', 'https://setImage.png', '1');
    presentationMax = addSlideObject(presentationMax, '0', 'text', null, '2');
    presentationMax = addSlideObject(presentationMax, '0', 'text', null, '3');
    presentationMax = addSlideObject(presentationMax, '0', 'text', null, '4');
    presentationMax = setPosition(presentationMax, '0', '2', 450, 500);
    presentationMax = setPosition(presentationMax, '0', '3', 400, 500);
    presentationMax = setPosition(presentationMax, '0', '4', 300, 500);
    presentationMax = addSlideObject(presentationMax, '0', 'image', 'https://setImage.png', '5');
    presentationMax = setPosition(presentationMax, '0', '5', 200, 500);
    presentationMax = setSize(presentationMax, '0', '5', 200, 500);
    let data_json = JSON.stringify(presentationMax);
    fs.writeFile('PresentationMax.json', data_json, () => {console.log('Json has been saved')});
}

function TestPresentationMin(Presentation: Presentation) {
    presentationMin = addSlide(presentationMin, blankSlide, '0');
    presentationMin = addSlide(presentationMin, blankSlide, '1');
    presentationMin = setBackground(presentationMin, '0', null, 'red'); 
    console.log('0: Backgroung has been colored', presentationMin);
    presentationMin = setBackground(presentationMin, '0', 'http://image.png', null); 
    console.log('0: Backgroung is picture', presentationMin);
    presentationMin = addSlide(presentationMin, blankSlide, '2');
    console.log('2: The Slide has been added', presentationMin);
    presentationMin = changeLayer(presentationMin, '0', 1);
    console.log('0, 1: Slides has been replaced', presentationMin);
    presentationMin = changeTitle(presentationMin, 'Test to change title of slide');
    console.log('The title of presentation has been changed', presentationMin);
    presentationMin = setFontFamily(presentationMin, '0', '0', 'Arial');
    console.log('0_0 : The FontFamily has been set to Arial', presentationMin);
    presentationMin = setFontSize(presentationMin, '0', '0', 20);
    console.log('0_0 : The FontSize is set to 20', presentationMin);
    presentationMin = setContent(presentationMin, '0', '0', 'Test to change the text');
    console.log('0_0 : The content of text has been changed', presentationMin);
    presentationMin = setSize(presentationMin, '0', '0', 500, 500);
    console.log('0_0 : The content box has been resized', presentationMin);
    presentationMin = setPosition(presentationMin, '0', '0', 500, 500);
    console.log('0_0 : The content box has been relocated', presentationMin);
    presentationMin = addSlideObject(presentationMin, '0', 'image', 'https://setImage.png', '1');
    console.log('0 : The image has been added to slide', presentationMin);
    presentationMin = changeLayerSlideObj(presentationMin, '0', '0', 1);
    console.log('0_0 0_1 : The slideObjects has been replaced', presentationMin);
    presentationMin = removeSlideObject(presentationMin, '0', '1');
    console.log('0_1 : The picture has been deleted', presentationMin);
    presentationMin = removeSlide(presentationMin, '0');
    console.log('0 : The slide with SlideID: 0  has been deleted', presentationMin);
}

TestPresentationMax(presentationMax)