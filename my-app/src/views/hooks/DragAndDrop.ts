import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Vector } from "../../store/typesView";
import { useAppActions, useAppSelector } from "../../store/store";

function useDnD() {
  const [delta, setDelta] = useState<Vector>({ x: 0, y: 0 });
  const initialPosition = useRef<Vector>({ x: 0, y: 0 });
  const { displaceSlideObj } = useAppActions();
  const selectedObjIDs = useAppSelector((state) => state.present.selection.selectedObjectID);
  const selectedSlideIds = useAppSelector((state) => state.present.selection.selectedSlideID);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    initialPosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const delta = { x: e.clientX - initialPosition.current.x, y: e.clientY - initialPosition.current.y };
    setDelta(delta);
  }, []);

  const onMouseUp = useCallback(() => {
    displaceSlideObj({ slideID: selectedSlideIds.at(-1) ?? "", slideObjectsID: selectedObjIDs, shift: delta });
    setDelta({ x: 0, y: 0 });
  }, [delta, selectedObjIDs, selectedSlideIds]);

  const handlerInitDnD = useDragAndDropPattern({ onMouseDown, onMouseMove, onMouseUp });
  return { handlerInitDnD, delta };
}

type DnDDummy = {
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
};
function useDragAndDropPattern(Handlers: DnDDummy) {
  const isStarted = useRef(false);
  const isMoving = useRef(false);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      isStarted.current = true;
      if (Handlers.onMouseDown) {
        Handlers.onMouseDown(e);
      }
      e.preventDefault();
    },
    [Handlers.onMouseDown],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isStarted.current) {
        isMoving.current = true;
        Handlers.onMouseMove(e);
        e.preventDefault();
      }
    },
    [Handlers.onMouseMove],
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      if (isMoving.current) {
        Handlers.onMouseUp(e);
      }
      isMoving.current = false;
      isStarted.current = false;
      e.preventDefault();
    },
    [Handlers.onMouseUp],
  );

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [onMouseUp]);

  return onMouseDown;
}

export { useDnD, useDragAndDropPattern as useDragAndDropDummy };
