// store/musicSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store"; // Adjust based on your store setup
import { Router } from "next/router";

export interface MusicState {
  id: string | null;
  pathHistory: string | null;
}

const initialState: MusicState = {
  id: null,
  pathHistory: null,
};


const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string | null>) {
      state.id = action.payload;
    },
    setPathHistory(state, action: PayloadAction<string | null>) {
      state.pathHistory = action.payload;
    },
    clearPathHistory(state) {
      state.pathHistory = null;
    },
  },
});

export const { setId, setPathHistory, clearPathHistory } = musicSlice.actions;
export default musicSlice.reducer;
