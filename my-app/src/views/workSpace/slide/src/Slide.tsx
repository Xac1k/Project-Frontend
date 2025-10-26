import { setSlideObjAsUnselected, type Slide, removeSlideObject } from "../../../../store/types";
import styles from "./Slide.module.css";
import { dispatch } from "../../../../store/functions";
import type React from "react";
import { useEffect, type JSX } from "react";
import { useDnD } from "../functions/DragAndDrop";
import { useSize } from "../functions/DragAndDropSize";
import { renderSlideObjects } from "../slideObj/src/slideObj";
import type { StateWorkZone } from "../../src/WorkSpace";

type SlideProps = {
  slide: Slide;
  scale: number;
  thumbnail?: boolean;
  onClick: ((e: React.MouseEvent) => void) | null;
  style: React.CSSProperties;
  selectedObj: string[];
  stateWorkZone: React.RefObject<StateWorkZone>;
};

export function SlideWorkSpace(props: SlideProps) {
  const { slide, selectedObj: selectionSlideObj, scale } = props;
  const thumbnail = props?.thumbnail ?? false;
  const selectedObjData = slide.slideObjects.filter((slide) => selectionSlideObj.includes(slide.id));
  // if (!thumbnail) console.log(props, selectionSlideObj);
  const { onMouseDown, shiftSelectedObj } = useDnD({ slideID: slide.id, selectedObjID: selectionSlideObj, stateWorkZone: props.stateWorkZone });
  const { additionSizeSelectedObj, entityForSize } = useSize({ slideID: slide.id, slideObj: selectedObjData, stateWorkZone: props.stateWorkZone });
  const style: React.CSSProperties = {
    ...props.style,
    width: `${1011 * props.scale}px`,
    height: `${643 * props.scale}px`,
    backgroundColor: slide.background.type == "color" ? slide.background.color : undefined,
    backgroundImage: slide.background.type == "image" ? `url(${slide.background.src})` : undefined,
    borderRadius: props.thumbnail ? `15px` : undefined,
  };

  useEffect(() => {
    const deleteObj = (e: KeyboardEvent) => {
      if (e.key === "Delete" && !props.stateWorkZone?.current.edit) {
        for (let id of selectionSlideObj) {
          dispatch(setSlideObjAsUnselected, { slideObjID: id });
          dispatch(removeSlideObject, { slideID: slide.id, slideObjID: id });
        }
      }
    };
    document.addEventListener("keydown", deleteObj);
    return () => document.removeEventListener("keydown", deleteObj);
  }, [selectionSlideObj]);

  const slideJSX: JSX.Element = renderSlideObjects({
    slide,
    selectionSlideObj,
    thumbnail,
    scale,
    shiftSelectedObj,
    onMouseDown,
    additionSizeSelectedObj,
    stateWorkZone: props.stateWorkZone,
  });

  if (!props.onClick) {
    return (
      <div style={style} className={styles.Slide}>
        {entityForSize.boundingRect}
        {slideJSX}
        {entityForSize.buttons}
      </div>
    );
  }

  return (
    <div style={style} onClick={props.onClick} className={styles.Slide}>
      {slideJSX}
    </div>
  );
}
