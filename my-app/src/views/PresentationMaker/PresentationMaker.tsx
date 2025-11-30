import Toolbar from "./toolbar/Toolbar";
import { WorkSpace } from "./workSpace/WorkSpace";
import { useUndoRedo } from "../hooks/UndoRedo";
import { useAppSelector } from "../../store/store";
import { useLayoutEffect } from "react";
import { getPresentationDB } from "../../store/Table/tableDB";

type PresentationMakerProps = {
  setIsLoged: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};
function PresentationMaker({ setIsLoged }: PresentationMakerProps) {
  useUndoRedo();
  const presentationID = useAppSelector((state) => state.present.presentationID);

  useLayoutEffect(() => {
    getPresentationDB(presentationID).then((res) => {
      const presentation = JSON.parse(res.JSON);

      console.log(presentation);
    });
  }, [presentationID]);

  return (
    <>
      <Toolbar setIsLoged={setIsLoged} />
      <WorkSpace />
    </>
  );
}

export { PresentationMaker };
