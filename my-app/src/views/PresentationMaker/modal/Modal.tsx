import React, { useMemo, useState } from "react";
import styles from "./Modal.module.css";
import { saveToStorageFile, saveToStorageFromUrl } from "../../../store/Table/tableDB";
import { useAppActions, useAppSelector } from "../../../store/store";
import { LoadingMethods } from "./LoadingPicture/Methods";
import { ModalBody, ModalFooter, ModalHeader } from "./common/Modal";
import { FileInputSelection, UrlInputSelection } from "./LoadingPicture/SelectedInputs";
import { uu4v } from "../../../store/functions";
import { isURL } from "../../../store/Validation";

export type LoadingMode = "file" | "url";
type ModalWindowProps = {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};
function LoadingPictureModal({ setModalActive }: ModalWindowProps) {
  const [loadingMode, setLoadingMode] = useState<LoadingMode>("url");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const { addSlideObject } = useAppActions();
  const selectedSlideIDs = useAppSelector((state) => state.present.selection.selectedSlideID);

  const onUpload = () => {
    console.log(loadingMode, url, file);
    switch (loadingMode) {
      case "file":
        if (file) {
          saveToStorageFile(file, uu4v()).then((res) => {
            addSlideObject({ slideID: selectedSlideIDs.at(-1), src: res });
            setModalActive(false);
          });
        }
        break;
      case "url":
        if (url && isURL(url)) {
          saveToStorageFromUrl(url).then((res) => {
            addSlideObject({ slideID: selectedSlideIDs.at(-1), src: res });
            setModalActive(false);
          });
        }
        break;
    }
  };

  const onCancel = () => {
    setModalActive(false);
  };

  const disable = useMemo<boolean>(() => {
    switch (loadingMode) {
      case "file":
        return file === null;
      case "url":
        return url === null || !isURL(url);
    }
  }, [file, url, loadingMode]);

  return (
    <div className={styles.modalOverlay + " " + styles.active}>
      <div className={styles.modal}>
        <ModalHeader>
          <>Загрузить изображение</>
        </ModalHeader>
        <ModalBody>
          <>
            <LoadingMethods setLoadingMode={setLoadingMode} loadingMode={loadingMode} />
            <FileInputSelection isActive={loadingMode === "file"} setFile={setFile} setUrl={setUrl} />
            <UrlInputSelection isActive={loadingMode === "url"} setFile={setFile} setUrl={setUrl} />
          </>
        </ModalBody>
        <ModalFooter>
          <>
            <button className={styles.modalButton + " " + styles.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button className={styles.modalButton + " " + styles.uploadButton} disabled={disable} onClick={onUpload}>
              Upload
            </button>
          </>
        </ModalFooter>
      </div>
    </div>
  );
}

export { LoadingPictureModal };
