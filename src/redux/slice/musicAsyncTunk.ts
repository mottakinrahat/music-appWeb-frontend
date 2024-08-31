// store/thunks.ts
// store/thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { clearPathHistory } from "./musicSlice";

export const handleMinimize = createAsyncThunk<
  void,
  { router: any }, // Change Router to NextRouter
  { dispatch: AppDispatch; state: RootState }
>("music/handleMinimize", async ({ router }, { dispatch }) => {
  const pathHistory = localStorage.getItem("pathHistory");

  if (pathHistory) {
    router.replace(pathHistory);
    dispatch(clearPathHistory());
  } else {
    router.replace("/");
  }
});
