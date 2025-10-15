import type { Slide } from "../../store/types";
import ImgPlain from "./ImgPlain";
import Text from "./TextPlain";
import styles from "./Slide.module.css";

type SlideProps = {
  slide: Slide;
  scale: number;
  thumbnail: boolean | null;
  onClick: (() => void) | null;
  style: React.CSSProperties;
  selectedObj: string[];
};

export function SlideWorkSpace(slideProps: SlideProps) {
  const slide = slideProps.slide;

  const style: React.CSSProperties = {
    ...slideProps.style,
    width: `${1011 * slideProps.scale}px`,
    height: `${643 * slideProps.scale}px`,
    backgroundColor:
      slide.background.type == "color" ? slide.background.color : undefined,
    backgroundImage:
      slide.background.type == "image"
        ? `url(${slide.background.src})`
        : undefined,
    borderRadius: slideProps.thumbnail ? `15px` : undefined,
  };

  const slideElt = slide.slideObjects.map((slideObj) => {
    const isSelected = slideProps.selectedObj.includes(slideObj.id);

    if (slideObj.type == "text") {
      if (slideProps.thumbnail) {
        return (
          <Text
            key={slideObj.id}
            textObject={slideObj}
            scale={slideProps.scale}
            onClickHandle={null}
            selected={isSelected}
          ></Text>
        );
      }
      return (
        <Text
          key={slideObj.id}
          textObject={slideObj}
          scale={slideProps.scale}
          onClickHandle={() =>
            console.log("Слайд ID:", slide.id, "Объект слайда:", slideObj.id)
          }
          selected={isSelected}
        ></Text>
      );
    }
    if (slideObj.type == "image") {
      if (slideProps.thumbnail) {
        return (
          <ImgPlain
            key={slideObj.id}
            imageObject={slideObj}
            scale={slideProps.scale}
            onClickHandle={null}
            selected={isSelected}
          ></ImgPlain>
        );
      }
      return (
        <ImgPlain
          key={slideObj.id}
          imageObject={slideObj}
          scale={slideProps.scale}
          onClickHandle={() =>
            console.log("Слайд ID:", slide.id, "Объект слайда:", slideObj.id)
          }
          selected={isSelected}
        ></ImgPlain>
      );
    }
  });

  if (slideProps.onClick == null) {
    return (
      <div style={style} className={styles.Slide}>
        {slideElt}
      </div>
    );
  }
  return (
    <div style={style} onClick={slideProps.onClick} className={styles.Slide}>
      {slideElt}
    </div>
  );
}
