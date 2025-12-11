import { useRef } from "react";
import { ImageIcon } from "./ImageIcon";
import styles from "./../Modal.module.css";

type SelectionProps = {
  isActive: boolean;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setUrl: React.Dispatch<React.SetStateAction<string | null>>;
};
function UrlInputSelection({ isActive, setUrl }: SelectionProps) {
  const activeStyle = isActive ? styles.active : "";

  return (
    <div className={styles.urlSelection + " " + activeStyle}>
      <label htmlFor="url-selection" className={styles.urlLabel}>
        Image URL
      </label>
      <input
        type="url"
        id="url-selection"
        className={styles.urlInput}
        placeholder="https://example.com/image.jpg"
        onInput={(e) => {
          setUrl(e.currentTarget.value);
          console.log(e.currentTarget.value);
        }}
      ></input>
    </div>
  );
}

function FileInputSelection({ isActive, setFile }: SelectionProps) {
  const fileUploader = useRef<HTMLInputElement>(null);
  const activeStyle = isActive ? styles.active : "";

  const fileChose = () => {
    fileUploader.current?.click();
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget) e.currentTarget.classList.add(styles.dragover);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget) {
      e.currentTarget.classList.remove(styles.dragover);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget) {
      e.currentTarget.classList.remove(styles.dragover);
      if (e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          setFile(file);
          console.log(file);
        }
      }
    }
  };

  const onSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length != 0) {
      setFile(e.currentTarget.files[0]);
      console.log(e.currentTarget.files[0]);
    }
  };

  return (
    <div className={styles.fileSelection + " " + activeStyle} onClick={fileChose} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
      <ImageIcon className={styles.fileIcon} />
      <h4>Drop your image here</h4>
      <p>or click to browse files</p>
      <button>Choose File</button>
      <input type="file" id="image-uploader" accept="image/*" ref={fileUploader} hidden onChange={onSetFile}></input>
    </div>
  );
}

export { UrlInputSelection, FileInputSelection };
