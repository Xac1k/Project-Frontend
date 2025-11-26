import type { Slide } from "../../store/types";
import styles from "./Gallary.module.css";

type PreviewBoxProps = {
  title?: string;
  slide?: Slide;
};

function PreviewBox({ title }: PreviewBoxProps) {
  return (
    <div className={styles.PreviewBox}>
      <div className={styles.Preview}></div>
      {title && <p className={styles.Title}>{title}</p>}
    </div>
  );
}

export { PreviewBox };
