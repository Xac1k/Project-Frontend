import { useAppSelector } from "../store";

function useSelectedSlideSelect() {
  const slides = useAppSelector((state) => state.present.slides);
  const selectedSlideID = useAppSelector((state) => state.present.selection.selectedSlideID).at(-1);
  const selectedSlide = slides.find((slide) => slide.id === selectedSlideID);
  return selectedSlide;
}

export { useSelectedSlideSelect };
