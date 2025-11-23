import type { Picture, TextPlain } from "../../../../store/types";
import type { Rect, Vector } from "../../../../store/typesView";
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
  deltaSize?: Rect;
};

function SlideObject(props: SlideObjectProps) {
  if (isTextPlain(props)) {
    return <Text {...props} />;
  }

  if (isPicture(props)) {
    return <ImgPlain {...props} />;
  }
  return <></>;
}

export { SlideObject };
