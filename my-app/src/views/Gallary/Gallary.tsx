import { useEffect, useRef, useState } from "react";
import { getRows } from "../../store/Table/tableDB";
import styles from "./Gallary.module.css";
import { PreviewBox } from "./PriviewBox";
import { IconAddPresetation } from "./IconAddPresentatio";

function Gallary() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const rowIds = useRef<string[]>([]);

  useEffect(() => {
    getRows().then((res) => {
      console.log(res.rows);
    });
  }, []);

  return (
    <>
      <div className={styles.Background}>
        <div className={styles.Line}>
          <PreviewBox></PreviewBox>
          <PreviewBox></PreviewBox>
          <PreviewBox></PreviewBox>
          <PreviewBox title="Title"></PreviewBox>
        </div>
        <div className={styles.Line}>
          <IconAddPresetation></IconAddPresetation>
        </div>
      </div>
    </>
  );
}

export { Gallary };
