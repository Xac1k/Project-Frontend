import { SlideWorkSpace } from "./Slide";
import { SlideCollection } from "../slideCollection/SlideCollection";
import type { Slide, SelectionElt } from "../../store/types";
import style from "./WorkSpace.module.css";

type PropsWorkSpace = {
  slides: Slide[];
  selection: SelectionElt;
};

export function WorkSpace(props: PropsWorkSpace) {
  let slide: Slide = props.slides.filter((slide) => slide.id == props.selection.selectedSlideID[0])[0];

  if (props.selection.selectedSlideID[0] == undefined) {
    console.error("Selection Array is empty");
    slide = props.slides[0];
  }
  if (slide == undefined) {
    console.error("ID Error: the fisrt id in selection array don't exist, Slide ID:", props.selection.selectedSlideID[0]);
    slide = props.slides[0];
  }

  return (
    <div className={style.WorkSpace}>
      <SlideCollection slides={props.slides} selection={props.selection.selectedSlideID}></SlideCollection>
      <div className={style.WorkSpaceSlide}>
        <SlideWorkSpace
          scale={1}
          slide={slide}
          thumbnail={false}
          onClick={null}
          style={{}}
          selectedObj={props.selection.selectedObjectID}
        ></SlideWorkSpace>
      </div>
    </div>
  );
}
