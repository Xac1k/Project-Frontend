import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const body = document.body

body.style.margin = '0'
body.style.padding = '0'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
);
