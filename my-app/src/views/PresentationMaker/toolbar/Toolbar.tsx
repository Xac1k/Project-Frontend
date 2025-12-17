import styles from "./Toolbar.module.css";
import ToolbarBtn from "./toolbarButton/ToolbarButton";
import ToolbarInput from "./toolbarInput/ToolbarInputs";
import ToolbarDemo from "./toolbarShow/ToolbarShow";
import { PopOverBackground, PopOverCreatingImage, PopOverCreatingText } from "./PopOver";

import { IconBackground } from "./toolbarButton/iconBackground";
import { IconText } from "./toolbarButton/iconText";
import { IconExport } from "./toolbarButton/iconExport";
import { IconImage } from "./toolbarButton/iconImage";
import { IconRedo } from "./toolbarButton/iconRedo";
import { IconUndo } from "./toolbarButton/iconUndo";
import { useState } from "react";
import { useAppActions } from "../../../store/store";
import { loginOut } from "../../../signUp";
import { IconLogOut } from "./toolbarButton/iconLogOut";
import { useNavigate } from "react-router-dom";

const onClickHandleExport = () => {
  console.log("Экспортировать файл");
};

type ModalProps = {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Toolbar(props: ModalProps) {
  const [isHiddenImage, setIsHiddenImage] = useState<boolean>(true);
  const [isHiddenBackground, setIsHiddenBackground] = useState<boolean>(true);
  const [isHiddenText, setIsHiddenText] = useState<boolean>(true);
  const { redoAction, undoAction } = useAppActions();
  const { clearPresID } = useAppActions();
  const navigate = useNavigate();

  const onClickHandleUndo = () => {
    undoAction();
  };
  const onClickHandleRedo = () => {
    redoAction();
  };

  const onClickHandleIMG = () => {
    props.setModalActive(true);
    setIsHiddenBackground(true);
    setIsHiddenText(true);
  };

  const onClickHandleText = () => {
    console.log("Создать текстовый элемент");
    setIsHiddenText(!isHiddenText);
    setIsHiddenBackground(true);
    setIsHiddenImage(true);
  };

  const onClickHandleBGR = () => {
    console.log("Изменение цвета фона");
    setIsHiddenBackground(!isHiddenBackground);
    if (!isHiddenImage && isHiddenBackground) {
      setIsHiddenImage(true);
    }
  };

  const onClickHandleLogOut = () => {
    clearPresID();
    loginOut();
    navigate("/Login");
  };

  const onClickHandleDemo = () => {
    console.log("Демострировать презентацию");
    navigate("/Presentation-Maker/Viewer");
  };

  return (
    <div className={styles.ToolBar}>
      <div className={styles.EditingToolBar}>
        <ToolbarInput></ToolbarInput>
        <ToolbarBtn onClickHandle={onClickHandleExport}>{IconExport()}</ToolbarBtn>

        <div className={styles.ButtonWithPopOver}>
          <ToolbarBtn onClickHandle={onClickHandleText}>{<IconText />}</ToolbarBtn>
          <PopOverCreatingText isHidden={isHiddenText} setIsHidden={setIsHiddenText}></PopOverCreatingText>
        </div>

        <div className={styles.ButtonWithPopOver}>
          <ToolbarBtn onClickHandle={onClickHandleIMG}>{<IconImage />}</ToolbarBtn>
          <PopOverCreatingImage isHidden={isHiddenImage} setIsHidden={setIsHiddenImage}></PopOverCreatingImage>
        </div>

        <div className={styles.ButtonWithPopOver}>
          <ToolbarBtn onClickHandle={onClickHandleBGR}>{<IconBackground />}</ToolbarBtn>
          <PopOverBackground isHidden={isHiddenBackground} setIsHidden={setIsHiddenBackground}></PopOverBackground>
        </div>

        <ToolbarBtn onClickHandle={onClickHandleUndo}>{IconRedo()}</ToolbarBtn>
        <ToolbarBtn onClickHandle={onClickHandleRedo}>{IconUndo()}</ToolbarBtn>
      </div>

      <div className={styles.RightToolBar}>
        <ToolbarDemo onClickHandle={onClickHandleDemo}></ToolbarDemo>
        <ToolbarBtn onClickHandle={onClickHandleLogOut}>{IconLogOut()}</ToolbarBtn>
      </div>
    </div>
  );
}
