import type React from "react";
import { type TextPlain } from "../../../../../store/types";
import styles from "./TextPlain.module.css";

type TextObjectProps = {
  textObject: TextPlain;
  scale: number;
  onClickHandle: ((e: React.MouseEvent<HTMLDivElement>) => void) | null;
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

type ClickableTextPlainProps = {
  style: React.CSSProperties;
  text: string;
  id: string;
  onClickHandle: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLDivElement>) => void;
};

type NonClickableTextPlainProps = {
  style: React.CSSProperties;
  text: string;
};

function ClickableTextPlain(props: ClickableTextPlainProps) {
  const style: React.CSSProperties = {
    ...props.style,
    wordWrap: `normal`,
  };

  return (
    <div
      id={`slideObj-${props.id}`}
      style={style}
      onClick={props.onClickHandle}
      onMouseDown={props.onMouseDown}
      onBlur={props.onBlur}
      className={styles.innerText}
      draggable={false}
      tabIndex={1}
    >
      {props.text}
    </div>
  );
}

function NonClickableTextPlain(props: NonClickableTextPlainProps) {
  const style: React.CSSProperties = {
    ...props.style,
    userSelect: `none`,
  };
  return (
    <div style={style} className={styles.innerText}>
      {props.text}
    </div>
  );
}

export default function Text(props: TextObjectProps) {
  const textObj = props.textObject;
  const shiftSelectedObj = props.selected ? props.shiftSelectedObj : { x: 0, y: 0 };
  const additionSizeSelectedObj = props.selected ? props.AdditionSizeSelectedObj : { x: 0, y: 0, w: 0, h: 0 };

  const style: React.CSSProperties = {
    top: `${(textObj.y + shiftSelectedObj.y - additionSizeSelectedObj.y) * props.scale}px`,
    left: `${(textObj.x + shiftSelectedObj.x - additionSizeSelectedObj.x) * props.scale}px`,
    width: `${(textObj.w + additionSizeSelectedObj.w) * props.scale}px`,
    height: `${(textObj.h + additionSizeSelectedObj.h) * props.scale}px`,
    fontFamily: `${textObj.font_family}`,
    fontSize: `${textObj.font_size * props.scale}px`,
    boxShadow: `${props.selected ? `0 0 0 2px #00ffd5b7` : ``}`,
    cursor: `${props.onClickHandle ? "grab" : ""}`,
  };

  if (props.onClickHandle == null || props.onMouseDown == null) {
    return <NonClickableTextPlain style={style} text={props.textObject.text}></NonClickableTextPlain>;
  } else {
    return (
      <ClickableTextPlain
        style={style}
        text={props.textObject.text}
        onClickHandle={props.onClickHandle}
        onMouseDown={props.onMouseDown}
        onBlur={() => {
          console.log("Снятие");
        }}
        id={props.textObject.id}
      ></ClickableTextPlain>
    );
  }
}
