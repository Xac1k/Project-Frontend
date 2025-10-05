import type React from "react";
import type { Slide } from "../../store/types";
import { SlideWorkSpace } from "../workSpace/Slide";
import styles from "./SlideCollection.module.css";
import ToolbarCollection from  './toolbar/toolBar'

type PropsSlideCollection = {
  slides: Slide[];
  selection: string[];
};

export function SlideCollection(props: PropsSlideCollection) {
  const slides = props.slides;
  const miniatureOfSlides = slides.map((slide) => {
    const onClickHandle = () => {console.log("Слайд нажат", slide.id);}
    const isSelected = props.selection.includes(slide.id);
    const style = isSelected ? {boxShadow: `0 0 0 5px #ea59287d`} : {};
    return (
      <SlideWorkSpace
        style={style}
        slide={slide}
        key={slide.id}
        scale={0.352126}
        onClick={onClickHandle}
        thumbnail={true}
        selectedObj={[]}
      ></SlideWorkSpace>
    );
  });
  
  return (
    <>
      <div className={styles.SlideCollention}>
        <ToolbarCollection></ToolbarCollection>
        {miniatureOfSlides}
      </div>
    </>
    );
}
