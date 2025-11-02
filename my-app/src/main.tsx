import ReactDOM from "react-dom/client";
import { App } from "./App";
import { presentation } from "./store/functions";
import { addEditorChangeHandler } from "./store/functions";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

export default function render() {
  root.render(<App presentation={presentation}></App>);
}

addEditorChangeHandler(render);
render();
