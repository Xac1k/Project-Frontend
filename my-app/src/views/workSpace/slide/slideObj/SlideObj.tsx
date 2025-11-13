import type { Picture, TextPlain } from "../../../../store/types";
import type { Vector } from "../../../../store/typesView";
import { ImgPlain, type ImageObjectProps } from "./ImgPlain";
import { type TextObjectProps, Text } from "./TextPlain";

function isTextPlain(props: SlideObjectProps): props is TextObjectProps {
  return props.slideObj.type === "text";
}

function isPicture(props: SlideObjectProps): props is ImageObjectProps {
  return props.slideObj.type === "image";
}

type SlideObjectProps = {
  slideObj: TextPlain | Picture;
  scale?: number;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  isSelected?: boolean;
  delta?: Vector;
};

function SlideObject(props: SlideObjectProps) {
  if (isTextPlain(props)) {
    return <Text {...props}></Text>;
  }

  if (isPicture(props)) {
    return <ImgPlain {...props}></ImgPlain>;
  }
  return <></>;
}

export { SlideObject };
