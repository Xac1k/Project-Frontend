// components/Gallary.tsx
import { useEffect, useState } from "react";
import { getRowsByEmail, saveToDB } from "../../store/Table/tableDB";
import styles from "./Gallary.module.css";
import { PreviewBox } from "./PriviewBox";
import { AddPresetation } from "./IconAddPresentatio";
import type { Models } from "appwrite";
import { uu4v } from "../../store/functions";
import { useAppActions, useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import { downloadPresentationDB } from "../../store/Middleware/dataLoaderDB.ts";
import { blankPresentation } from "../../store/PresentationMax.ts";

function Gallary() {
  const [rows, setRows] = useState<Models.DefaultRow[]>([]);
  const dispatch = useDispatch();
  const { setPresentationID, setData } = useAppActions();
  const email = useAppSelector((state) => state.present.email);

  useEffect(() => {
    console.log(email);
    if (!email) return;
    getRowsByEmail(email).then((res) => {
      setRows(res.rows);
    });
  }, [email]);

  const handlePresentationClick = (rowId: string) => {
    dispatch(downloadPresentationDB(rowId));
  };

  const renderRows = () => {
    const lines = [];
    for (let i = 0; i < rows.length; i += 4) {
      const sliceRows = rows.slice(i, i + 4);
      lines.push(
        <div key={i} className={styles.Line}>
          {sliceRows.map((row) => (
            <PreviewBox key={row.$id} title={row.title} rowData={row.JSON} onClick={() => handlePresentationClick(row.$id)} />
          ))}
        </div>,
      );
    }
    return lines;
  };

  const generateNewPres = () => {
    const newPresentationID = uu4v();
    saveToDB({ ...blankPresentation, presentationID: newPresentationID }, newPresentationID);
    setPresentationID({ presentationID: newPresentationID });
    setData({ ...blankPresentation, presentationID: newPresentationID });
  };

  return (
    <div className={styles.Background}>
      {renderRows()}
      <div className={styles.Line}>
        <AddPresetation
          onClick={() => {
            generateNewPres();
          }}
        />
      </div>
    </div>
  );
}

export { Gallary };
