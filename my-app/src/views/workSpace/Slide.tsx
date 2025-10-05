import type { Slide } from "../../store/types";
import { ImgPlain } from "./ImgPlain";
import { TextPlain } from "./TextPlain";

type SlideProps = {
  slide: Slide;
  scale: number;
  border: boolean|null;
  onClick: () => void;
};

export function SlideWorkSpace(slideProps: SlideProps) {
  const slide = slideProps.slide;

  const style: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    width: `${1011 * slideProps.scale}px`,
    height: `${643 * slideProps.scale}px`,
    backgroundColor:
      slide.background.type == 'color' ? slide.background.color : undefined,
    backgroundImage:
      slide.background.type == 'image'
        ? `url(${slide.background.src})`
        : undefined,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    border: `1px solid black`,
    borderRadius: slideProps.border ? `15px` : undefined
  };

  const slideElt = slide.slideObjects.map((slideObj) => {
    if (slideObj.type == "text") {
      return (
        <TextPlain
          key={slideObj.id}
          textObject={slideObj}
          scale={slideProps.scale}
        ></TextPlain>
      );
    } else if (slideObj.type == "image") {
      return (
        <ImgPlain
          key={slideObj.id}
          imageObject={slideObj}
          scale={slideProps.scale}
        ></ImgPlain>
      );
    }
  });

  return (
    <div style={style} onClick={slideProps.onClick}>
      {slideElt}
    </div>
  );
}
