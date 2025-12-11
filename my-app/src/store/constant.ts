const standartSlideSize = { w: 1011, h: 643 };
const minSizeSlideObjOrGroupSlideObj = { w: standartSlideSize.w * 0.05, h: standartSlideSize.h * 0.1 };
const emptyRect = { x: 0, y: 0, w: 0, h: 0 };

const DataBaseID = "692755c1002f52881c2a";
const TabelID = "presentations";
const ProjectID = "691e06b2002471259e0b";
const Endpoint = "https://nyc.cloud.appwrite.io/v1";
const brucketID = "692e8a8b002414254fca";

export { standartSlideSize, minSizeSlideObjOrGroupSlideObj, emptyRect, DataBaseID, TabelID, ProjectID, Endpoint, brucketID };

const widthSlideCollection = 400;
const marginsSlideCollection = 17;
const scaleThumblnail = (widthSlideCollection - marginsSlideCollection * 2) / standartSlideSize.w;
const heightToolbar = 100;
const heightToolbarCollection = 75;
const offsetBetweenBundle = 15;

export { scaleThumblnail, heightToolbar, heightToolbarCollection, offsetBetweenBundle };
