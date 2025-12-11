import { ImageIcon } from "./ImageIcon";
import type { LoadingMode } from "../Modal";
import { UrlIcon } from "./UrlIcon";
import styles from "./../Modal.module.css";

type CallbackProps = {
  onClick: () => void;
  isActive: boolean;
};
function LoadFromDevice({ onClick, isActive }: CallbackProps) {
  const activeStyle = isActive ? styles.active : "";
  return (
    <div className={styles.loadingMethod + " " + activeStyle} onClick={onClick}>
      <ImageIcon className={styles.icon} />
      <h4>From Device</h4>
      <p>Choose from your computer</p>
    </div>
  );
}

function LoadFromUrl({ onClick, isActive }: CallbackProps) {
  const activeStyle = isActive ? styles.active : "";
  return (
    <div className={styles.loadingMethod + " " + activeStyle} onClick={onClick}>
      <UrlIcon className={styles.icon} />
      <h4>From URL</h4>
      <p>Paste image URL</p>
    </div>
  );
}

type LoadingMethodsProps = {
  setLoadingMode: React.Dispatch<React.SetStateAction<LoadingMode>>;
  loadingMode: LoadingMode;
};
function LoadingMethods({ setLoadingMode, loadingMode }: LoadingMethodsProps) {
  const choseFileLoadingMode = () => setLoadingMode("file");
  const choseUrlLoadingMode = () => setLoadingMode("url");

  return (
    <>
      <div className={styles.loadingMethods}>
        <LoadFromUrl onClick={choseUrlLoadingMode} isActive={loadingMode === "url"} />
        <LoadFromDevice onClick={choseFileLoadingMode} isActive={loadingMode === "file"} />
      </div>
    </>
  );
}

export { LoadingMethods };
