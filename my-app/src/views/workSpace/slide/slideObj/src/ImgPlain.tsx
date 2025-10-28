import { useRef } from "react";
import type { Picture } from "../../../../../store/types";
import styles from "./ImgPlain.module.css";
import type { SizeData } from "../../functions/DragAndDropSize";
import { computeSizeAndPosition } from "../functions/computeSizeAndPosition";

type ImageObjectProps = {
  imageObj: Picture;
  scale: number;
  onClickHandle?: ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | null;
  onMouseDown?: ((e: React.MouseEvent<HTMLDivElement>) => void) | null;
  selected?: boolean;
  shiftSelectedObj?: { x: number; y: number };
  dataSize?: SizeData;
};

type ClickableImgProps = {
  src: string;
  style: React.CSSProperties;
  id: string;
  onClickHandle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
};

type NonClickableImgProps = {
  src: string;
  style: React.CSSProperties;
};

function ClickableIMG(props: ClickableImgProps) {
  return (
    <img
      id={`slideObj-${props.id}`}
      src={props.src}
      style={props.style}
      onClick={props.onClickHandle}
      onMouseDown={props.onMouseDown}
      className={styles.innerImage}
      draggable={false}
    ></img>
  );
}

function NonClickableIMG(props: NonClickableImgProps) {
  const style: React.CSSProperties = {
    ...props.style,
    userSelect: `none`,
  };
  return <img src={props.src} style={style} className={styles.innerImage}></img>;
}

export default function ImgPlain({ imageObj, scale, onClickHandle, onMouseDown, selected, shiftSelectedObj, dataSize }: ImageObjectProps) {
  shiftSelectedObj = shiftSelectedObj ?? { x: 0, y: 0 };
  selected = selected ?? false;
  dataSize = dataSize ?? {
    addSizeMarkedObj: { x: 0, y: 0, w: 0, h: 0 },
    bndRect: useRef({ x: 0, y: 0, w: 0, h: 0 }),
    side: useRef("none"),
  };
  onClickHandle = onClickHandle ?? null;
  onMouseDown = onMouseDown ?? null;

  dataSize = selected
    ? dataSize
    : {
        addSizeMarkedObj: { x: 0, y: 0, w: 0, h: 0 },
        bndRect: useRef({ x: 0, y: 0, w: 0, h: 0 }),
        side: useRef("none"),
      };
  shiftSelectedObj = selected ? shiftSelectedObj : { x: 0, y: 0 };

  const newSize = selected ? computeSizeAndPosition(dataSize, imageObj) : { x: imageObj.x, y: imageObj.y, w: imageObj.w, h: imageObj.h };

  const style: React.CSSProperties = {
    top: `${(newSize.y + shiftSelectedObj.y) * scale}px`,
    left: `${(newSize.x + shiftSelectedObj.x) * scale}px`,
    width: `${newSize.w * scale}px`,
    height: `${newSize.h * scale}px`,
    boxShadow: `${selected ? `0 0 0 2px #00ffd5b7` : ``}`,
    cursor: `${onClickHandle ? "grab" : ""}`,
  };

  if (onClickHandle == null || onMouseDown == null) {
    return <NonClickableIMG src={imageObj.src} style={style}></NonClickableIMG>;
  } else {
    return <ClickableIMG src={imageObj.src} style={style} onClickHandle={onClickHandle} onMouseDown={onMouseDown} id={imageObj.id}></ClickableIMG>;
  }
}
