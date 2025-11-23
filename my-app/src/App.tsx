import { WorkSpace } from "./views/workSpace/WorkSpace";
import Toolbar from "./views/toolbar/Toolbar";
import { useUndoRedo } from "./views/hooks/UndoRedo";

function App() {
  useUndoRedo();
  
  return (
  <>
    <Toolbar />
    <WorkSpace />
  </>
  );
}

export { App };
