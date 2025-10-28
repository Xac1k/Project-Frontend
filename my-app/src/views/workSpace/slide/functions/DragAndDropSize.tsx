import type React from "react";
import { setPosition, setSize, type SlideObj } from "../../../../store/types";
import { useEffect, useRef, useState, type JSX } from "react";
import { dispatch, doFunc } from "../../../../store/functions";
import styles from "./DragAndDropSize.module.css";
import type { StateWorkZone } from "../../src/WorkSpace";
import { computeSizeAndPosition } from "../slideObj/functions/computeSizeAndPosition";

export type Side = "left" | "down" | "top" | "right" | "none";

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
  bndRect: React.RefObject<{
    x: number;
    y: number;
    w: number;
    h: number;
  }>;
};
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
      const shift = { x: e.clientX - initialPosition.current.x, y: e.clientY - initialPosition.current.y };
      switch (side.current) {
        case "left":
          setAdditionSizeSelectedObj({ x: shift.x, w: -shift.x, y: 0, h: 0 });
          break;
        case "down":
          setAdditionSizeSelectedObj({ h: shift.y, w: 0, x: 0, y: 0 });
          break;
        case "top":
          setAdditionSizeSelectedObj({ h: -shift.y, y: shift.y, w: 0, x: 0 });
          break;
        case "right":
          setAdditionSizeSelectedObj({ w: shift.x, h: 0, x: 0, y: 0 });
          break;
        default:
          break;
      }
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
      for (const slideObj of slideObjects) {
        const DataSize = {
          addSizeMarkedObj: AdditionSizeSelectedObj,
          bndRect: bndRect,
          side: side,
        };
        const newSize = computeSizeAndPosition(DataSize, slideObj);
        console.log(
          "Расширяем и и передвигаем",
          slideObjects.map((slide) => slide.id),
          "на",
          AdditionSizeSelectedObj,
        );
        doFunc(setSize, { slideID, slideObjID: slideObj.id, w: newSize.w, h: newSize.h });
        dispatch(setPosition, { slideID, slideObjID: slideObj.id, x: newSize.x, y: newSize.y });
      }
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

function getBoundingRect(
  slideObjects: SlideObj[],
  AdditionSizeSelectedObj: {
    x: number;
    y: number;
    w: number;
    h: number;
  },
) {
  const slide = slideObjects[0];
  if (!slide) return { origin: { x: 0, y: 0, w: 0, h: 0 }, withAddition: { x: 0, y: 0, w: 0, h: 0 } };
  const rect: { x0: number; y0: number; x1: number; y1: number } = { x0: Infinity, y0: Infinity, x1: 0, y1: 0 };
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

type useSizeProps = {
  data: {
    addSizeMarkedObj: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
    bndRect: React.RefObject<{
      x: number;
      y: number;
      w: number;
      h: number;
    }>;
    side: React.RefObject<Side>;
  };
  entityForSize: {
    buttons: JSX.Element;
    boundingRect: JSX.Element;
  };
};

export type SizeData = {
  addSizeMarkedObj: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  bndRect: React.RefObject<{
    x: number;
    y: number;
    w: number;
    h: number;
  }>;
  side: React.RefObject<Side>;
};

/**
 * Добавляет JSX элементы для resize.
 * @param slideObj - выделенные элементы SlideObj
 * @param slideID - ID слайда на котором происходит действие
 * @param stateWorkZone - состояние рабочей зоны
 * @param thumbnail - является ли слайд миниатюрой или нет
 * @returns JSX элементы с слушателями событий DragAndDrop для resize
 */
function useSize(props: SizeableSlideObjProps): useSizeProps {
  const [AdditionSizeSelectedObj, setAdditionSizeSelectedObj] = useState<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });
  const bndRect = useRef<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });
  const side = useRef<Side>("none");
  const boundingRect = getBoundingRect(props.slideObj, AdditionSizeSelectedObj);
  bndRect.current = boundingRect.origin;
  const onMouseDown = createSizeHandle({
    ...props,
    slideObjects: props.slideObj,
    side: side,
    setAdditionSizeSelectedObj,
    AdditionSizeSelectedObj,
    bndRect: bndRect,
  });

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

  const sizeElt = boundingRect.withAddition;
  if (sizeElt === undefined || props.stateWorkZone.current.stateDnD.isMoving || props.stateWorkZone.current.edit) {
    return {
      data: {
        addSizeMarkedObj: AdditionSizeSelectedObj,
        bndRect: bndRect,
        side,
      },
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

  // const pointForSize = { y: 10, x: 10, radius: 5 };
  let lineForSize = { long: 50, short: 10, radius: 5 }; //TODO Сделать чтобы сохранялись именно соотношения, а не сами размеры

  const styleLeft: React.CSSProperties = {
    position: `absolute`,
    height: `${lineForSize.long}px`,
    width: `${lineForSize.short}px`,
    left: `${sizeElt.x - lineForSize.radius}px`,
    top: `${sizeElt.y + sizeElt.h / 2 - lineForSize.long / 2}px`,
    borderRadius: `${lineForSize.radius}px`,
    cursor: "w-resize",
  };
  const styleRight: React.CSSProperties = {
    position: `absolute`,
    height: `${lineForSize.long}px`,
    width: `${lineForSize.short}px`,
    left: `${sizeElt.x + sizeElt.w - lineForSize.radius}px`,
    top: `${sizeElt.y + sizeElt.h / 2 - lineForSize.long / 2}px`,
    borderRadius: `${lineForSize.radius}px`,
    cursor: "e-resize",
  };
  const styleUp: React.CSSProperties = {
    position: `absolute`,
    height: `${lineForSize.short}px`,
    width: `${lineForSize.long}px`,
    left: `${sizeElt.x + sizeElt.w / 2 - lineForSize.long / 2}px`,
    top: `${sizeElt.y - lineForSize.radius}px`,
    borderRadius: `${lineForSize.radius}px`,
    cursor: "n-resize",
  };
  const styleDown: React.CSSProperties = {
    position: `absolute`,
    height: `${lineForSize.short}px`,
    width: `${lineForSize.long}px`,
    left: `${sizeElt.x + sizeElt.w / 2 - lineForSize.long / 2}px`,
    top: `${sizeElt.y + sizeElt.h - lineForSize.radius}px`,
    borderRadius: `${lineForSize.radius}px`,
    cursor: "s-resize",
  };
  return {
    data: {
      addSizeMarkedObj: AdditionSizeSelectedObj,
      bndRect: bndRect,
      side,
    },
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
