import { useAppActions } from "../../../../store/store";
import styles from "./Toolbarnputs.module.css";

export default function ToolbarInput() {
  const { setTitle } = useAppActions();
  return (
    <input
      className={styles.presentationName}
      type={"text"}
      onInput={(event) => {
        const target = event.target as HTMLInputElement;
        console.log(target.value);
        setTitle({ name: target.value });
      }}
      defaultValue="Новая презентация"
    ></input>
  );
}
