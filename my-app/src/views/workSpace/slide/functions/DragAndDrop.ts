import React, { useCallback, useEffect, useRef, useState } from "react";
import { dispatch, getLastSelectedSlideID, getSelectionSlideObj } from "../../../../store/functions";
import { displaceSlideObj } from "../../../../store/types";
import type { StateWorkZone } from "../../src/WorkSpace";
import { canDragAndDrop } from "../../../../store/Validation";
import type { Vector } from "../../../../store/typesView";

type createDragAndDropHandleProps = {
  stateWorkZone: React.RefObject<StateWorkZone>;
};
function useDnD({ stateWorkZone }: createDragAndDropHandleProps) {
  const [delta, setDelta] = useState<Vector>({ x: 0, y: 0 });
  const initialPosition = useRef<Vector>({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    initialPosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (canDragAndDrop(stateWorkZone)) {
      const delta = { x: e.clientX - initialPosition.current.x, y: e.clientY - initialPosition.current.y };
      setDelta(delta);
      stateWorkZone.current.stateDnD.active = true;
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (canDragAndDrop(stateWorkZone)) {
      dispatch(displaceSlideObj, { slideID: getLastSelectedSlideID(), slideObjectsID: getSelectionSlideObj(), shift: delta });
      setDelta({ x: 0, y: 0 });
      stateWorkZone.current.stateDnD.active = false;
    }
  }, [delta]);

  const handlerInitDnD = useDragAndDropDummy({ onMouseDown, onMouseMove, onMouseUp });
  return { handlerInitDnD, delta };
}

type DnDDummy = {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
};
function useDragAndDropDummy(Handlers: DnDDummy) {
  const isStarted = useRef(false);
  const isMoving = useRef(false);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      isStarted.current = true;
      Handlers.onMouseDown(e);
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

export { useDnD, useDragAndDropDummy };
