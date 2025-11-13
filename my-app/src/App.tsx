import { WorkSpace } from "./views/workSpace/WorkSpace";
import Toolbar from "./views/toolbar/Toolbar";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Toolbar />
      <WorkSpace />
    </Provider>
  );
}

export { App };
