import { type CSSProperties } from "react";
import type { Rect, Vector } from "../../../../store/typesView";
import { getBoundingRect, getSideOfChanging } from "../../../../store/functions";
import styles from "./BoundingBox.module.css";
import { useAppSelector } from "../../../../store/store";

type CreateStyles = {
  styleLeft: React.CSSProperties;
  styleRight: React.CSSProperties;
  styleUp: React.CSSProperties;
  styleDown: React.CSSProperties;
  styleDownLeft: React.CSSProperties;
  styleUpLeft: React.CSSProperties;
  styleDownRight: React.CSSProperties;
  styleUpRight: React.CSSProperties;
};
function createStyles(sizeElt: Rect): CreateStyles {
  const pointForSize = { y: 10, x: 10, radius: 5 };
  let lineForSize = {
    vert: { long: Math.max(sizeElt.h * 0.1, 20), short: 10 },
    horiz: { long: Math.max(sizeElt.w * 0.1, 20), short: 10 },
    radius: 5,
  };

  const styleLeft: React.CSSProperties = {
    height: `${lineForSize.vert.long}px`,
    width: `${lineForSize.vert.short}px`,
    left: `${sizeElt.x - lineForSize.radius}px`,
    top: `${sizeElt.y + sizeElt.h / 2 - lineForSize.vert.long / 2}px`,
    borderRadius: `${lineForSize.radius}px`,
    cursor: "w-resize",
  };
  const styleRight: React.CSSProperties = {
    height: `${lineForSize.vert.long}px`,
    width: `${lineForSize.vert.short}px`,
    left: `${sizeElt.x + sizeElt.w - lineForSize.radius}px`,
    top: `${sizeElt.y + sizeElt.h / 2 - lineForSize.vert.long / 2}px`,
    borderRadius: `${lineForSize.radius}px`,
    cursor: "e-resize",
  };
  const styleUp: React.CSSProperties = {
    height: `${lineForSize.horiz.short}px`,
    width: `${lineForSize.horiz.long}px`,
    left: `${sizeElt.x + sizeElt.w / 2 - lineForSize.horiz.long / 2}px`,
    top: `${sizeElt.y - lineForSize.radius}px`,
    borderRadius: `${lineForSize.radius}px`,
    cursor: "n-resize",
  };
  const styleDown: React.CSSProperties = {
    height: `${lineForSize.horiz.short}px`,
    width: `${lineForSize.horiz.long}px`,
    left: `${sizeElt.x + sizeElt.w / 2 - lineForSize.horiz.long / 2}px`,
    top: `${sizeElt.y + sizeElt.h - lineForSize.radius}px`,
    borderRadius: `${lineForSize.radius}px`,
    cursor: "s-resize",
  };
  const styleDownLeft: React.CSSProperties = {
    height: `${pointForSize.y}px`,
    width: `${pointForSize.x}px`,
    left: `${sizeElt.x - pointForSize.radius}px`,
    top: `${sizeElt.y + sizeElt.h - pointForSize.radius}px`,
    borderRadius: `${pointForSize.radius}px`,
    cursor: "sw-resize",
  };
  const styleUpLeft: React.CSSProperties = {
    height: `${pointForSize.y}px`,
    width: `${pointForSize.x}px`,
    left: `${sizeElt.x - pointForSize.radius}px`,
    top: `${sizeElt.y - pointForSize.radius}px`,
    borderRadius: `${pointForSize.radius}px`,
    cursor: "nw-resize",
  };
  const styleDownRight: React.CSSProperties = {
    height: `${pointForSize.y}px`,
    width: `${pointForSize.x}px`,
    left: `${sizeElt.x + sizeElt.w - pointForSize.radius}px`,
    top: `${sizeElt.y + sizeElt.h - pointForSize.radius}px`,
    borderRadius: `${pointForSize.radius}px`,
    cursor: "se-resize",
  };
  const styleUpRight: React.CSSProperties = {
    height: `${pointForSize.y}px`,
    width: `${pointForSize.x}px`,
    left: `${sizeElt.x + sizeElt.w - pointForSize.radius}px`,
    top: `${sizeElt.y - pointForSize.radius}px`,
    borderRadius: `${pointForSize.radius}px`,
    cursor: "ne-resize",
  };

  return { styleLeft, styleRight, styleUp, styleDown, styleDownLeft, styleUpLeft, styleDownRight, styleUpRight };
}

type ReSizePointsProps = {
  reSizeInitHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  btnStyles: CreateStyles;
};
function ReSizePoints({ btnStyles, reSizeInitHandler }: ReSizePointsProps) {
  return (
    <>
      <div id="left" style={btnStyles.styleLeft} onMouseDown={reSizeInitHandler} className={styles.Button}></div>
      <div id="down" style={btnStyles.styleDown} onMouseDown={reSizeInitHandler} className={styles.Button}></div>
      <div id="top" style={btnStyles.styleUp} onMouseDown={reSizeInitHandler} className={styles.Button}></div>
      <div id="right" style={btnStyles.styleRight} onMouseDown={reSizeInitHandler} className={styles.Button}></div>
      <div id="up-right" style={btnStyles.styleUpRight} onMouseDown={reSizeInitHandler} className={styles.Button}></div>
      <div id="up-left" style={btnStyles.styleUpLeft} onMouseDown={reSizeInitHandler} className={styles.Button}></div>
      <div id="down-right" style={btnStyles.styleDownRight} onMouseDown={reSizeInitHandler} className={styles.Button}></div>
      <div id="down-left" style={btnStyles.styleDownLeft} onMouseDown={reSizeInitHandler} className={styles.Button}></div>
    </>
  );
}

function getRightBorder(boundingRect: Rect) {
  return boundingRect.x + boundingRect.w - 20;
}

function getBottomBorder(boundingRect: Rect) {
  return boundingRect.y + boundingRect.h - 20;
}

function getBoundingRectWithMinSize(deltaSize: Rect, delta: Vector, boundingRect: Rect) {
  const side = getSideOfChanging(deltaSize);
  const correctedBoundingRect: Rect = {
    x: boundingRect.x + deltaSize.x,
    y: boundingRect.y + deltaSize.y,
    w: boundingRect.w + deltaSize.w,
    h: boundingRect.h + deltaSize.h,
  };

  switch (side) {
    case "left":
    case "down-left":
      if (correctedBoundingRect.w < 20) {
        correctedBoundingRect.x = getRightBorder(boundingRect);
        correctedBoundingRect.w = 20;
      }
      if (correctedBoundingRect.h < 20) {
        correctedBoundingRect.y = boundingRect.y;
        correctedBoundingRect.h = 20;
      }
      break;

    case "right":
    case "down":
    case "down-right":
      if (correctedBoundingRect.w < 20) {
        correctedBoundingRect.w = 20;
      }
      if (correctedBoundingRect.h < 20) {
        correctedBoundingRect.h = 20;
      }
      break;

    case "up-right":
      if (correctedBoundingRect.w < 20) {
        correctedBoundingRect.x = boundingRect.x;
        correctedBoundingRect.w = 20;
      }
      if (correctedBoundingRect.h < 20) {
        correctedBoundingRect.y = getBottomBorder(boundingRect);
        correctedBoundingRect.h = 20;
      }
      break;
    case "top":
    case "up-left":
      if (correctedBoundingRect.w < 20) {
        correctedBoundingRect.x = getRightBorder(boundingRect);
        correctedBoundingRect.w = 20;
      }
      if (correctedBoundingRect.h < 20) {
        correctedBoundingRect.y = getBottomBorder(boundingRect);
        correctedBoundingRect.h = 20;
      }
      break;
  }
  correctedBoundingRect.x += delta.x;
  correctedBoundingRect.y += delta.y;

  return correctedBoundingRect;
}

type BoundingBoxProps = {
  deltaSize: Rect;
  delta: Vector;
  handlerInitResize: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
function BoundingBox({ deltaSize, delta, handlerInitResize }: BoundingBoxProps) {
  const selection = useAppSelector((state) => state.present.selection);
  const slides = useAppSelector((state) => state.present.slides);
  const currSlideID = selection.selectedSlideID.at(-1) ?? "";
  const slideObjects = slides.find((slide) => slide.id === currSlideID)?.slideObjects ?? [];
  const selectedSlideObjects = slideObjects?.filter((slideObj) => selection.selectedObjectID.includes(slideObj.id));
  const boundingRect = getBoundingRectWithMinSize(deltaSize, delta, getBoundingRect(selectedSlideObjects));

  const btnStyles = createStyles(boundingRect);
  const style: CSSProperties = {
    top: `${boundingRect.y}px`,
    left: `${boundingRect.x}px`,
    width: `${boundingRect.w}px`,
    height: `${boundingRect.h}px`,
  };

  return selectedSlideObjects.length > 0 ? (
    <>
      <div style={style} className={styles.BoundingBox}></div>
      <ReSizePoints btnStyles={btnStyles} reSizeInitHandler={handlerInitResize}></ReSizePoints>
    </>
  ) : (
    <></>
  );
}

export { BoundingBox };
