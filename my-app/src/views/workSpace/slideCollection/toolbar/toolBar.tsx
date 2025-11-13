import ToolbarBtn from "../../../toolbar/toolbarButton/ToolbarButton";
import { IconDel } from "./iconDel";
import { IconPlus } from "./iconPlus";
import SlideSelection from "./toolbarSelection.module.css";
import { useAppActions, useAppSelector } from "../../../../store/store";

export default function ToolbarCollection() {
  const onClickHandleAdd = () => {
    console.log("Добавление слайда");
    const { addSlide } = useAppActions();
    addSlide({});
  };

  const onClickHandleDel = () => {
    console.log("Удаление слайда");
    const selectedObjIDs = useAppSelector((state) => state.selection.selectedObjectID);

    const { setSlideAsUnselected, removeSlide } = useAppActions();
    selectedObjIDs.forEach((slideID) => {
      const id = slideID;
      const properties = { slideID: id };
      setSlideAsUnselected(properties);
    });
    removeSlide({ slideID: selectedObjIDs });
  };

  return (
    <div className={SlideSelection.toolbar}>
      <ToolbarBtn onClickHandle={onClickHandleAdd}>{IconPlus()}</ToolbarBtn>
      <ToolbarBtn onClickHandle={onClickHandleDel}>{IconDel()}</ToolbarBtn>
    </div>
  );
}
