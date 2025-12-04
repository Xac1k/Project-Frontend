import type { Models } from "appwrite";
import { type Slide } from "../../store/types";
import { SlidePreview } from "../PresentationMaker/workSpace/slide/Slide";
import { scaleThumblnail } from "../PresentationMaker/workSpace/slideCollection/SlideCollection";
import styles from "./Gallary.module.css";
import { parseISO8601 } from "../common/parseISO8601";

type PreviewBoxProps = {
  title?: string;
  slide?: Slide;
  id?: string;
  data: Models.DefaultRow;
  onClick?: () => void;
};

function PreviewBox({ onClick, data }: PreviewBoxProps) {
  const preview = JSON.parse(data.JSON);
  const previewSlide = preview.slides[0];
  const countSlides = preview.slides.length;
  const presentationTitle = preview.title;
  const date = parseISO8601(data.$updatedAt, true);
  return (
    <>
      <div className={styles.PresentationCard} onClick={onClick}>
        <div className={previewSlide ? styles.ThumblnailCard : styles.ThumblnailCardEmpty}>
          {previewSlide && <SlidePreview slide={previewSlide} scale={scaleThumblnail}></SlidePreview>}
        </div>
        <div className={styles.ContentCard}>
          <h3 className={styles.TitleCard}>{presentationTitle}</h3>
          <div className={styles.InfoCard}>
            <span className={styles.SlidesCount}>
              <img src="src/views/Gallary/SlideIcons.png" className={styles.SlideIcon} />
              {countSlides} slides
            </span>
            <span>
              {date.hourWithTimeZone}:{date.minut} {date.day} {date.monthName}, {date.year}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export { PreviewBox };
