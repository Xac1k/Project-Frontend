import type React from "react";
import { type SlideObj } from "../../../../store/types";
import { useEffect, useRef, useState, type JSX } from "react";
import { recomputeSizeSlideObjects } from "../../../../store/functions";
import styles from "./DragAndDropSize.module.css";
import type { StateWorkZone } from "../../src/WorkSpace";
import { emptyRect } from "../../../../store/constant";
import type { Rect } from "../../../../store/typesView";
export type Side = "left" | "down" | "top" | "right" | "up-right" | "up-left" | "down-right" | "down-left" | "none";

type SizeableSlideObjProps = {
  slideID: string;
  slideObj: SlideObj[];
  stateWorkZone: React.RefObject<StateWorkZone>;
  thumbnail: boolean;
};
type SizeableSlideObjHandlersProps = {
  slideID: string;
  slideObjects: SlideObj[];
  stateWorkZone: React.RefObject<StateWorkZone>;
  side: React.RefObject<Side>;
  setAdditionSizeSelectedObj: React.Dispatch<React.SetStateAction<{ x: number; y: number; w: number; h: number }>>;
  AdditionSizeSelectedObj: { x: number; y: number; w: number; h: number };
  thumbnail: boolean;
  bndRect: React.RefObject<Rect>;
};

function getCoeficientsForSizeShift(side: Side): Rect {
  let shiftCoef: Rect = emptyRect;
  switch (side) {
    case "down-left":
      shiftCoef = { x: 1, y: 0, w: -1, h: 1 };
      break;
    case "left":
      shiftCoef = { x: 1, y: 0, w: -1, h: 0 };
      break;
    case "down-right":
      shiftCoef = { x: 0, y: 0, w: 1, h: 1 };
      break;
    case "right":
      shiftCoef = { x: 0, y: 0, w: 1, h: 0 };
      break;
    case "down":
      shiftCoef = { x: 0, y: 0, w: 0, h: 1 };
      break;
    case "up-right":
      shiftCoef = { x: 0, y: 1, w: 1, h: -1 };
      break;
    case "top":
      shiftCoef = { x: 0, y: 1, w: 0, h: -1 };
      break;
    case "up-left":
      shiftCoef = { x: 1, y: 1, w: -1, h: -1 };
      break;
  }

  return shiftCoef;
}

function createSizeHandle({
  slideObjects,
  slideID,
  side,
  setAdditionSizeSelectedObj,
  AdditionSizeSelectedObj,
  stateWorkZone,
  thumbnail,
  bndRect,
}: SizeableSlideObjHandlersProps) {
  const initialPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const onMouseDown = (x: number, y: number) => {
    initialPosition.current = { x: x, y: y };
    stateWorkZone.current.stateSizing.isStarted = true;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (stateWorkZone.current.stateSizing.isStarted && slideObjects.length !== 0) {
      const shift = {
        x: e.clientX - initialPosition.current.x,
        y: e.clientY - initialPosition.current.y,
      };

      const shiftCoef = getCoeficientsForSizeShift(side.current);
      const shiftDiag = Math.max(shift.x, shift.y);
      setAdditionSizeSelectedObj({
        x: (e.shiftKey ? shiftDiag : shift.x) * shiftCoef.x,
        y: (e.shiftKey ? shiftDiag : shift.y) * shiftCoef.y,
        w: (e.shiftKey ? shiftDiag : shift.x) * shiftCoef.w,
        h: (e.shiftKey ? shiftDiag : shift.y) * shiftCoef.h,
      });
      stateWorkZone.current.stateSizing.isMoving = true;
    }
  };

  useEffect(() => {
    if (thumbnail) return;

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [slideObjects, thumbnail]);

  const onMouseUp = () => {
    if (slideObjects.length !== 0 && stateWorkZone.current.stateSizing.isMoving) {
      recomputeSizeSlideObjects(AdditionSizeSelectedObj, bndRect, side, slideObjects, slideID);
      setAdditionSizeSelectedObj({ x: 0, y: 0, w: 0, h: 0 });
    }
    stateWorkZone.current.stateSizing.isStarted = false;
    stateWorkZone.current.stateSizing.isMoving = false;
  };

  useEffect(() => {
    if (thumbnail) return;
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [AdditionSizeSelectedObj, slideObjects, thumbnail]);

  return onMouseDown;
}

function getInitFunc(onMouseDown: (x: number, y: number) => void, sideRef: React.RefObject<Side>, side: Side) {
  const func = (e: React.MouseEvent<HTMLDivElement>) => {
    sideRef.current = side;
    onMouseDown(e.clientX, e.clientY);
    e.preventDefault();
  };

  return func;
}

type HandlersBtn = {
  onMouseDownRight: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDownLeft: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDownBottom: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDownTop: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDownUpRight: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDownUpLeft: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDownBottomRight: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDownBottomLeft: (e: React.MouseEvent<HTMLDivElement>) => void;
};
function getArrayInitFunctions(onMouseDown: (x: number, y: number) => void, side: React.RefObject<Side>): HandlersBtn {
  const onMouseDownRight = getInitFunc(onMouseDown, side, "right");
  const onMouseDownLeft = getInitFunc(onMouseDown, side, "left");
  const onMouseDownBottom = getInitFunc(onMouseDown, side, "down");
  const onMouseDownTop = getInitFunc(onMouseDown, side, "top");
  const onMouseDownUpRight = getInitFunc(onMouseDown, side, "up-right");
  const onMouseDownUpLeft = getInitFunc(onMouseDown, side, "up-left");
  const onMouseDownBottomRight = getInitFunc(onMouseDown, side, "down-right");
  const onMouseDownBottomLeft = getInitFunc(onMouseDown, side, "down-left");

  return {
    onMouseDownRight,
    onMouseDownLeft,
    onMouseDownBottom,
    onMouseDownTop,
    onMouseDownUpRight,
    onMouseDownUpLeft,
    onMouseDownBottomRight,
    onMouseDownBottomLeft,
  };
}

type GetBoundingRect = {
  origin: Rect;
  withAddition: Rect;
};
function getBoundingRect(slideObjects: SlideObj[], AdditionSizeSelectedObj: Rect): GetBoundingRect {
  const slide = slideObjects[0];
  if (!slide)
    return {
      origin: emptyRect,
      withAddition: emptyRect,
    };
  const rect: { x0: number; y0: number; x1: number; y1: number } = {
    x0: Infinity,
    y0: Infinity,
    x1: 0,
    y1: 0,
  };
  slideObjects.forEach((slide) => {
    if (slide.x < rect.x0) {
      rect.x0 = slide.x;
    }
    if (slide.y < rect.y0) {
      rect.y0 = slide.y;
    }
    if (slide.y + slide.h > rect.y1) {
      rect.y1 = slide.y + slide.h;
    }
    if (slide.x + slide.w > rect.x1) {
      rect.x1 = slide.x + slide.w;
    }
  });
  const boundingRect = {
    origin: {
      x: rect.x0,
      y: rect.y0,
      w: rect.x1 - rect.x0,
      h: rect.y1 - rect.y0,
    },
    withAddition: {
      x: rect.x0 + AdditionSizeSelectedObj.x,
      y: rect.y0 + AdditionSizeSelectedObj.y,
      w: rect.x1 - rect.x0 + AdditionSizeSelectedObj.w,
      h: rect.y1 - rect.y0 + AdditionSizeSelectedObj.h,
    },
  };
  return boundingRect;
}

function ifMinSizeX(bndRectWithAddition: Rect) {
  //Math.abs(bndRectWithAddition.w) < minSizeSlideObjOrGroupSlideObj.w ||
  return bndRectWithAddition.w < 1;
}

function ifMinSizeY(bndRectWithAddition: Rect) {
  //Math.abs(bndRectWithAddition.h) < minSizeSlideObjOrGroupSlideObj.h ||
  return bndRectWithAddition.h < 1;
}

type CreateStyles = {
  styleLeft: React.CSSProperties;
  styleRight: React.CSSProperties;
  styleUp: React.CSSProperties;
  styleDown: React.CSSProperties;
  styleDownLeft: React.CSSProperties;
  styleUpLeft: React.CSSProperties;
  styleDownRight: React.CSSProperties;
  styleUpRight: React.CSSProperties;
  styleBoundingRect: React.CSSProperties;
};

function createStyles(sizeElt: Rect) {
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
  const styleBoundingRect: React.CSSProperties = {
    position: `absolute`,
    top: `${sizeElt.y}px`,
    left: `${sizeElt.x}px`,
    width: `${sizeElt.w}px`,
    height: `${sizeElt.h}px`,
    border: `1px solid black`,
  };

  return { styleLeft, styleRight, styleUp, styleDown, styleDownLeft, styleUpLeft, styleDownRight, styleUpRight, styleBoundingRect };
}

type useSizeProps = {
  data: {
    addSizeMarkedObj: Rect;
    bndRect: React.RefObject<Rect>;
    bndRectWithAddition: Rect;
    side: React.RefObject<Side>;
  };
  entityForSize: {
    buttons: JSX.Element;
    boundingRect: JSX.Element;
  };
};

export type SizeData = {
  addSizeMarkedObj: Rect;
  bndRect: React.RefObject<Rect>;
  side: React.RefObject<Side>;
};

function handleMinSize(sizeElt: Rect, AdditionSizeSelectedObj: Rect, prevData: React.RefObject<useSizeProps | null>) {
  if ((ifMinSizeX(sizeElt) || ifMinSizeY(sizeElt)) && prevData.current) {
    if (ifMinSizeX(sizeElt)) {
      sizeElt.x = prevData.current.data.bndRectWithAddition.x;
      sizeElt.w = prevData.current.data.bndRectWithAddition.w;
      AdditionSizeSelectedObj.x = prevData.current.data.addSizeMarkedObj.x;
      AdditionSizeSelectedObj.w = prevData.current.data.addSizeMarkedObj.w;
    }
    if (ifMinSizeY(sizeElt)) {
      sizeElt.y = prevData.current.data.bndRectWithAddition.y;
      sizeElt.h = prevData.current.data.bndRectWithAddition.h;
      AdditionSizeSelectedObj.y = prevData.current.data.addSizeMarkedObj.y;
      AdditionSizeSelectedObj.h = prevData.current.data.addSizeMarkedObj.h;
    }
  }

  return [sizeElt, AdditionSizeSelectedObj];
}

function handleProhibitedSituation(
  sizeElt: Rect | undefined,
  stateWorkZone: React.RefObject<StateWorkZone>,
  boundingRectWithAddition: Rect,
  AdditionSizeSelectedObj: Rect,
  side: React.RefObject<Side>,
  bndRect: React.RefObject<Rect>,
): { response: boolean; data: useSizeProps } {
  return {
    response: sizeElt === undefined || stateWorkZone.current.stateDnD.isMoving || stateWorkZone.current.edit,
    data: {
      data: {
        addSizeMarkedObj: AdditionSizeSelectedObj,
        bndRect: bndRect,
        bndRectWithAddition: boundingRectWithAddition,
        side,
      },
      entityForSize: {
        buttons: <></>,
        boundingRect: <></>,
      },
    },
  };
}

type CombineAnswerProps = {
  stylesBtn: CreateStyles;
  handlersInitBtn: HandlersBtn;
  props: SizeableSlideObjProps;
  side: React.RefObject<Side>;
  boundingRectWithAddition: Rect;
  AdditionSizeSelectedObj: Rect;
  bndRect: React.RefObject<Rect>;
};
function combineTheAnswer({
  stylesBtn,
  handlersInitBtn,
  props,
  side,
  boundingRectWithAddition,
  AdditionSizeSelectedObj,
  bndRect,
}: CombineAnswerProps): useSizeProps {
  return {
    data: {
      addSizeMarkedObj: AdditionSizeSelectedObj,
      bndRect: bndRect,
      bndRectWithAddition: boundingRectWithAddition,
      side,
    },
    entityForSize: {
      buttons: (
        <>
          {!props.stateWorkZone.current.stateDnD.isMoving && props.slideObj.length != 0 && (
            <>
              <div style={stylesBtn.styleLeft} onMouseDown={handlersInitBtn.onMouseDownLeft} className={styles.Button}></div>
              <div style={stylesBtn.styleRight} onMouseDown={handlersInitBtn.onMouseDownRight} className={styles.Button}></div>
              <div style={stylesBtn.styleUp} onMouseDown={handlersInitBtn.onMouseDownTop} className={styles.Button}></div>
              <div style={stylesBtn.styleDown} onMouseDown={handlersInitBtn.onMouseDownBottom} className={styles.Button}></div>
              <div style={stylesBtn.styleDownLeft} onMouseDown={handlersInitBtn.onMouseDownBottomLeft} className={styles.Button}></div>
              <div style={stylesBtn.styleUpLeft} onMouseDown={handlersInitBtn.onMouseDownUpLeft} className={styles.Button}></div>
              <div style={stylesBtn.styleDownRight} onMouseDown={handlersInitBtn.onMouseDownBottomRight} className={styles.Button}></div>
              <div style={stylesBtn.styleUpRight} onMouseDown={handlersInitBtn.onMouseDownUpRight} className={styles.Button}></div>
            </>
          )}
        </>
      ),
      boundingRect: (
        <>
          {props.slideObj.length > 1 && (
            <>
              <div style={stylesBtn.styleBoundingRect}></div>
            </>
          )}
        </>
      ),
    },
  };
}

function useSize(props: SizeableSlideObjProps): useSizeProps {
  let [AdditionSizeSelectedObj, setAdditionSizeSelectedObj] = useState<Rect>(emptyRect);
  const bndRect = useRef<Rect>(emptyRect);
  const side = useRef<Side>("none");
  const prevData = useRef<useSizeProps>(null);
  const boundingRect = getBoundingRect(props.slideObj, AdditionSizeSelectedObj);
  bndRect.current = boundingRect.origin;
  const stateWorkZone = props.stateWorkZone;
  const onMouseDown = createSizeHandle({
    ...props,
    slideObjects: props.slideObj,
    side: side,
    setAdditionSizeSelectedObj,
    AdditionSizeSelectedObj,
    bndRect: bndRect,
  });
  let sizeElt = boundingRect.withAddition;
  const handlersInitBtn = getArrayInitFunctions(onMouseDown, side);

  const { response, data } = handleProhibitedSituation(sizeElt, stateWorkZone, boundingRect.withAddition, AdditionSizeSelectedObj, side, bndRect);
  if (response) return data;
  [sizeElt, AdditionSizeSelectedObj] = handleMinSize(sizeElt, AdditionSizeSelectedObj, prevData);
  const stylesBtn = createStyles(sizeElt);

  const answer = combineTheAnswer({
    stylesBtn,
    handlersInitBtn,
    props,
    side,
    boundingRectWithAddition: boundingRect.withAddition,
    AdditionSizeSelectedObj,
    bndRect,
  });
  prevData.current = answer;
  return answer;
}

export { useSize };
