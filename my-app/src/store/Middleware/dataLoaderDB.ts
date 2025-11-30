import { getPresentationDB } from "../Table/tableDB";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const downloadPresentationDB = createAsyncThunk("presentation/downloadPresentationDB", async (rowID: string) => {
  const response = await getPresentationDB(rowID);
  const presData = JSON.parse(response.JSON);
  return presData;
});
