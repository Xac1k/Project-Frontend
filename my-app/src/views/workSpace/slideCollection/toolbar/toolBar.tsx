import ToolbarBtn from "../../../toolbar/toolbarButton/ToolbarButton";
import { IconDel } from "./iconDel";
import { IconPlus } from "./iconPlus";
import SlideSelection from "./toolbarSelection.module.css";
import { useAppActions, useAppSelector } from "../../../../store/store";

export default function ToolbarCollection() {
  const selectedSlideIDs = useAppSelector((state) => state.present.selection.selectedSlideID);
  const { setSlidesAsUnselected, removeSlide, addSlide } = useAppActions();

  const onClickHandleAdd = () => {
    console.log("Добавление слайда");
    addSlide({});
  };

  const onClickHandleDel = () => {
    console.log("Удаление слайда");
    setSlidesAsUnselected({ slideIDs: selectedSlideIDs });
    removeSlide({ slideID: selectedSlideIDs });
  };

  return (
    <div className={SlideSelection.toolbar}>
      <ToolbarBtn onClickHandle={onClickHandleAdd}>{IconPlus()}</ToolbarBtn>
      <ToolbarBtn onClickHandle={onClickHandleDel}>{IconDel()}</ToolbarBtn>
    </div>
  );
}
