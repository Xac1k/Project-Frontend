import type { SlideObj } from "../../../../../store/types";
import type { Rect, Vector } from "../../../../../store/typesView";
import ImgPlain from "./ImgPlain";
import Text from "./TextPlain";

type SlideObjectProps = {
  isSelected?: boolean;
  scale?: number;
  delta?: Vector;
  deltaSize?: Rect;
  slideObj: SlideObj;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
function SlideObject({ isSelected, scale, delta, slideObj, onMouseDown, onMouseUp, deltaSize }: SlideObjectProps) {
  scale = scale ?? 1;
  if (slideObj.type == "text") {
    return (
      <Text
        textObject={slideObj}
        scale={scale}
        selected={isSelected}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        delta={delta}
        deltaSize={deltaSize}
      ></Text>
    );
  }

  if (slideObj.type == "image") {
    return (
      <ImgPlain
        imageObj={slideObj}
        scale={scale}
        selected={isSelected}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        delta={delta}
        deltaSize={deltaSize}
      ></ImgPlain>
    );
  }
  return <></>;
}

export { SlideObject };
