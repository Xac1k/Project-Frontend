import type { Picture } from "../../../../../store/types";
import styles from "./ImgPlain.module.css";

type ImageObjectProps = {
  imageObject: Picture;
  scale: number;
  onClickHandle: ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | null;
  onMouseDown: ((e: React.MouseEvent<HTMLDivElement>) => void) | null;
  selected: boolean;
  shiftSelectedObj: { x: number; y: number };
  AdditionSizeSelectedObj: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
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

export default function ImgPlain(props: ImageObjectProps) {
  const imageObj = props.imageObject;
  const shiftSelectedObj = props.selected ? props.shiftSelectedObj : { x: 0, y: 0 };
  const additionSizeSelectedObj = props.selected ? props.AdditionSizeSelectedObj : { x: 0, y: 0, w: 0, h: 0 };
  const style: React.CSSProperties = {
    top: `${(imageObj.y + shiftSelectedObj.y - additionSizeSelectedObj.y) * props.scale}px`,
    left: `${(imageObj.x + shiftSelectedObj.x - additionSizeSelectedObj.x) * props.scale}px`,
    width: `${(imageObj.w + additionSizeSelectedObj.w) * props.scale}px`,
    height: `${(imageObj.h + additionSizeSelectedObj.h) * props.scale}px`,
    boxShadow: `${props.selected ? `0 0 0 2px #00ffd5b7` : ``}`,
    cursor: `${props.onClickHandle ? "grab" : ""}`,
  };

  if (props.onClickHandle == null || props.onMouseDown == null) {
    return <NonClickableIMG src={props.imageObject.src} style={style}></NonClickableIMG>;
  } else {
    return (
      <ClickableIMG
        src={props.imageObject.src}
        style={style}
        onClickHandle={props.onClickHandle}
        onMouseDown={props.onMouseDown}
        id={props.imageObject.id}
      ></ClickableIMG>
    );
  }
}
