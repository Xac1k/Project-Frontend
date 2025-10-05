import { SlideWorkSpace } from "./Slide";
import { SlideCollection } from "../slideCollection/SlideCollection";
import type { Slide } from "../../store/types";
import style from "./WorkSpace.module.css";

type PropsWorkSpace = {
  slides: Slide[];
  selection: number[];
};

export function WorkSpace(props: PropsWorkSpace) {
  if (props.selection[0] == undefined) {
    console.error("Selection Array is empty");
    return <></>;
  }

  return (
    <div className={style.WorkSpace}>
      <SlideCollection slides={props.slides} selection={[1]}></SlideCollection>
      <div className={style.WorkSpaceSlide}>
        <SlideWorkSpace
          scale={1}
          slide={props.slides[props.selection[0]]}
          onClick={() => {}}
        ></SlideWorkSpace>
      </div>
    </div>
  );
}
