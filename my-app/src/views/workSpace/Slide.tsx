import { setSlideObjAsSelected, setSlideObjAsUnselected, type Slide, removeSlideObject } from "../../store/types";
import ImgPlain from "./ImgPlain";
import Text from "./TextPlain";
import styles from "./Slide.module.css";
import { dispatch, getSlideObjState } from "../../store/functions";
import type React from "react";
import { useEffect } from "react";

type SlideProps = {
  slide: Slide;
  scale: number;
  thumbnail: boolean | null;
  onClick: (() => void) | null;
  style: React.CSSProperties;
  selectedObj: string[];
};

type SlideRenderProps = {
  slide: Slide;
  selectedObjects: string[];
  thumbnail: boolean | null;
  scale: number
}

function RenderSlideObjects({slide, selectedObjects, thumbnail, scale}: SlideRenderProps) {
  const slideElt = slide.slideObjects.map((slideObj) => {
    const isSelected = selectedObjects.includes(slideObj.id);

    const onClickHandler = () => {
      console.log("Слайд ID:", slide.id, "Объект слайда:", slideObj.id)
      if (getSlideObjState(slideObj.id)) {
        dispatch(setSlideObjAsUnselected, {slideObjID: slideObj.id})
      }
      else {
        dispatch(setSlideObjAsSelected, {slideObjID: slideObj.id})
      }
    }

    if (slideObj.type == "text") {
      if (thumbnail) {
        return (
          <Text
            key={slideObj.id}
            textObject={slideObj}
            scale={scale}
            onClickHandle={null}
            selected={isSelected}
          ></Text>
        );
      }
      return (
        <Text
          key={slideObj.id}
          textObject={slideObj}
          scale={scale}
          onClickHandle={onClickHandler}
          selected={isSelected}
        ></Text>
      );
    }

    if (slideObj.type == "image") {
      if (thumbnail) {
        return (
          <ImgPlain
            key={slideObj.id}
            imageObject={slideObj}
            scale={scale}
            onClickHandle={null}
            selected={isSelected}
          ></ImgPlain>
        );
      }

      return (
        <ImgPlain
          key={slideObj.id}
          imageObject={slideObj}
          scale={scale}
          onClickHandle={onClickHandler}
          selected={isSelected}
        ></ImgPlain>
      );
    }
  });

  return slideElt;
}

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

  const selectedObjects = slideProps.selectedObj;
  const thumbnail = slideProps.thumbnail;
  const scale = slideProps.scale;
  const slideJSX = RenderSlideObjects({slide, selectedObjects, thumbnail, scale});

  if (!thumbnail) {
    useEffect(()=> {
      const deleteObj = (event: KeyboardEvent) => {
        if (event.key == 'Delete') {
          for (let id of selectedObjects) {
            const slideID = slide.id
            dispatch(setSlideObjAsUnselected, {slideObjID: id});
            dispatch(removeSlideObject, {slideID: slideID, slideObjID: id});
          }
        }
      };
      document.addEventListener('keydown', deleteObj);

      return () => {
        document.removeEventListener('keydown', deleteObj)
      }
    }, [selectedObjects]);
  }
  
  if (slideProps.onClick == null) {
    return (
      <div style={style} className={styles.Slide}>
        {slideJSX}
      </div>
    );
  }
  
  return (
    <div style={style} onClick={slideProps.onClick} className={styles.Slide}>
      {slideJSX}
    </div>
  );
}
