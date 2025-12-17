// components/Gallary.tsx
import { useEffect, useState } from "react";
import { getRowsByEmail, saveToDB } from "../../store/Table/tableDB.ts";
import styles from "./Gallary.module.css";
import { PreviewBox } from "./PriviewBox.tsx";
import type { Models } from "appwrite";
import { uu4v } from "../../store/functions.ts";
import { useAppActions, useAppSelector } from "../../store/store.ts";
import { useDispatch } from "react-redux";
import { downloadPresentationDB } from "../../store/Middleware/dataLoaderDB.ts";
import { blankPresentation } from "../../store/PresentationMax.ts";
import { useNavigate } from "react-router-dom";

function Gallary() {
  const [rows, setRows] = useState<Models.DefaultRow[]>([]);
  const dispatch = useDispatch();
  const { setPresentationID, setData } = useAppActions();
  const email = useAppSelector((state) => state.present.email);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(email);
    if (!email) return;
    getRowsByEmail(email).then((res) => {
      setRows(res.rows);
    });
  }, [email]);

  const handlePresentationClick = (rowId: string) => {
    dispatch(downloadPresentationDB(rowId));
    navigate("/Presentation-Maker");
  };

  const generateNewPres = () => {
    const newPresentationID = uu4v();
    saveToDB({ ...blankPresentation, presentationID: newPresentationID }, newPresentationID);
    setPresentationID({ presentationID: newPresentationID });
    setData({ ...blankPresentation, presentationID: newPresentationID });
    navigate("/Presentation-Maker");
  };

  return (
    <div className={styles.GallaryGrid}>
      {rows.map((row) => (
        <PreviewBox key={row.$id} title={row.title} data={row} onClick={() => handlePresentationClick(row.$id)} />
      ))}
      <div
        className={styles.AddPresentationCard}
        onClick={() => {
          generateNewPres();
        }}
      >
        <div className={styles.addIcon} />
        <p className={styles.AddTitle}>Создать новую презентацию</p>
      </div>
    </div>
  );
}

export { Gallary };
