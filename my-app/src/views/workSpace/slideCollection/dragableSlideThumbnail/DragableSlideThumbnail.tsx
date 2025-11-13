import type { CSSProperties } from "react";
import { standartSlideSize } from "../../../../store/constant";
import type { Slide } from "../../../../store/types";
import type { Line } from "../../../../store/typesView";
import { SlideThumblnail } from "../../slide/Slide";
import { heightToolbar, heightToolbarCollection, offsetBetweenBundle, scaleThumblnail } from "../SlideCollection";
import styles from "../SlideCollection.module.css";
import { useAppSelector } from "../../../../store/store";

type DragableSlideThublnailProps = {
  slide: Slide;
  initUseMoveSlideHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  cursor: Line;
  parent: React.RefObject<HTMLDivElement | null>;
};
function DragableSlideThumblnail({ slide, initUseMoveSlideHandler, cursor, parent }: DragableSlideThublnailProps) {
  const selectedSlideIDs = useAppSelector((state) => state.selection.selectedSlideID);
  let className = selectedSlideIDs.includes(slide.id) ? styles.InnerELt_Selected : "";
  className += " " + (selectedSlideIDs.includes(slide.id) && cursor.y !== 0 ? styles.InnerELt_Moving : "");
  const slides = useAppSelector((state) => state.slides);

  const arraySelectedSlidesInOrderSlidesForShowing = slides.filter((slide) => selectedSlideIDs.includes(slide.id)); //TODO вынести в hooks
  const indexSelectedSlide = arraySelectedSlidesInOrderSlidesForShowing.findIndex((selectedSlide) => selectedSlide.id === slide.id);

  const movingStyle: CSSProperties | undefined =
    selectedSlideIDs.includes(slide.id) && cursor.y !== 0
      ? {
          top: `${cursor.y + (parent.current?.scrollTop ?? 0) + offsetBetweenBundle * indexSelectedSlide - (standartSlideSize.h * scaleThumblnail) / 2 - heightToolbar - heightToolbarCollection}px`,
          left: `${15 * indexSelectedSlide}px`,
          scale: `${(standartSlideSize.w * scaleThumblnail - 15 * (selectedSlideIDs.length - 1)) / (standartSlideSize.w * scaleThumblnail)}`,
          zIndex: `${selectedSlideIDs.length - indexSelectedSlide}`,
        }
      : undefined;

  return (
    <SlideThumblnail
      key={slide.id}
      slide={slide}
      scale={scaleThumblnail}
      initUseMoveSlideHandler={initUseMoveSlideHandler}
      externalStyle={movingStyle}
      externalClassName={className}
    ></SlideThumblnail>
  );
}

export { DragableSlideThumblnail };
