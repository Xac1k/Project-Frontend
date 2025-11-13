import { useCallback } from "react";
import { useAppActions, useAppSelector } from "../../../../store/store";
import { type SlideObj } from "../../../../store/types";
import type { Vector } from "../../../../store/typesView";
import { SlideObject } from "./SlideObj";

type DragableSlideObjectProps = {
  slideObj: SlideObj;
  delta: Vector;
  handlerInitDnD: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
function DragableSlideObject({ handlerInitDnD, slideObj, delta }: DragableSlideObjectProps) {
  const { setSlideObjAsSelected, setSlideObjAsSingleSelected } = useAppActions();
  const selectedObjIDs = useAppSelector((state) => state.selection.selectedObjectID);

  const selectSingle = (slideObjID: string) => setSlideObjAsSingleSelected({ slideObjID: slideObjID });

  const selectWithCtrl = (slideObjID: string) => setSlideObjAsSelected({ slideObjID: slideObjID });

  const selectHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, slideObjID: string) => {
    //TODO Сделать обработку для того чтобы текст можно было редактировать
    if (e.ctrlKey) selectWithCtrl(slideObjID);
    else selectSingle(slideObjID);
  };

  const onClickHandle = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.currentTarget.style.cursor = "grabbing";

      if (selectedObjIDs.length < 2 || e.shiftKey || e.ctrlKey || !selectedObjIDs.includes(slideObj.id)) {
        selectHandler(e, slideObj.id);
      }

      if (!e.shiftKey && !e.ctrlKey) {
        handlerInitDnD(e);
      }
    },
    [slideObj, selectedObjIDs],
  );

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.currentTarget.style.cursor = "grab";
  };

  const onDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (selectedObjIDs.length > 1) {
      selectHandler(e, slideObj.id);
    }
  };

  return (
    <SlideObject
      key={slideObj.id}
      slideObj={slideObj}
      delta={delta}
      onMouseDown={onClickHandle}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClick}
      isSelected={selectedObjIDs.includes(slideObj.id)}
    />
  );
}

export { DragableSlideObject };
