import Toolbar from "./toolbar/Toolbar";
import { WorkSpace } from "./workSpace/WorkSpace";
import { useUndoRedo } from "../hooks/UndoRedo";
import { useState } from "react";
import { LoadingPictureModal } from "./modal/Modal";

function PresentationMaker() {
  useUndoRedo();
  const [isModalActive, setModalActive] = useState<boolean>(false);

  return (
    <>
      <Toolbar setModalActive={setModalActive} />
      <WorkSpace />
      {isModalActive ? <LoadingPictureModal setModalActive={setModalActive} /> : <></>}
    </>
  );
}

export { PresentationMaker };
