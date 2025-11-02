import { type CSSProperties } from "react";
import type { SlideObj } from "../../../../store/types";
import type { Rect, Vector } from "../../../../store/typesView";
import { getBoundingRect } from "../../../../store/functions";
import styles from "./BoundingBox.module.css";

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

function getSideOfChanging(deltaSize: Rect) {
  const isXEmpty = deltaSize.x == 0;
  const isYEmpty = deltaSize.y == 0;
  const isWEmpty = deltaSize.w == 0;
  const isHEmpty = deltaSize.h == 0;

  if (!isXEmpty && !isWEmpty && !isHEmpty && isYEmpty) {
    return "down-left";
  }
  if (!isXEmpty && !isWEmpty && isHEmpty && isYEmpty) {
    return "left";
  }
  if (isXEmpty && isYEmpty && !isWEmpty && !isHEmpty) {
    return "down-right";
  }
  if (isXEmpty && isYEmpty && !isWEmpty && isHEmpty) {
    return "right";
  }
  if (isXEmpty && isYEmpty && isWEmpty && !isHEmpty) {
    return "down";
  }
  if (isXEmpty && !isYEmpty && !isWEmpty && !isHEmpty) {
    return "up-right";
  }
  if (isXEmpty && !isYEmpty && isWEmpty && !isHEmpty) {
    return "top";
  }
  if (!isXEmpty && !isYEmpty && !isWEmpty && !isHEmpty) {
    return "up-left";
  }
  return "none";
}

function getRightBorder(boundingRect: Rect) {
  return boundingRect.x + boundingRect.w - 20;
}

function getBottomBorder(boundingRect: Rect) {
  return boundingRect.y + boundingRect.h - 20;
}

function getBoundingRectWithMinSize(deltaSize: Rect, boundingRect: Rect) {
  const side = getSideOfChanging(deltaSize);
  const correctedBoundingRect: Rect = {
    x: boundingRect.x,
    y: boundingRect.y,
    w: boundingRect.w,
    h: boundingRect.h,
  };
  correctedBoundingRect.h = boundingRect.h + deltaSize.h;
  correctedBoundingRect.w = boundingRect.w + deltaSize.w;
  correctedBoundingRect.x = boundingRect.x + deltaSize.x;
  correctedBoundingRect.y = boundingRect.y + deltaSize.y;

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
  return correctedBoundingRect;
}

type BoundingBoxProps = {
  slideObjects: SlideObj[];
  deltaSize: Rect;
  selectionSlideObjects: string[];
  delta: Vector;
  handlerInitResize: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
function BoundingBox({ slideObjects, deltaSize, selectionSlideObjects, delta, handlerInitResize }: BoundingBoxProps) {
  const selectedSlideObjects = slideObjects.filter((slideObj) => selectionSlideObjects.includes(slideObj.id));
  const boundingRect = getBoundingRectWithMinSize(deltaSize, getBoundingRect(selectedSlideObjects));
  boundingRect.x += delta.x;
  boundingRect.y += delta.y;

  const btnStyles = createStyles(boundingRect);
  const style: CSSProperties = {
    position: `absolute`,
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
