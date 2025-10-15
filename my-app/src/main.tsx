import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
// import {dataJSON} from './store/PresentationMax';
import {presentation} from "./store/functions"
import { addEditorChangeHandler } from './store/functions';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

export default function render(){
    root.render(
      <React.StrictMode>
        <App presentation={presentation}></App>
      </React.StrictMode>,
    );
}

addEditorChangeHandler(render);
render();
