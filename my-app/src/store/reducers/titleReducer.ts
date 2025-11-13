import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SetTitleProps } from "../types";
const initialState: string = "Введите название";

export const TitleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<SetTitleProps>) => {
      state = action.payload.name;
    },
  },
});

export const titleActions = TitleSlice.actions;

export default TitleSlice.reducer;
