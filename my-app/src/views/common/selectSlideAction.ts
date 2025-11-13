import { useAppActions } from "../../store/store";

function selecteSlideHandle(e: React.MouseEvent | KeyboardEvent, id: string, selectedSlideIDs: string[]) {
  console.log("Слайд нажат", id, "Поставить выделения");
  const { selectSlideFromTo, setSlideAsSelected, setSlideAsSingleSelected } = useAppActions();
  if (e.shiftKey) {
    selectSlideFromTo({ startSlideID: selectedSlideIDs.at(-1) ?? "", endSlideID: id });
  } else if (e.ctrlKey) {
    setSlideAsSelected({ slideID: id });
  } else {
    setSlideAsSingleSelected({ slideID: id });
  }
}

function unselectSlideHandle(e: React.MouseEvent | KeyboardEvent, id: string, selectedSlideIDs: string[]) {
  console.log("Слайд нажат", id, "Снятие выделения");
  const { setSlideAsUnselected, setSlideAsSingleSelected } = useAppActions();
  if (e.shiftKey || e.ctrlKey) {
    if (selectedSlideIDs.length > 1) {
      setSlideAsUnselected({ slideID: id });
    }
  } else {
    setSlideAsSingleSelected({ slideID: id });
  }
}

function selectAction(e: React.MouseEvent<Element, MouseEvent> | KeyboardEvent, id: string | undefined, selectedSlideIDs: string[]) {
  if (!id) return;
  if (!selectedSlideIDs.includes(id)) {
    selecteSlideHandle(e, id, selectedSlideIDs);
  } else {
    unselectSlideHandle(e, id, selectedSlideIDs);
  }
}

export { selectAction };
