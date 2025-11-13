import type React from "react";
import { type TextPlain } from "../../../../store/types";
import styles from "./TextPlain.module.css";
import type { Rect } from "../../../../store/typesView";

type TextObjectProps = {
  slideObj: TextPlain;
  scale?: number;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  isSelected?: boolean;
  delta?: { x: number; y: number };
  deltaSize?: Rect;
};

function Text({ slideObj: textObject, scale, onMouseDown, onMouseUp, isSelected, delta, onDoubleClick }: TextObjectProps) {
  delta = delta ?? { x: 0, y: 0 };
  isSelected = isSelected ?? false;
  delta = isSelected ? delta : { x: 0, y: 0 };
  scale = scale ?? 1;

  const style: React.CSSProperties = {
    top: `${(textObject.y + delta.y) * scale}px`,
    left: `${(textObject.x + delta.x) * scale}px`,
    width: `${textObject.w * scale}px`,
    height: `${textObject.h * scale}px`,
    fontFamily: `${textObject.font_family}`,
    fontSize: `${textObject.font_size * scale}px`,
    boxShadow: isSelected ? `0 0 0 2px #00ffd5b7` : ``,
    cursor: onMouseDown ? "grab" : "",
  };

  return (
    <div
      id={`slideObj-${textObject.id}`}
      style={style}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClick}
      onBlur={() => {}}
      className={styles.innerText}
      draggable={false}
      tabIndex={1}
    >
      {textObject.text}
    </div>
  );
}

export { Text, type TextObjectProps };
