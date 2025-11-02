import { useRef, useState } from "react";
import styles from "./PopOver.module.css";
import { dispatch, getUniqID, getLastSelectedSlideID } from "../../store/functions";
import { addSlideObject, setBackground } from "../../store/types";
import { isURL } from "../../store/Validation";

type PopOverProps = {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

type PopOverBackgroundProps = {
  isHidden: boolean;
};

function PopOverCreatingImage(props: PopOverProps) {
  const src = useRef<HTMLInputElement>(null);
  if (!props.isHidden) {
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key == "Enter") {
        const srcImage = src.current?.value;
        const slideObjID = getUniqID();
        if (isURL(srcImage)) {
          dispatch(addSlideObject, { slideID: getLastSelectedSlideID(), type: "image", src: srcImage, slideObjID: slideObjID });
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
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == "Enter") {
      const textContent = text.current?.value;
      const slideObjID = getUniqID();
      dispatch(addSlideObject, { slideID: getLastSelectedSlideID(), type: "text", slideObjID: slideObjID, text: textContent });
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
  if (!props.isHidden) {
    return (
      <>
        <input
          type="color"
          onInput={(event) => {
            const target = event.target as HTMLInputElement;
            const inputData = target.value;
            const selectedSlideID = getLastSelectedSlideID();
            dispatch(setBackground, { slideID: selectedSlideID[selectedSlideID.length - 1], color: inputData });
          }}
        ></input>
      </>
    );
  }

  return <></>;
}

function PopOverImg(props: PopOverBackgroundProps) {
  const SRC = /http[\n\w\\\/\:.?=\-&]*/g;
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
              if (SRC.test(target.value)) {
                dispatch(setBackground, { slideID: getLastSelectedSlideID(), src: target.value });
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
