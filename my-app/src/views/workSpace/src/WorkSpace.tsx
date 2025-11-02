import { SlideWorkSpace } from "../slide/src/Slide";
import { SlideCollection } from "../slideCollection/SlideCollection";
import { type Slide, type SelectionElt, setSlideAsSelected } from "../../../store/types";
import style from "./WorkSpace.module.css";
import { dispatch, getFirtsSlideID, getLastSelectedSlideID } from "../../../store/functions";
import { useRef, useState } from "react";

type PropsWorkSpace = {
  slides: Slide[];
  selection: SelectionElt;
};

export type StateWorkZone = {
  edit: boolean;
  stateDnD: {
    active: boolean;
    target: HTMLDivElement | null;
  };
  stateSizing: {
    active: boolean;
    isMultiply: boolean;
  };
};

function handlerSelectionEmpty(slides: Slide[], selection: SelectionElt) {
  if (selection.selectedSlideID.length == 0 && slides.length != 0) {
    dispatch(setSlideAsSelected, { slideID: getFirtsSlideID() });
  }
}

function getSlideForShowing(slides: Slide[], lastSelectedID: string) {
  return slides.find((slide) => slide.id == lastSelectedID);
}

export function WorkSpace(props: PropsWorkSpace) {
  const [lastSelectedID, setlastSelectedID] = useState<string>(getLastSelectedSlideID());
  const stateWorkZone = useRef<StateWorkZone>({
    edit: false,
    stateDnD: {
      active: false,
      target: null, // TODO сделать props isDraged получаем id перемещаемых эл и ставим стили в slideObj
    },
    stateSizing: {
      active: false,
      isMultiply: false,
    },
  });

  if (props.slides.length == 0) {
    //отобразить пустой шаблон. Слайды не созданы
  }

  handlerSelectionEmpty(props.slides, props.selection);
  const slide = getSlideForShowing(props.slides, lastSelectedID);
  if (!slide) {
    return <></>;
  }

  return (
    <div className={style.WorkSpace}>
      <SlideCollection
        slides={props.slides}
        selection={props.selection.selectedSlideID}
        setlastSelectedID={setlastSelectedID}
        stateWorkZone={stateWorkZone}
      ></SlideCollection>

      {props.slides.length != 0 ? (
        <div className={style.WorkSpaceSlide}>
          <SlideWorkSpace slide={slide} selectedObj={props.selection.selectedObjectID} stateWorkZone={stateWorkZone}></SlideWorkSpace>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
