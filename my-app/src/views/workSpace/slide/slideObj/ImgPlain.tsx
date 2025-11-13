import type { Picture } from "../../../../store/types";
import styles from "./ImgPlain.module.css";
import type { Rect } from "../../../../store/typesView";

type ImageObjectProps = {
  slideObj: Picture;
  scale?: number;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  isSelected?: boolean;
  delta?: { x: number; y: number };
  deltaSize?: Rect;
};

function ImgPlain({ slideObj: imageObj, scale, onMouseDown, onMouseUp, onDoubleClick, isSelected, delta }: ImageObjectProps) {
  scale = scale ?? 1;
  delta = delta ?? { x: 0, y: 0 };
  isSelected = isSelected ?? false;
  delta = isSelected ? delta : { x: 0, y: 0 };

  const style: React.CSSProperties = {
    top: `${(imageObj.y + delta.y) * scale}px`,
    left: `${(imageObj.x + delta.x) * scale}px`,
    width: `${imageObj.w * scale}px`,
    height: `${imageObj.h * scale}px`,
    boxShadow: isSelected ? `0 0 0 2px #00ffd5b7` : ``,
    cursor: onMouseDown ? "grab" : "",
    userSelect: `none`,
  };

  return (
    <img
      id={`slideObj-${imageObj.id}`}
      src={imageObj.src}
      style={style}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClick}
      onBlur={() => {}}
      className={styles.innerImage}
      draggable={false}
      tabIndex={1}
    ></img>
  );
}

export { ImgPlain, type ImageObjectProps };
