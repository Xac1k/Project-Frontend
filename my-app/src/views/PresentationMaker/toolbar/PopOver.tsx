import { useRef, useState } from "react";
import styles from "./PopOver.module.css";
import { isURL } from "../../../store/Validation";
import { useAppActions, useAppSelector } from "../../../store/store";
import { saveToStorageFromUrl } from "../../../store/Table/tableDB";

type PopOverProps = {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

type PopOverBackgroundProps = {
  isHidden: boolean;
};

function PopOverCreatingImage(props: PopOverProps) {
  const src = useRef<HTMLInputElement>(null);
  const { addSlideObject } = useAppActions();
  const selectedSlideIDs = useAppSelector((state) => state.present.selection.selectedSlideID);
  if (!props.isHidden) {
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key == "Enter") {
        const srcImage = src.current?.value;
        if (isURL(srcImage) && srcImage) {
          saveToStorageFromUrl(srcImage).then((res) => addSlideObject({ slideID: selectedSlideIDs.at(-1) ?? "", src: res }));
        }
      }
    };

    return (
      <div
        className={styles.PopOver}
        onKeyDown={onKeyDown}
        onBlur={() => {
          props.setIsHidden(true);
        }}
      >
        <input type="text" placeholder="src" ref={src} autoFocus></input>
      </div>
    );
  }
  return <></>;
}

function PopOverCreatingText(props: PopOverProps) {
  const text = useRef<HTMLInputElement>(null);
  const { addSlideObject } = useAppActions();
  const selectedSlideIDs = useAppSelector((state) => state.present.selection.selectedSlideID);
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == "Enter") {
      const textContent = text.current?.value;
      addSlideObject({ slideID: selectedSlideIDs.at(-1) ?? "", text: textContent });
    }
  };

  if (!props.isHidden) {
    return (
      <div className={styles.PopOver} onKeyDown={onKeyDown} onBlur={() => props.setIsHidden(true)}>
        <input type="text" placeholder="text" ref={text} autoFocus></input>
      </div>
    );
  }
  return <></>;
}

function PopOverColor(props: PopOverBackgroundProps) {
  const { setBackground } = useAppActions();
  const selectedSlideIDs = useAppSelector((state) => state.present.selection.selectedSlideID);
  if (!props.isHidden) {
    return (
      <>
        <input
          type="color"
          onInput={(event) => {
            const target = event.target as HTMLInputElement;
            const inputData = target.value;
            setBackground({ slideID: selectedSlideIDs.at(-1) ?? "", color: inputData });
          }}
        ></input>
      </>
    );
  }

  return <></>;
}

function PopOverImg(props: PopOverBackgroundProps) {
  const { setBackground } = useAppActions();
  const selectedSlideIDs = useAppSelector((state) => state.present.selection.selectedSlideID);
  if (!props.isHidden) {
    return (
      <>
        <label htmlFor="inputImg">Введите url изображения</label>
        <input
          id="inputImg"
          type="text"
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              const target = event.target as HTMLInputElement;
              console.log(target.value);
              if (isURL(target.value)) {
                setBackground({ slideID: selectedSlideIDs.at(-1) ?? "", src: target.value });
              }
            }
          }}
        ></input>
      </>
    );
  }

  return <></>;
}

function PopOverBackground(props: PopOverProps) {
  const [isChosenColor, setChooseColor] = useState<boolean>(true);
  const [isChosenImg, setChooseImg] = useState<boolean>(true);

  const onClickHandleColor = () => {
    console.log("Выбор цвета");
    setChooseColor(!isChosenColor);
    if (isChosenImg) setChooseImg(false);
  };

  const onClickHandleImg = () => {
    console.log("Выбор картинки");
    setChooseImg(!isChosenImg);
    if (isChosenColor) setChooseColor(false);
  };

  if (!props.isHidden) {
    return (
      <div className={styles.PopOver}>
        <div>
          <button className={styles.PopOverButton_start} onClick={onClickHandleColor} autoFocus>
            Цвет
          </button>
          <PopOverColor isHidden={!isChosenColor}></PopOverColor>
        </div>

        <div>
          <button className={styles.PopOverButton_end} onClick={onClickHandleImg}>
            Картинка
          </button>
          <PopOverImg isHidden={!isChosenImg}></PopOverImg>
        </div>
      </div>
    );
  }
  if (isChosenColor) setChooseColor(false);
  if (isChosenImg) setChooseImg(false);
  return <></>;
}

export { PopOverBackground, PopOverCreatingImage, PopOverCreatingText };
