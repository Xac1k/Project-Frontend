import { SlideWorkSpace } from "./slide/Slide";
import { SlideCollection } from "./slideCollection/SlideCollection";
import style from "./WorkSpace.module.css";
import { useMemo } from "react";
import { useAppSelector } from "../../../store/store";

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
  const selectedSlideID = useAppSelector((state) => state.present.selection.selectedSlideID);
  const slides = useAppSelector((state) => state.present.slides);

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
