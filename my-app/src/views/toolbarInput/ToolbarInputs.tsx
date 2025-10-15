import { dispatch } from "../../store/functions";
import { changeTitle } from "../../store/types";
import styles from "./Toolbarnputs.module.css";

export default function ToolbarInput() {
  return (
    <input
      className={styles.presentationName}
      type={"text"}
      onInput={(event) => {
        const target = event.target as HTMLInputElement;
        console.log(target.value);
        dispatch(changeTitle, {name: target.value});
      }}
      defaultValue="Новая презентация"
    ></input>
  );
}
