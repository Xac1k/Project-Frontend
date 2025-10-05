import React from "react";
import stylesInput from "./HotBarInputs.module.css";

export default function HotBarInput() {
  return (
    <input
      className={stylesInput.presentationName}
      type={"text"}
      onInput={(event) => {
        const target = event.target as HTMLInputElement;
        console.log(target.value);
      }}
      defaultValue="Новая презентация"
    ></input>
  );
}
