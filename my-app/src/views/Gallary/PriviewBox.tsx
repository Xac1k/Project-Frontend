import type { Slide } from "../../store/types";
import styles from "./Gallary.module.css";

type PreviewBoxProps = {
  title?: string;
  slide?: Slide;
  id?: string;
  onClick?: () => void;
};

function PreviewBox({ title, id, onClick }: PreviewBoxProps) {
  return (
    <div className={styles.PreviewBox}>
      <div className={styles.Preview} id={id} onClick={onClick}></div>
      {title && <p className={styles.Title}>{title}</p>}
    </div>
  );
}

export { PreviewBox };
