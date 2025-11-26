// import { WorkSpace } from "./views/PresentationMaker/workSpace/WorkSpace";
// import Toolbar from "./views/PresentationMaker/toolbar/Toolbar";
import { useUndoRedo } from "./views/hooks/UndoRedo";
import { useState } from "react";
import { Login } from "./views/Login/Login";
import { Gallary } from "./views/Gallary/Gallary";
function App() {
  useUndoRedo();
  const [isLoged, setIsLoged] = useState<boolean>();

  return (
    <>
      {isLoged ? (
        <>
          <Gallary />
          {/* <Toolbar setIsLoged={setIsLoged} />
          <WorkSpace /> */}
        </>
      ) : (
        <Login setIsLoged={setIsLoged} />
      )}
    </>
  );
}

export { App };
