import { type Slide } from "../../../../store/types";
import styles from "./Slide.module.css";
import type React from "react";
import { useDnD } from "../../../hooks/DragAndDrop";
import { SlideObject } from "./slideObj/SlideObj";
import { BoundingBox } from "./BoundingBox";
import { useReSize } from "../../../hooks/DragAndDropSize";
import { DragableSlideObject } from "./slideObj/DragableSlideObj";
import { useKeyboardDelSlideObj } from "../../../hooks/DeleteSlideObj";
import { useAppActions, useAppSelector } from "../../../../store/store";
import { standartSlideSize } from "../../../../store/constant";

type SlideProps = {
  slide: Slide;
  scale?: number;
  externalStyle?: React.CSSProperties;
};
function SlideWorkSpace({ slide, scale, externalStyle }: SlideProps) {
  scale = scale ?? 1;
  useKeyboardDelSlideObj();
  const { handlerInitDnD, delta } = useDnD();
  const { deltaSize, handlerInitResize } = useReSize();

  const style: React.CSSProperties = {
    ...externalStyle,
    width: `${1011 * scale}px`,
    height: `${643 * scale}px`,
    backgroundColor: slide.background.type == "color" ? slide.background.color : undefined,
    backgroundImage: slide.background.type == "image" ? `url(${slide.background.src})` : undefined,
  };

  return (
    <div style={style} className={styles.Slide}>
      <BoundingBox deltaSize={deltaSize} delta={delta} handlerInitResize={handlerInitResize}></BoundingBox>

      {slide.slideObjects.map((slideObj) => {
        return <DragableSlideObject {...{ slideObj, handlerInitDnD, delta, deltaSize }} key={slideObj.id} />; // Динамческая передача размера
      })}
    </div>
  );
}

type ThumbnailSlide = {
  slide: Slide;
  initUseMoveSlideHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  scale?: number;
  externalStyle?: React.CSSProperties;
  externalClassName?: string;
};
function SlideThumblnail({ slide, scale, initUseMoveSlideHandler, externalStyle, externalClassName }: ThumbnailSlide) {
  scale = scale ?? 1;
  externalClassName = externalClassName ?? "";
  externalClassName = " " + externalClassName;

  const selectedSlideIDs = useAppSelector((state) => state.present.selection.selectedSlideID);
  const slides = useAppSelector((state) => state.present.slides);

  const { selectSlideFromTo, setSlideAsSelected, setSlideAsSingleSelected, setSlideAsUnselected } = useAppActions();

  function selecteSlideHandle(e: React.MouseEvent | KeyboardEvent, id: string, selectedSlideIDs: string[]) {
    if (e.shiftKey) {
      selectSlideFromTo({ startSlideID: selectedSlideIDs.at(-1) ?? "", endSlideID: id, slides });
    } else if (e.ctrlKey) {
      setSlideAsSelected({ slideID: id });
    } else {
      setSlideAsSingleSelected({ slideID: id });
    }
  }

  function unselectSlideHandle(e: React.MouseEvent | KeyboardEvent, id: string, selectedSlideIDs: string[]) {
    if (e.shiftKey || e.ctrlKey) {
      if (selectedSlideIDs.length > 1) {
        setSlideAsUnselected({ slideID: id });
      }
    } else {
      setSlideAsSingleSelected({ slideID: id });
    }
  }

  function selectAction(e: React.MouseEvent<Element, MouseEvent> | KeyboardEvent, id: string | undefined, selectedSlideIDs: string[]) {
    if (!id) return;
    if (!selectedSlideIDs.includes(id)) {
      selecteSlideHandle(e, id, selectedSlideIDs);
    } else {
      unselectSlideHandle(e, id, selectedSlideIDs);
    }
  }

  const onClickHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (selectedSlideIDs.length < 2 || e.shiftKey || e.ctrlKey || !selectedSlideIDs.includes(slide.id)) {
      selectAction(e, slide.id, selectedSlideIDs);
    }
    if (!e.shiftKey && !e.ctrlKey) {
      initUseMoveSlideHandler(e);
    }
  };
  const onDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (selectedSlideIDs.length > 1) {
      selectAction(e, slide.id, selectedSlideIDs);
    }
  };

  const style: React.CSSProperties = {
    ...externalStyle,
    width: `${standartSlideSize.w * scale}px`,
    height: `${standartSlideSize.h * scale}px`,
    backgroundColor: slide.background.type == "color" ? slide.background.color : undefined,
    backgroundImage: slide.background.type == "image" ? `url(${slide.background.src})` : undefined,
  };
  return (
    <div
      style={style}
      onMouseDown={onClickHandle}
      onDoubleClick={onDoubleClick}
      className={styles.ThumblnailSlide + externalClassName}
      id={`slideThumblnail-${slide.id}`}
    >
      {slide.slideObjects.map((slideObj) => {
        return <SlideObject key={slideObj.id} slideObj={slideObj} scale={scale} />;
      })}
    </div>
  );
}

export { SlideThumblnail, SlideWorkSpace };
