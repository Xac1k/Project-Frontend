import ToolbarBtn from "../../../toolbarButton/ToolbarButton";
import { IconDel } from "./iconDel";
import { IconPlus } from "./iconPlus";
import SlideSelection from "./toolbarSelection.module.css";
import { addSlide, removeSlide, blankSlide, setSlideAsUnselected } from '../../../../store/types';
import { dispatch, getUniqID} from '../../../../store/functions';


type ToolbarCollectionProps = {
  selectedSlides: string[]
}

export default function ToolbarCollection({selectedSlides}: ToolbarCollectionProps) {

  const onClickHandleAdd = () => {
    console.log("Добавление слайда");
    dispatch(addSlide, {slide: blankSlide, slideID: getUniqID(), insertionID: null})
  };

  const onClickHandleDel = () => {
    console.log("Удаление слайда");
    selectedSlides.forEach((slideID)=>{
      const id = slideID;
      const properties = {slideID: id}
      dispatch(setSlideAsUnselected, properties)
      dispatch(removeSlide, properties)
    });
  };

  return (
    <div className={SlideSelection.toolbar}>
      <ToolbarBtn
        onClickHandle={onClickHandleAdd}
      >{IconPlus()}</ToolbarBtn>
      <ToolbarBtn
        onClickHandle={onClickHandleDel}
      >{IconDel()}</ToolbarBtn>
    </div>
  );
}
