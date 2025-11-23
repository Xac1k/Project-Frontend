import { useCallback, useState } from "react";
import { useDragAndDropDummy } from "./DragAndDrop";
import type { Line } from "../../store/typesView";
import { Position } from "../../store/types";
import { useAppActions, useAppSelector } from "../../store/store";

function getInsertionID(slideCollentionRef: React.RefObject<HTMLDivElement | null>, cursor: Line, selectedSlideIDs: string[]): [string, Position] {
  let slideIDUnderCursor: string = "";
  let position: Position = Position.After;
  slideCollentionRef.current?.childNodes.forEach((slideRef) => {
    if (slideRef instanceof HTMLDivElement) {
      const boundingRect = slideRef.getBoundingClientRect();
      if (cursor.y > boundingRect.y && cursor.y < boundingRect.y + boundingRect.height) {
        const slideID = slideRef.id.split("-")[1];
        if (!selectedSlideIDs.includes(slideID)) {
          slideIDUnderCursor = slideID;
          const midleLine = boundingRect.y + boundingRect.height / 2;
          position = cursor.y > midleLine ? Position.After : Position.Before;
        }
      }
    }
  });

  return [slideIDUnderCursor, position];
}

type createDragAndDropHandleProps = {
  slideCollentionRef: React.RefObject<HTMLDivElement | null>;
};
function useMoveSlide({ slideCollentionRef }: createDragAndDropHandleProps) {
  const [cursor, setCursor] = useState<Line>({ y: 0 });
  const selectedSlideIDs = useAppSelector((state) => state.present.selection.selectedSlideID);
  const { insertSlidesOntoLayer } = useAppActions();

  const onMouseMove = useCallback((e: MouseEvent) => {
    const cursor = { y: e.clientY };
    setCursor(cursor);
  }, []);

  const onMouseUp = useCallback(() => {
    const [slideID, position] = getInsertionID(slideCollentionRef, cursor, selectedSlideIDs);
    insertSlidesOntoLayer({ insertionSlideID: slideID, position: position, slideIDs: selectedSlideIDs });
    setCursor({ y: 0 });
  }, [cursor, selectedSlideIDs]);

  const initUseMoveSlideHandler = useDragAndDropDummy({ onMouseMove, onMouseUp });

  return { cursor, initUseMoveSlideHandler };
}

export { useMoveSlide };
