import type { Picture } from "../../store/types";

type ImageObjectProps = {
  imageObject: Picture;
  scale: number;
};

export function ImgPlain(props: ImageObjectProps) {
  const imageObj = props.imageObject;
  const style: React.CSSProperties = {
    position: `absolute`,
    top: `${imageObj.y * props.scale}px`,
    left: `${imageObj.x * props.scale}px`,
    width: `${imageObj.w * props.scale}px`,
    height: `${imageObj.h * props.scale}px`,
    backgroundImage: `url(${imageObj.src})`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
  };

  return (
    <img
      src={imageObj.src}
      style={style}
      onClick={() => {
        console.log("Нажатие на slideObj", imageObj.id);
      }}
    ></img>
  );
}
