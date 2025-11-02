import { setSlideObjAsUnselected, type Slide, removeSlideObject } from "../../../../store/types";
import styles from "./Slide.module.css";
import { dispatch } from "../../../../store/functions";
import type React from "react";
import { useEffect } from "react";
import { useDnD } from "../functions/DragAndDrop";
import { SlideObject } from "../slideObj/src/slideObj";
import type { StateWorkZone } from "../../src/WorkSpace";
import { getHandlerForSelect } from "../slideObj/functions/createClickHandle";
import { BoundingBox } from "./BoundingBox";
import { useReSize } from "../functions/DragAndDropSize";

type SlideProps = {
  slide: Slide;
  scale?: number;
  style?: React.CSSProperties;
  selectedObj: string[];
  stateWorkZone: React.RefObject<StateWorkZone>;
};
function SlideWorkSpace(props: SlideProps) {
  const { slide, selectedObj: selectionSlideObj } = props;
  const scale = props.scale ?? 1;
  const { handlerInitDnD, delta } = useDnD({ stateWorkZone: props.stateWorkZone });
  const selectedObjData = slide.slideObjects.filter((slide) => selectionSlideObj.includes(slide.id));
  const { deltaSize, handlerInitResize } = useReSize({ stateWorkZone: props.stateWorkZone, selectedSlideObjects: selectedObjData });
  // Ref на все объекты на слайде -> рендер рамки для объектов -> рендер кнопок для resize + useresize

  const style: React.CSSProperties = {
    ...props.style,
    width: `${1011 * scale}px`,
    height: `${643 * scale}px`,
    backgroundColor: slide.background.type == "color" ? slide.background.color : undefined,
    backgroundImage: slide.background.type == "image" ? `url(${slide.background.src})` : undefined,
    // borderRadius: props.thumbnail ? `15px` : undefined,
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

  return (
    <div style={style} className={styles.Slide}>
      <BoundingBox
        selectionSlideObjects={props.selectedObj}
        deltaSize={deltaSize}
        slideObjects={slide.slideObjects}
        delta={delta}
        handlerInitResize={handlerInitResize}
      ></BoundingBox>

      {slide.slideObjects.map((slideObj) => {
        const isSelected = props.selectedObj.includes(slideObj.id);
        const handlerSelect = getHandlerForSelect(slideObj.id, slideObj.type, props.stateWorkZone);
        const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.currentTarget.style.cursor = "grabbing";
          handlerSelect(e);
          handlerInitDnD(e);
        };
        const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.currentTarget.style.cursor = "grab";
        };
        return (
          <SlideObject
            key={slideObj.id}
            slideObj={slideObj}
            delta={delta}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            isSelected={isSelected}
            deltaSize={deltaSize}
          />
        );
      })}
    </div>
  );
}

type ThumbnailSlide = {
  slide: Slide;
  scale?: number;
  externalStyle?: React.CSSProperties;
  onMouseDown?: (e: React.MouseEvent) => void;
};
function SlideThumblnail({ slide, scale, onMouseDown, externalStyle }: ThumbnailSlide) {
  scale = scale ?? 1;

  const style: React.CSSProperties = {
    ...externalStyle,
    width: `${1011 * scale}px`,
    height: `${643 * scale}px`,
    backgroundColor: slide.background.type == "color" ? slide.background.color : undefined,
    backgroundImage: slide.background.type == "image" ? `url(${slide.background.src})` : undefined,
  };
  return (
    <div style={style} onMouseDown={onMouseDown} className={styles.ThumblnailSlide}>
      {slide.slideObjects.map((slideObj) => {
        return <SlideObject key={slideObj.id} slideObj={slideObj} scale={scale} />;
      })}
    </div>
  );
}

export { SlideThumblnail, SlideWorkSpace };
