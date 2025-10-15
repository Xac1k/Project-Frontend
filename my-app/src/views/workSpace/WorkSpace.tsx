import { SlideWorkSpace } from "./Slide";
import { SlideCollection } from "../slideCollection/SlideCollection";
import { type Slide, type SelectionElt } from "../../store/types";
import style from "./WorkSpace.module.css";
import { getEditor, setEditor } from "../../store/functions";

type PropsWorkSpace = {
  slides: Slide[];
  selection: SelectionElt;
};

export function WorkSpace(props: PropsWorkSpace) {
  if (props.slides.length == 0) {
    //отобразить пустой шаблон. Слайды не созданы
  }

  if (props.selection.selectedSlideID.length == 0 && props.slides.length != 0) {
    //Нет выделенных слайдов, поставить стандартный 
    const presentation = getEditor();
    presentation.selection.selectedSlideID.push(presentation.slides[0].id);
    setEditor(presentation);
  }

  const lastSelectedID = props.selection.selectedSlideID[props.selection.selectedSlideID.length - 1]
  let slide: Slide = props.slides.filter((slide) => slide.id == lastSelectedID)[0];

  return (
    <div className={style.WorkSpace}>
      <SlideCollection
        slides={props.slides}
        selection={props.selection.selectedSlideID}
      ></SlideCollection>
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
