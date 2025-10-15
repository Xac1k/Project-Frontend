import type { Picture } from "../../store/types";
import styles from "./ImgPlain.module.css";

type ImageObjectProps = {
  imageObject: Picture;
  scale: number;
  onClickHandle: (() => void) | null;
  selected: boolean;
};

type ClickableImgProps = {
  src: string;
  style: React.CSSProperties;
  onClickHandle: () => void;
};

type NonClickableImgProps = {
  src: string;
  style: React.CSSProperties;
};

function ClickableIMG(props: ClickableImgProps) {
  return (
    <img
      src={props.src}
      style={props.style}
      onClick={props.onClickHandle}
      className={styles.innerImage}
    ></img>
  );
}

function NonClickableIMG(props: NonClickableImgProps) {
  return (
    <img
      src={props.src}
      style={props.style}
      className={styles.innerImage}
    ></img>
  );
}

export default function ImgPlain(props: ImageObjectProps) {
  const imageObj = props.imageObject;
  const style: React.CSSProperties = {
    top: `${imageObj.y * props.scale}px`,
    left: `${imageObj.x * props.scale}px`,
    width: `${imageObj.w * props.scale}px`,
    height: `${imageObj.h * props.scale}px`,
    backgroundImage: `url(${imageObj.src})`,
    boxShadow: `${props.selected ? `0 0 0 2px #00ffd5b7` : ``}`,
  };

  if (props.onClickHandle == null) {
    return (
      <NonClickableIMG
        src={props.imageObject.src}
        style={style}
      ></NonClickableIMG>
    );
  } else {
    return (
      <ClickableIMG
        src={props.imageObject.src}
        style={style}
        onClickHandle={props.onClickHandle}
      ></ClickableIMG>
    );
  }
}
