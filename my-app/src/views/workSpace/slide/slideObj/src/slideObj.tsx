import type { Slide } from "../../../../../store/types";
import type { StateWorkZone } from "../../../src/WorkSpace";
import type { SizeData } from "../../functions/DragAndDropSize";
import { createClickHandle } from "../functions/createClickHandle";
import ImgPlain from "./ImgPlain";
import Text from "./TextPlain";

type SlideRenderProps = {
  slide: Slide;
  selectionSlideObj: string[];
  thumbnail: boolean | null;
  scale: number;
  shiftSelectedObj: { x: number; y: number };
  onMouseDown: ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | null;
  dataSize: SizeData;
  stateWorkZone: React.RefObject<StateWorkZone>;
};

function renderSlideObjects({
  slide,
  selectionSlideObj,
  thumbnail,
  scale,
  shiftSelectedObj,
  onMouseDown,
  dataSize,
  stateWorkZone,
}: SlideRenderProps) {
  const slideElt = slide.slideObjects.map((slideObj) => {
    const isMarked = selectionSlideObj.includes(slideObj.id);
    if (slideObj.type == "text") {
      if (thumbnail) {
        return <Text key={slideObj.id} textObject={slideObj} scale={scale}></Text>;
      }

      const response = createClickHandle({ slideID: slide.id, slideObjID: slideObj.id, type: "text", stateWorkZone });
      return (
        <Text
          key={slideObj.id}
          textObject={slideObj}
          scale={scale}
          onClickHandle={response.onClick}
          onMouseDown={onMouseDown}
          selected={isMarked}
          shiftSelectedObj={shiftSelectedObj}
          dataSize={dataSize}
        ></Text>
      );
    }

    if (slideObj.type == "image") {
      if (thumbnail) {
        return <ImgPlain key={slideObj.id} imageObj={slideObj} scale={scale}></ImgPlain>;
      }

      const response = createClickHandle({ slideID: slide.id, slideObjID: slideObj.id, type: "img", stateWorkZone });
      return (
        <ImgPlain
          key={slideObj.id}
          imageObj={slideObj}
          scale={scale}
          onClickHandle={response.onClick}
          onMouseDown={onMouseDown}
          selected={isMarked}
          shiftSelectedObj={shiftSelectedObj}
          dataSize={dataSize}
        ></ImgPlain>
      );
    }
  });

  return <>{slideElt}</>;
}

export { renderSlideObjects };
