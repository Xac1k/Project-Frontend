import type { Slide } from "../../store/types";
import { SlideWorkSpace } from "../workSpace/Slide";
import styles from "./SlideCollection.module.css";
import ToolbarCollection from  './toolbar/toolBar'

type PropsSlideCollection = {
  slides: Slide[];
  selection: number[];
};

export function SlideCollection(props: PropsSlideCollection) {
  const slides = props.slides;
  const miniatureOfSlides = slides.map((slide) => {
    return (
      <SlideWorkSpace
        slide={slide}
        key={slide.id}
        scale={0.352126}
        onClick={() => {
          console.log("Слайд нажат", slide.id);
        }}
        border={true}
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
