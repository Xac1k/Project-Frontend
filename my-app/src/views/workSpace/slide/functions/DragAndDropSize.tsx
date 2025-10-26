import type React from "react";
import { setPosition, setSize, type SlideObj } from "../../../../store/types";
import { useEffect, useRef, useState, type JSX } from "react";
import { dispatch, doFunc } from "../../../../store/functions";
import styles from "./DragAndDropSize.module.css";
import type { StateWorkZone } from "../../src/WorkSpace";

type Side = "left" | "down" | "top" | "right" | "none";

type SizeableSlideObjProps = {
  slideID: string;
  slideObj: SlideObj[];
  stateWorkZone: React.RefObject<StateWorkZone>;
};
type SizeableSlideObjHandlersProps = {
  slideID: string;
  slideObjects: SlideObj[];
  stateWorkZone: React.RefObject<StateWorkZone>;
  side: React.RefObject<Side>;
  setAdditionSizeSelectedObj: React.Dispatch<React.SetStateAction<{ x: number; y: number; w: number; h: number }>>;
  AdditionSizeSelectedObj: { x: number; y: number; w: number; h: number };
};
function createSizeHandle({
  slideObjects,
  slideID,
  side,
  setAdditionSizeSelectedObj,
  AdditionSizeSelectedObj,
  stateWorkZone,
}: SizeableSlideObjHandlersProps) {
  const initialPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const onMouseDown = (x: number, y: number) => {
    initialPosition.current = { x: x, y: y };
    stateWorkZone.current.stateSizing.isStarted = true;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (stateWorkZone.current.stateSizing.isStarted && slideObjects) {
        stateWorkZone.current.stateSizing.isMoving = true;
        const shift = { x: e.clientX - initialPosition.current.x, y: e.clientY - initialPosition.current.y };
        switch (side.current) {
          case "left":
            setAdditionSizeSelectedObj({ x: -shift.x, w: -shift.x, y: 0, h: 0 });
            break;
          case "down":
            setAdditionSizeSelectedObj({ h: shift.y, w: 0, x: 0, y: 0 });
            break;
          case "top":
            setAdditionSizeSelectedObj({ h: -shift.y, y: -shift.y, w: 0, x: 0 });
            break;
          case "right":
            setAdditionSizeSelectedObj({ w: shift.x, h: 0, x: 0, y: 0 });
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [slideObjects]);

  useEffect(() => {
    const onMouseUp = () => {
      const slideObj = slideObjects[0];
      if (slideObj && stateWorkZone.current.stateSizing.isMoving) {
        console.log(AdditionSizeSelectedObj);
        const newSize = { w: slideObj.w + AdditionSizeSelectedObj.w, h: slideObj.h + AdditionSizeSelectedObj.h };
        const newPos = { x: slideObj.x - AdditionSizeSelectedObj.x, y: slideObj.y - AdditionSizeSelectedObj.y };
        doFunc(setSize, { slideID, slideObjID: slideObj.id, w: newSize.w, h: newSize.h });
        dispatch(setPosition, { slideID, slideObjID: slideObj.id, x: newPos.x, y: newPos.y });
        setAdditionSizeSelectedObj({ x: 0, y: 0, w: 0, h: 0 });
      }
      stateWorkZone.current.stateSizing.isStarted = false;
      stateWorkZone.current.stateSizing.isMoving = false;
    };
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [AdditionSizeSelectedObj, slideObjects]);

  return onMouseDown;
}

function getBoundingRect(slideObjects: SlideObj[]) {
  const slide = slideObjects[0];
  if (!slide) return { x: 0, y: 0, w: 0, h: 0 };
  const rect: { x0: number; y0: number; x1: number; y1: number } = { x0: slide.x, y0: slide.y, x1: slide.x + slide.w, y1: slide.y + slide.h };
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
  const boundingRect = { x: rect.x0, y: rect.y0, w: rect.x1 - rect.x0, h: rect.y1 - rect.y0 };
  return boundingRect;
}

type useSizeProps = {
  additionSizeSelectedObj: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  entityForSize: {
    buttons: JSX.Element;
    boundingRect: JSX.Element;
  };
};

/**
 * Добавляет JSX элементы для resize. При условии, что установлено разрешение Size = true
 * и выделен один объект.
 * @param slideObj - выделенный элемент SlideObj
 * @returns JSX элементы с слушателями событий DragAndDrop для resize
 */
function useSize(props: SizeableSlideObjProps): useSizeProps {
  const [AdditionSizeSelectedObj, setAdditionSizeSelectedObj] = useState<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });
  const side = useRef<Side>("none");
  const onMouseDown = createSizeHandle({ ...props, slideObjects: props.slideObj, side: side, setAdditionSizeSelectedObj, AdditionSizeSelectedObj });

  const onMouseDownRight = (e: React.MouseEvent<HTMLDivElement>) => {
    side.current = "right";
    onMouseDown(e.clientX, e.clientY);
    e.preventDefault();
  };
  const onMouseDownBottom = (e: React.MouseEvent<HTMLDivElement>) => {
    side.current = "down";
    onMouseDown(e.clientX, e.clientY);
    e.preventDefault();
  };
  const onMouseDownTop = (e: React.MouseEvent<HTMLDivElement>) => {
    side.current = "top";
    onMouseDown(e.clientX, e.clientY);
    e.preventDefault();
  };
  const onMouseDownLeft = (e: React.MouseEvent<HTMLDivElement>) => {
    side.current = "left";
    onMouseDown(e.clientX, e.clientY);
    e.preventDefault();
  };

  const pointForSize = { y: 10, x: 10, radius: 5 };
  const sizeElt = getBoundingRect(props.slideObj);
  if (sizeElt === undefined) {
    return {
      additionSizeSelectedObj: AdditionSizeSelectedObj,
      entityForSize: {
        buttons: <></>,
        boundingRect: <></>,
      },
    };
  }

  const styleBoundingRect: React.CSSProperties = {
    position: `absolute`,
    top: `${sizeElt.y}px`,
    left: `${sizeElt.x}px`,
    width: `${sizeElt.w}px`,
    height: `${sizeElt.h}px`,
    border: `1px solid black`,
  };

  const AdditionHight = side.current === "down" ? AdditionSizeSelectedObj.h / 2 : -AdditionSizeSelectedObj.h / 2;
  const styleLeft: React.CSSProperties = {
    position: `absolute`,
    height: `${pointForSize.y}px`,
    width: `${pointForSize.x}px`,
    left: `${sizeElt.x - AdditionSizeSelectedObj.x - pointForSize.x / 2}px`,
    top: `${sizeElt.y + AdditionHight + sizeElt.h / 2 - pointForSize.y / 2}px`,
    borderRadius: `${pointForSize.radius}px`,
    cursor: "w-resize",
  };
  const styleRight: React.CSSProperties = {
    position: `absolute`,
    height: `${pointForSize.y}px`,
    width: `${pointForSize.x}px`,
    left: `${sizeElt.x + sizeElt.w - AdditionSizeSelectedObj.x + AdditionSizeSelectedObj.w - pointForSize.x / 2}px`,
    top: `${sizeElt.y + sizeElt.h / 2 + AdditionHight - pointForSize.y / 2}px`,
    borderRadius: `${pointForSize.radius}px`,
    cursor: "e-resize",
  };
  const styleUp: React.CSSProperties = {
    position: `absolute`,
    height: `${pointForSize.y}px`,
    width: `${pointForSize.x}px`,
    left: `${sizeElt.x + sizeElt.w / 2 - pointForSize.x / 2 + AdditionSizeSelectedObj.w / 2 - AdditionSizeSelectedObj.x}px`,
    top: `${sizeElt.y - pointForSize.y / 2 - AdditionSizeSelectedObj.y}px`,
    borderRadius: `${pointForSize.radius}px`,
    cursor: "n-resize",
  };
  const AdditionWidth = side.current === "right" ? AdditionSizeSelectedObj.w / 2 : -AdditionSizeSelectedObj.w / 2;
  let AdditionHeight = side.current === "down" ? AdditionSizeSelectedObj.h : -AdditionSizeSelectedObj.h;
  AdditionHeight = side.current === "top" ? 0 : AdditionHeight;
  const styleDown: React.CSSProperties = {
    position: `absolute`,
    height: `${pointForSize.y}px`,
    width: `${pointForSize.x}px`,
    left: `${sizeElt.x + sizeElt.w / 2 - pointForSize.x / 2 + AdditionWidth}px`,
    top: `${sizeElt.y + sizeElt.h - pointForSize.y / 2 + AdditionHeight}px`,
    borderRadius: `${pointForSize.radius}px`,
    cursor: "s-resize",
  };
  return {
    additionSizeSelectedObj: AdditionSizeSelectedObj,
    entityForSize: {
      buttons: (
        <>
          {!props.stateWorkZone.current.stateDnD.isMoving && props.slideObj.length != 0 && (
            <>
              <div style={styleLeft} onMouseDown={onMouseDownLeft} className={styles.Button}></div>
              <div style={styleRight} onMouseDown={onMouseDownRight} className={styles.Button}></div>
              <div style={styleUp} onMouseDown={onMouseDownTop} className={styles.Button}></div>
              <div style={styleDown} onMouseDown={onMouseDownBottom} className={styles.Button}></div>
            </>
          )}
        </>
      ),
      boundingRect: (
        <>
          {props.slideObj.length > 1 && (
            <>
              <div style={styleBoundingRect}></div>
            </>
          )}
        </>
      ),
    },
  };
}

export { useSize };
