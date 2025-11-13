import styles from "./ToolbarButton.module.css";
import type { ReactNode } from "react";

type ToolbarBtnMSG = {
  // src: string;
  onClickHandle: () => void;
  children: ReactNode;
};

export default function ToolbarBtn(props : ToolbarBtnMSG) {
  return (
    <button className={styles.ToolbarButton} onClick={props.onClickHandle}>
      {props.children}
    </button>
  );
}
