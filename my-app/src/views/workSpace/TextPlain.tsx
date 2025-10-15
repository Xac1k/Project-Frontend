import type React from "react";
import type { TextPlain } from "../../store/types";
import styles from "./TextPlain.module.css";

type TextObjectProps = {
  textObject: TextPlain;
  scale: number;
  onClickHandle: (() => void) | null;
  selected: boolean;
};

type ClickableTextPlainProps = {
  style: React.CSSProperties;
  text: string;
  onClickHandle: () => void;
};

type NonClickableTextPlainProps = {
  style: React.CSSProperties;
  text: string;
};

function ClickableTextPlain(props: ClickableTextPlainProps) {
  return (
    <div
      style={props.style}
      onClick={props.onClickHandle}
      className={styles.innerText}
    >
      {props.text}
    </div>
  );
}

function NonClickableTextPlain(props: NonClickableTextPlainProps) {
  const style: React.CSSProperties = {
    ...props.style,
    userSelect: `none`,
  }
  return (
    <div style={style} className={styles.innerText}>
      {props.text}
    </div>
  );
}

export default function Text(props: TextObjectProps) {
  const textObj = props.textObject;
  const style: React.CSSProperties = {
    top: `${textObj.y * props.scale}px`,
    left: `${textObj.x * props.scale}px`,
    width: `${textObj.w * props.scale}px`,
    height: `${textObj.h * props.scale}px`,
    fontFamily: `${textObj.font_family}`,
    fontSize: `${textObj.font_size * props.scale}px`,
    boxShadow: `${props.selected ? `0 0 0 2px #00ffd5b7` : ``}`,
  };

  if (props.onClickHandle == null) {
    return (
      <NonClickableTextPlain
        style={style}
        text={props.textObject.text}
      ></NonClickableTextPlain>
    );
  } else {
    return (
      <ClickableTextPlain
        style={style}
        text={props.textObject.text}
        onClickHandle={props.onClickHandle}
      ></ClickableTextPlain>
    );
  }
}
