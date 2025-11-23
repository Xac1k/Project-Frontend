import { useCallback } from "react";
import { useAppActions, useAppSelector } from "../../../../store/store";
import { type SlideObj } from "../../../../store/types";
import type { Rect, Vector } from "../../../../store/typesView";
import { SlideObject } from "./SlideObj";
import { useSelectedObj } from "../../../../store/hooks/useSelectedObj";
import { computeSizeAndPosition, getBoundingRect } from "../../../../store/functions";

type DragableSlideObjectProps = {
  slideObj: SlideObj;
  delta: Vector;
  deltaSize: Rect;
  handlerInitDnD: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
function DragableSlideObject({ handlerInitDnD, slideObj, delta, deltaSize }: DragableSlideObjectProps) {
  const { setSlideObjAsSelected, setSlideObjAsSingleSelected } = useAppActions();
  const selectedObjIDs = useAppSelector((state) => state.present.selection.selectedObjectID);

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

  const selectedObjectsData = useSelectedObj() ?? [];
  const boundingRect = getBoundingRect(selectedObjectsData);
  const newSize = selectedObjIDs.includes(slideObj.id) ? computeSizeAndPosition(boundingRect, deltaSize, slideObj) : slideObj; //TODO вычисление минимальных размеров

  return (
    <SlideObject
      key={slideObj.id}
      slideObj={{ ...slideObj, ...newSize }}
      delta={delta}
      onMouseDown={onClickHandle}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClick}
      isSelected={selectedObjIDs.includes(slideObj.id)}
    />
  );
}

export { DragableSlideObject };
