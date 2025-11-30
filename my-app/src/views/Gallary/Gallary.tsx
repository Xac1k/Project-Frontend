// components/Gallary.tsx
import { useEffect, useState } from "react";
import { getRows } from "../../store/Table/tableDB";
import styles from "./Gallary.module.css";
import { PreviewBox } from "./PriviewBox";
import { AddPresetation } from "./IconAddPresentatio";
import type { Models } from "appwrite";
import { uu4v } from "../../store/functions";
import { useAppActions } from "../../store/store";
import { useDispatch } from "react-redux";
import { downloadPresentationDB } from "../../store/Middleware/dataLoaderDB.ts";

function Gallary() {
  const [rows, setRows] = useState<Models.DefaultRow[]>([]);
  const dispatch = useDispatch();
  const { setPresentationID } = useAppActions();

  useEffect(() => {
    getRows().then((res) => {
      setRows(res.rows);
    });
  }, []);

  const handlePresentationClick = (rowId: string) => {
    dispatch(downloadPresentationDB(rowId));
  };

  const renderRows = () => {
    const lines = [<></>];
    for (let i = 0; i < rows.length; i += 4) {
      const sliceRows = rows.slice(i, i + 4);
      lines.push(
        <div key={i} className={styles.Line}>
          {sliceRows.map((row) => (
            <PreviewBox key={row.$id} title={row.title} id={row.$id} onClick={() => handlePresentationClick(row.$id)} />
          ))}
        </div>,
      );
    }
    return lines;
  };

  return (
    <div className={styles.Background}>
      {renderRows()}
      <div className={styles.Line}>
        <AddPresetation onClick={() => setPresentationID({ presentationID: uu4v() })} />
      </div>
    </div>
  );
}

export { Gallary };
