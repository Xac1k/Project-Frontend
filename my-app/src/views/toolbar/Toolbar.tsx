import styles from "./Toolbar.module.css";
import ToolbarBtn from "../toolbarButton/ToolbarButton";
import ToolbarInput from "../toolbarInput/ToolbarInputs";
import ToolbarDemo from "../toolbarShow/ToolbarShow";
import { PopOverBackground } from './PopOver'

import { IconBackground } from "../toolbarButton/iconBackground";
import { IconText } from "../toolbarButton/iconText";
import { IconExport } from "../toolbarButton/iconExport";
import { IconImage } from "../toolbarButton/iconImage";
import { IconRedo } from "../toolbarButton/iconRedo";
import { IconUndo } from "../toolbarButton/iconUndo";
import { useState } from "react";

const onClickHandleExport = () => {
  console.log("Экспортировать файл");
};
const onClickHandleText = () => {
  console.log("Создать текстовый элемент");
};
const onClickHandleIMG = () => {
  console.log("Создать элемент картинки");
};
const onClickHandleUndo = () => {
  console.log("Вернуть предыдущее состояние");
};
const onClickHandleRedo = () => {
  console.log("Вернуть следующее состояние");
};
const onClickHandleDemo = () => {
  console.log("Демострировать презентацию");
};

export default function Toolbar() {
  const [isHiddenBackground, setIsHiddenBackground] = useState<boolean>(true);
  const onClickHandleBGR = () => {
    console.log("Изменение цвета фона");
    setIsHiddenBackground(!isHiddenBackground);
  };

  // const onFocusHandleBGR = () => {}

  return (
    <div className={styles.ToolBar}>
      <div className={styles.EditingToolBar}>
        <ToolbarInput></ToolbarInput>
        <ToolbarBtn
          onClickHandle={onClickHandleExport}
        >{IconExport()}</ToolbarBtn>
        <ToolbarBtn
          onClickHandle={onClickHandleText}
        >{IconText()}</ToolbarBtn>
        <ToolbarBtn
          onClickHandle={onClickHandleIMG}
        >{IconImage()}</ToolbarBtn>

        <div className={styles.BackgroundChoosen}>
           <ToolbarBtn onClickHandle={onClickHandleBGR}>
              {<IconBackground/>}
            </ToolbarBtn>
            <PopOverBackground isHidden={isHiddenBackground}></PopOverBackground>
        </div>
       

        

        <ToolbarBtn
          onClickHandle={onClickHandleUndo}
        >{IconRedo()}</ToolbarBtn>
        <ToolbarBtn
          onClickHandle={onClickHandleRedo}
        >{IconUndo()}</ToolbarBtn>
      </div>
      <ToolbarDemo onClickHandle={onClickHandleDemo}></ToolbarDemo>
    </div>
  );
}
