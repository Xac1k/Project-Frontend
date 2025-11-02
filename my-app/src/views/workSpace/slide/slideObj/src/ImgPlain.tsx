import type { Picture } from "../../../../../store/types";
import styles from "./ImgPlain.module.css";
import type { Rect } from "../../../../../store/typesView";

type ImageObjectProps = {
  imageObj: Picture;
  scale: number;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  selected?: boolean;
  delta?: { x: number; y: number };
  deltaSize?: Rect;
};

type ClickableImgProps = {
  src: string;
  style: React.CSSProperties;
  id: string;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
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
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onBlur={props.onBlur}
      className={styles.innerImage}
      draggable={false}
      tabIndex={1}
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

export default function ImgPlain({ imageObj, scale, onMouseDown, onMouseUp, selected, delta }: ImageObjectProps) {
  delta = delta ?? { x: 0, y: 0 };
  selected = selected ?? false;
  delta = selected ? delta : { x: 0, y: 0 };

  // const newSize = selected ? computeSizeAndPosition(dataSize, imageObj) : { x: imageObj.x, y: imageObj.y, w: imageObj.w, h: imageObj.h };

  const style: React.CSSProperties = {
    top: `${(imageObj.y + delta.y) * scale}px`,
    left: `${(imageObj.x + delta.x) * scale}px`,
    width: `${imageObj.w * scale}px`,
    height: `${imageObj.h * scale}px`,
    boxShadow: selected ? `0 0 0 2px #00ffd5b7` : ``,
    cursor: onMouseDown ? "grab" : "",
  };

  if (!onMouseDown) {
    return <NonClickableIMG src={imageObj.src} style={style}></NonClickableIMG>;
  } else {
    return <ClickableIMG src={imageObj.src} style={style} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onBlur={() => {}} id={imageObj.id}></ClickableIMG>;
  }
}
