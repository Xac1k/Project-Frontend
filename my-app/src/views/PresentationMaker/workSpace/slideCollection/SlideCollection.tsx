import { useEffect, useRef } from "react";
import styles from "./SlideCollection.module.css";
import ToolbarCollection from "./toolbar/toolBar";
import { standartSlideSize } from "../../../../store/constant";
import { useMoveSlide } from "../../../hooks/DragAndDropSlide";
import { DragableSlideThumblnail } from "./dragableSlideThumbnail/DragableSlideThumbnail";
import { useAppSelector } from "../../../../store/store";

const widthSlideCollection = 400;
const marginsSlideCollection = 17;
const scaleThumblnail = (widthSlideCollection - marginsSlideCollection * 2) / standartSlideSize.w;
const heightToolbar = 100;
const heightToolbarCollection = 75;
const offsetBetweenBundle = 15;

export { scaleThumblnail, heightToolbar, heightToolbarCollection, offsetBetweenBundle };

export function SlideCollection() {
  const slides = useAppSelector((state) => state.present.slides);
  const selectedSlideIDs = useAppSelector((state) => state.present.selection.selectedSlideID);
  const slideCollentionRef = useRef<HTMLDivElement>(null);
  const { cursor, initUseMoveSlideHandler } = useMoveSlide({ slideCollentionRef });

  const scrollTop = useRef<number>(0);
  useEffect(() => {
    if (cursor.y > window.innerHeight - 200) scrollTop.current += 10;
    if (cursor.y < 375 && scrollTop.current >= 0) scrollTop.current -= 10;
    scrollTop.current = Math.min(scrollTop.current, slides.length * (standartSlideSize.h * scaleThumblnail + 15) - window.innerHeight - 175);
  }, [cursor]);
  if (slideCollentionRef.current) slideCollentionRef.current.scrollTop = scrollTop.current;

  //TODO: request animation frame + useEffect

  useEffect(() => {
    const element = document.getElementById("slideThumblnail-" + selectedSlideIDs.at(-1));
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selectedSlideIDs]);

  return (
    <div>
      <ToolbarCollection />
      <div className={styles.SlideCollention} ref={slideCollentionRef}>
        {slides.map((slide) => {
          return (
            <DragableSlideThumblnail
              key={slide.id}
              slide={slide}
              initUseMoveSlideHandler={initUseMoveSlideHandler}
              cursor={cursor}
              parent={slideCollentionRef}
            ></DragableSlideThumblnail>
          );
        })}
      </div>
    </div>
  );
}
