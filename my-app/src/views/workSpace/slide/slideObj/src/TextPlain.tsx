import type React from "react";
import { type TextPlain } from "../../../../../store/types";
import styles from "./TextPlain.module.css";
import { useRef } from "react";
import { computeSizeAndPosition } from "../functions/computeSizeAndPosition";
import type { SizeData } from "../../functions/DragAndDropSize";

type TextObjectProps = {
  textObject: TextPlain;
  scale: number;
  onClickHandle?: ((e: React.MouseEvent<HTMLDivElement>) => void) | null;
  onMouseDown?: ((e: React.MouseEvent<HTMLDivElement>) => void) | null;
  selected?: boolean;
  shiftSelectedObj?: { x: number; y: number };
  dataSize?: SizeData;
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

export default function Text({ textObject, scale, onClickHandle, onMouseDown, selected, shiftSelectedObj, dataSize }: TextObjectProps) {
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

  const newSize = selected ? computeSizeAndPosition(dataSize, textObject) : { x: textObject.x, y: textObject.y, w: textObject.w, h: textObject.h };

  const style: React.CSSProperties = {
    top: `${(newSize.y + shiftSelectedObj.y) * scale}px`,
    left: `${(newSize.x + shiftSelectedObj.x) * scale}px`,
    width: `${newSize.w * scale}px`,
    height: `${newSize.h * scale}px`,
    fontFamily: `${textObject.font_family}`,
    fontSize: `${textObject.font_size * scale}px`,
    boxShadow: selected ? `0 0 0 2px #00ffd5b7` : ``,
    cursor: onClickHandle ? "grab" : "",
  };

  if (onClickHandle == null || onMouseDown == null) {
    return <NonClickableTextPlain style={style} text={textObject.text}></NonClickableTextPlain>;
  } else {
    return (
      <ClickableTextPlain
        style={style}
        text={textObject.text}
        onClickHandle={onClickHandle}
        onMouseDown={onMouseDown}
        onBlur={() => {
          console.log("Снятие");
        }}
        id={textObject.id}
      ></ClickableTextPlain>
    );
  }
}
