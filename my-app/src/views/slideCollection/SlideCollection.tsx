import { useEffect, useRef } from "react";
import { dispatch , getEditor, getSlideState} from "../../store/functions";
import { setSlideAsSelected, setSlideAsUnselected, type Slide, clearSlideSelected, clearSlideObjSelected} from "../../store/types";
import { SlideWorkSpace } from "../workSpace/Slide";
import styles from "./SlideCollection.module.css";
import ToolbarCollection from "./toolbar/toolBar";

type PropsSlideCollection = {
  slides: Slide[];
  selection: string[];
};

export function SlideCollection(props: PropsSlideCollection) {
  const slides = props.slides;

  let isMultiplyChoise = useRef(false);
  useEffect(() => {
    const TurnOnMultiplyChoice = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        isMultiplyChoise.current = true;
      }
    };

    const TurnOffMultiplyChoice = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        isMultiplyChoise.current = false;
      }
    };

    document.addEventListener('keydown', TurnOnMultiplyChoice);
    document.addEventListener('keyup', TurnOffMultiplyChoice);

    return () => {
      document.removeEventListener('keydown', TurnOnMultiplyChoice);
      document.removeEventListener('keyup', TurnOffMultiplyChoice);
    };
  }, []);

  function selecteSlide(id: string) {
    if (isMultiplyChoise.current) {
      dispatch(setSlideAsSelected, {slideID: id});
    }
    else {
      console.log("Слайд нажат", id, 'Поставить выделения');
      dispatch(clearSlideSelected, {});
      dispatch(setSlideAsSelected, {slideID: id});
    }
  }

  function unselectSlide(id: string) {
    console.log("Слайд нажат", id, 'Снятие выделения');
    if (isMultiplyChoise.current) {
      if (getEditor().selection.selectedSlideID.length > 1){
        dispatch(setSlideAsUnselected, {slideID: id});
      }
    }
    else {
      dispatch(clearSlideSelected, {});
      dispatch(setSlideAsSelected, {slideID: id});
    }
  }

  const miniatureOfSlides = slides.map((slide) => {
    const onClickHandle = () => {
      dispatch(clearSlideObjSelected, {});
      if (getSlideState(slide.id) == false) {
        selecteSlide(slide.id);
      }
      else {
       unselectSlide(slide.id);
      }
    };
    const isSelected = props.selection.includes(slide.id);
    const style = isSelected ? { boxShadow: `0 0 0 5px #ea59287d` } : {};
    return (
      <SlideWorkSpace
        style={style}
        slide={slide}
        key={slide.id}
        scale={0.352126}
        onClick={onClickHandle}
        thumbnail={true}
        selectedObj={[]}
      ></SlideWorkSpace>
    );
  });

  return (
    <>
      <div>
        <ToolbarCollection></ToolbarCollection>
        <div className={styles.SlideCollention}>
          {miniatureOfSlides}
        </div>
      </div>
    </>
  );
}
