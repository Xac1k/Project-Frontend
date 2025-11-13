import { useRef } from "react";
import styles from "./SlideCollection.module.css";
import ToolbarCollection from "./toolbar/toolBar";
import { standartSlideSize } from "../../../store/constant";
import { useMoveSlide } from "../../hooks/DragAndDropSlide";
import { DragableSlideThumblnail } from "./dragableSlideThumbnail/DragableSlideThumbnail";
import { useAppSelector } from "../../../store/store";

const widthSlideCollection = 400;
const marginsSlideCollection = 17;
const scaleThumblnail = (widthSlideCollection - marginsSlideCollection * 2) / standartSlideSize.w;
const heightToolbar = 100;
const heightToolbarCollection = 75;
const offsetBetweenBundle = 15;

export { scaleThumblnail, heightToolbar, heightToolbarCollection, offsetBetweenBundle };

export function SlideCollection() {
  const slides = useAppSelector((state) => state.slides);
  const slideCollentionRef = useRef<HTMLDivElement>(null);
  const { cursor, initUseMoveSlideHandler } = useMoveSlide({ slideCollentionRef });
  // useEffect(() => {
  //   const arrowHandler = (e: KeyboardEvent) => {
  //     let id: string | undefined;
  //     if (e.key === "ArrowUp") {
  //       id = getPrevSlideID(getSelectedSlideID());
  //     }
  //     if (e.key === "ArrowDown") {
  //       id = getNextSlideID(getSelectedSlideID());
  //     }
  //     selectAction(e, id, s);
  //   };

  //   window.addEventListener("keydown", arrowHandler);
  //   return () => window.removeEventListener("keydown", arrowHandler);
  // }, []);
  styles;
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
