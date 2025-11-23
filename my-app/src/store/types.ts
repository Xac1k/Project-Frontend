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

type Slide = {
  slideObjects: SlideObj[];
  background: Background;
  id: string;
};

type Selection = {
  selectedSlideID: string[];
  selectedObjectID: string[];
};

type Presentation = {
  slides: Slide[];
  title: string;
  selection: Selection;
};

export type { Presentation, Selection, Slide, SlideObj, Picture, TextPlain };

type SetTitleProps = {
  name: string;
};

type RemoveSlideProps = {
  slideID: string[];
};

type AddSlideProps = {
  insertionID?: string;
};

export enum Position {
  Before = 0,
  After = 1,
}

type InsertSlidesPayload = {
  insertionSlideID: string;
  position: Position;
  slideIDs: string[];
};

type RemoveSlideObjectProps = {
  slideID: string;
  slideObjArrayID: string[];
};

type AddSlideObjectProps = {
  slideID: string;
  src?: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  text?: string;
};

type ChangeLayerSlideObjProps = {
  slideID: string;
  slideObjIDs: string[];
  biasSlideObj: number;
};

type DisplaceSlideObjProps = {
  slideID: string;
  slideObjectsID: string[];
  shift: { x: number; y: number };
};

type SetSizeAndPositionProps = {
  slideObjID: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type SetSizeAndPositionArrayProps = {
  slideID: string;
  payloads: SetSizeAndPositionProps[];
};

type PutTextProps = {
  slideID: string;
  slideObjID: string;
  text: string;
};

type SetFontSizeProps = {
  slideID: string;
  slideObjID: string;
  size: number;
};

type SetFontFamilyProps = {
  slideID: string;
  slideObjID: string;
  font_family: string;
};

type SetBackgroundProps = {
  slideID: string;
  src?: string;
  color?: string;
};

type setSlideAs = {
  slideID: string;
};

type setSlidesAs = {
  slideIDs: string[];
};

type setSlideObjAs = {
  slideObjID: string;
};

type SelectFromToProps = {
  startSlideID: string;
  endSlideID: string;
  slides: Slide[];
};

export type {
  SetSizeAndPositionProps,
  SetTitleProps,
  RemoveSlideProps,
  AddSlideProps,
  InsertSlidesPayload,
  RemoveSlideObjectProps,
  AddSlideObjectProps,
  ChangeLayerSlideObjProps,
  DisplaceSlideObjProps,
  SetSizeAndPositionArrayProps,
  PutTextProps,
  SetFontSizeProps,
  SetFontFamilyProps,
  SetBackgroundProps,
  setSlideAs,
  setSlideObjAs,
  SelectFromToProps,
  setSlidesAs,
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

const blankText: TextPlain = {
  type: "text",
  h: 100,
  w: 100,
  x: 100,
  y: 100,
  id: "0",
  text: "Введите текст",
  font_family: "Arial",
  font_size: 14,
};

const blankImage: Picture = {
  type: "image",
  h: 100,
  w: 100,
  x: 100,
  y: 100,
  id: "0",
  src: "https://test",
};

export { blankSlide, blankText, blankImage };
