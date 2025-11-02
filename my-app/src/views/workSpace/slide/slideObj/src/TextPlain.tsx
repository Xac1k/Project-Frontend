import type React from "react";
import { type TextPlain } from "../../../../../store/types";
import styles from "./TextPlain.module.css";
import type { Rect } from "../../../../../store/typesView";

type TextObjectProps = {
  textObject: TextPlain;
  scale: number;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  selected?: boolean;
  delta?: { x: number; y: number };
  deltaSize?: Rect;
};

type ClickableTextPlainProps = {
  style: React.CSSProperties;
  text: string;
  id: string;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
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
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
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

export default function Text({ textObject, scale, onMouseDown, onMouseUp, selected, delta }: TextObjectProps) {
  delta = delta ?? { x: 0, y: 0 };
  selected = selected ?? false;
  delta = selected ? delta : { x: 0, y: 0 };

  const style: React.CSSProperties = {
    top: `${(textObject.y + delta.y) * scale}px`,
    left: `${(textObject.x + delta.x) * scale}px`,
    width: `${textObject.w * scale}px`,
    height: `${textObject.h * scale}px`,
    fontFamily: `${textObject.font_family}`,
    fontSize: `${textObject.font_size * scale}px`,
    boxShadow: selected ? `0 0 0 2px #00ffd5b7` : ``,
    cursor: onMouseDown ? "grab" : "",
  };

  if (!onMouseDown) {
    return <NonClickableTextPlain style={style} text={textObject.text}></NonClickableTextPlain>;
  } else {
    return (
      <ClickableTextPlain
        style={style}
        text={textObject.text}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onBlur={() => {}}
        id={textObject.id}
      ></ClickableTextPlain>
    );
  }
}
