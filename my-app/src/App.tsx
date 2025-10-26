import type { Presentation } from "./store/types";
import { WorkSpace } from "./views/workSpace/src/WorkSpace";
import Toolbar from "./views/toolbar/Toolbar";

type AppProps = {
  presentation: Presentation;
};

function App(props: AppProps) {
  return (
    <>
      <Toolbar></Toolbar>
      <WorkSpace
        selection={props.presentation.selection}
        slides={props.presentation.slides}
      ></WorkSpace>
    </>
  );
}

export { App };
