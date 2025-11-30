import type { PayloadAction } from "@reduxjs/toolkit";
import type { Presentation, SetTitleProps } from "../types";

export default {
  setTitle: (state: Presentation, action: PayloadAction<SetTitleProps>) => {
    state.title = action.payload.name;
  },
};
