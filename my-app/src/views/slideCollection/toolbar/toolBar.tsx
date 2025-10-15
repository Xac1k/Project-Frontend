import ToolbarBtn from "../../toolbarButton/ToolbarButton";
import { IconDel } from "./iconDel";
import { IconPlus } from "./iconPlus";
import SlideSelection from "./toolbarSelection.module.css";
import { addSlide, getUniqID, removeSlide, blankSlide, setSlideAsUnselected } from '../../../store/types';
import { dispatch, getEditor } from '../../../store/functions';

const onClickHandleAdd = () => {
  console.log("Добавление слайда");
  dispatch(addSlide, {slide: blankSlide, slideID: getUniqID(), insertionID: null})
};

const onClickHandleDel = () => {
  console.log("Удаление слайда");
  const presentation = getEditor();
  presentation.selection.selectedSlideID.forEach((slideID)=>{
    dispatch(removeSlide, {slideID: slideID})
    dispatch(setSlideAsUnselected, {slideID: slideID})
  });
};

export default function ToolbarCollection() {
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
