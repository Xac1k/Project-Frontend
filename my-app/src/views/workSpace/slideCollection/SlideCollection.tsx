import React, { useEffect } from "react";
import { dispatch, getLastSelectedSlideID, getNextSlideID, getNumberSelectedSlide, getPrevSlideID, getSlideState } from "../../../store/functions";
import { setSlideAsSelected, setSlideAsUnselected, type Slide, clearSlideSelected, clearSlideObjSelected, selectSlideFromTo } from "../../../store/types";
import { SlideThumblnail } from "../slide/src/Slide";
import styles from "./SlideCollection.module.css";
import ToolbarCollection from "./toolbar/toolBar";
import type { StateWorkZone } from "../src/WorkSpace";
import { canFlipThrough } from "../../../store/Validation";

type PropsSlideCollection = {
  slides: Slide[];
  selection: string[];
  setlastSelectedID: React.Dispatch<React.SetStateAction<string>>;
  stateWorkZone: React.RefObject<StateWorkZone>;
};

const widthSlideCollection = 400;
const marginsSlideCollection = 17;
const standartWidthSlide = 1011;
const scale = (widthSlideCollection - marginsSlideCollection * 2) / standartWidthSlide;

export function SlideCollection(props: PropsSlideCollection) {
  const slides = props.slides;

  function selecteSlideHandle(e: React.MouseEvent | KeyboardEvent, id: string) {
    if (e.shiftKey) {
      dispatch(selectSlideFromTo, { startSlideID: getLastSelectedSlideID(), endSlideID: id });
      props.setlastSelectedID(id);
    } else if (e.ctrlKey) {
      dispatch(setSlideAsSelected, { slideID: id });
      props.setlastSelectedID(id);
    } else {
      console.log("Слайд нажат", id, "Поставить выделения");
      dispatch(clearSlideSelected, {});
      dispatch(setSlideAsSelected, { slideID: id });
      props.setlastSelectedID(id);
    }
  }

  function unselectSlideHandle(e: React.MouseEvent | KeyboardEvent, id: string) {
    console.log("Слайд нажат", id, "Снятие выделения");
    if (e.shiftKey || e.ctrlKey) {
      if (getNumberSelectedSlide() > 1) {
        dispatch(setSlideAsUnselected, { slideID: id });
        props.setlastSelectedID(getLastSelectedSlideID());
      }
    } else {
      dispatch(clearSlideSelected, {});
      dispatch(setSlideAsSelected, { slideID: id });
      props.setlastSelectedID(id);
    }
  }

  useEffect(() => {
    const arrowHandler = (e: KeyboardEvent) => {
      if (!canFlipThrough(props.stateWorkZone)) return;
      let id: string | undefined;
      function selectAction(e: KeyboardEvent, id: string) {
        dispatch(clearSlideObjSelected, {});
        if (getSlideState(id) == false) {
          selecteSlideHandle(e, id);
        } else {
          unselectSlideHandle(e, id);
        }
      }

      switch (e.key) {
        case "ArrowUp":
          id = getPrevSlideID(getLastSelectedSlideID());
          if (!id) {
            return;
          }
          selectAction(e, id);
          break;
        case "ArrowDown":
          id = getNextSlideID(getLastSelectedSlideID());
          if (!id) {
            return;
          }
          selectAction(e, id);
          break;
      }
    };

    window.addEventListener("keydown", arrowHandler);
    return () => window.removeEventListener("keydown", arrowHandler);
  }, []);

  const miniatureOfSlides = slides.map((slide) => {
    const onClickHandle = (e: React.MouseEvent) => {
      dispatch(clearSlideObjSelected, {});
      if (getSlideState(slide.id) == false) {
        selecteSlideHandle(e, slide.id);
      } else {
        unselectSlideHandle(e, slide.id);
      }
    };
    const isSelected = props.selection.includes(slide.id);
    const style = isSelected
      ? {
          boxShadow: `0 0 0 5px #ea59287d`,
          borderRadius: `10px`,
        }
      : {};
    return (
      <div className={styles.EltSlideCollection} style={style} id={`Slide-${slide.id}`}>
        <SlideThumblnail slide={slide} scale={scale} onMouseDown={onClickHandle} externalStyle={style}></SlideThumblnail>
      </div>
    );
  });

  return (
    <>
      <div>
        <ToolbarCollection selectedSlides={props.selection}></ToolbarCollection>
        <div className={styles.SlideCollention}>{miniatureOfSlides}</div>
      </div>
    </>
  );
}
