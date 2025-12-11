import Toolbar from "./toolbar/Toolbar";
import { WorkSpace } from "./workSpace/WorkSpace";
import { useUndoRedo } from "../hooks/UndoRedo";
import { useAppSelector } from "../../store/store";
import { useLayoutEffect, useState } from "react";
import { getPresentationDB } from "../../store/Table/tableDB";
import { LoadingPictureModal } from "./modal/Modal";

type PresentationMakerProps = {
  setIsLoged: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};
function PresentationMaker({ setIsLoged }: PresentationMakerProps) {
  useUndoRedo();
  const presentationID = useAppSelector((state) => state.present.presentationID);
  const [isModalActive, setModalActive] = useState<boolean>(false);

  useLayoutEffect(() => {
    getPresentationDB(presentationID).then((res) => {
      const presentation = JSON.parse(res.JSON);

      console.log(presentation);
    });
  }, [presentationID]);

  return (
    <>
      <Toolbar setIsLoged={setIsLoged} setModalActive={setModalActive} />
      <WorkSpace />
      {isModalActive ? <LoadingPictureModal setModalActive={setModalActive} /> : <></>}
    </>
  );
}

export { PresentationMaker };
