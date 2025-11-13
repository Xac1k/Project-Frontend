import { SlideWorkSpace } from "./slide/Slide";
import { SlideCollection } from "./slideCollection/SlideCollection";
import style from "./WorkSpace.module.css";
import { useMemo } from "react";
import { useAppActions, useAppSelector } from "../../store/store";

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

export function WorkSpace() {
  const { setSlideAsSelected } = useAppActions();
  const selectedSlideID = useAppSelector((state) => state.selection.selectedSlideID);
  const slides = useAppSelector((state) => state.slides);

  if (selectedSlideID.length == 0 && slides.length != 0) {
    setSlideAsSelected({ slideID: slides.at(0)?.id ?? "" });
  }
  const slideForShowing = useMemo(() => {
    const slideID = selectedSlideID.at(-1);
    const slideForShowing = slides.find((slide) => slide.id == slideID);
    return slideForShowing;
  }, [selectedSlideID, slides]);

  return (
    <div className={style.WorkSpace}>
      <SlideCollection />
      <div className={style.WorkSpaceSlide}>{slideForShowing && <SlideWorkSpace slide={slideForShowing} />}</div>
    </div>
  );
}
