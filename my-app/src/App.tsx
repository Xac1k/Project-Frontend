import { useState } from "react";
import { Login } from "./views/Login/Login";
import { PresentationMaker } from "./views/PresentationMaker/PresentationMaker";
import { useAppSelector } from "./store/store";
import { Gallary } from "./views/Gallary/Gallary";

function App() {
  const [isLoged, setIsLoged] = useState<boolean>();
  const presentationID = useAppSelector((state) => state.present.presentationID);

  return (
    <>
      {isLoged ? (
        <>{presentationID.length == 0 ? <Gallary /> : <PresentationMaker setIsLoged={setIsLoged}></PresentationMaker>}</>
      ) : (
        <Login setIsLoged={setIsLoged} />
      )}
    </>
  );
}

export { App };
