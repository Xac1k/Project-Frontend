import { blankSlide } from "../../store/PresentationMax";
import { type Slide } from "../../store/types";
import { SlidePreview } from "../PresentationMaker/workSpace/slide/Slide";
import { scaleThumblnail } from "../PresentationMaker/workSpace/slideCollection/SlideCollection";
import styles from "./Gallary.module.css";

type PreviewBoxProps = {
  title?: string;
  slide?: Slide;
  id?: string;
  rowData: string;
  onClick?: () => void;
};

function PreviewBox({ title, onClick, rowData }: PreviewBoxProps) {
  const preview = JSON.parse(rowData);
  const previewSlide = preview.slides[0];

  if (!previewSlide) {
    return (
      <div className={styles.PreviewBox}>
        <SlidePreview externalClassName={styles.Preview} onClick={onClick} slide={blankSlide} scale={scaleThumblnail}></SlidePreview>
        {title && <p className={styles.Title}>{title}</p>}
      </div>
    );
  }

  return (
    <div className={styles.PreviewBox}>
      <SlidePreview externalClassName={styles.Preview} onClick={onClick} slide={previewSlide} scale={scaleThumblnail}></SlidePreview>
      {title && <p className={styles.Title}>{title}</p>}
    </div>
  );
}

export { PreviewBox };
