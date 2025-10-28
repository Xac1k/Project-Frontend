import ReactDOM from "react-dom/client";
import { App } from "./App";
import { presentation } from "./store/functions";
import { addEditorChangeHandler } from "./store/functions";
import { addHotKeyHoldListener } from "./store/HotKey";
import { addPermissionFlag } from "./store/Permission";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

addPermissionFlag("Delete", true);
addPermissionFlag("Size", true);
addPermissionFlag("Edit", false);
addPermissionFlag("Select", true);
addPermissionFlag("Drag", true);

addHotKeyHoldListener("Shift");
addHotKeyHoldListener("Control");
addHotKeyHoldListener("Delete");

export default function render() {
  root.render(<App presentation={presentation}></App>);
}

addEditorChangeHandler(render);
render();
