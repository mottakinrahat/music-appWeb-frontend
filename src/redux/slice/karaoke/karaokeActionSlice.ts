import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
  recordedUrl: string;
  karaoke: boolean;
}

const initialState: PlayerState = {
  recordedUrl: "",
  karaoke: false,
};

const karaokeActionSlice = createSlice({
  name: "karaoke",
  initialState,
  reducers: {
    setRecordedUrl(state, action: PayloadAction<string>) {
      state.recordedUrl = action.payload;
    },
    karaoke: (state) => {
      state.karaoke = !state.karaoke;
    },
  },
});

export const { setRecordedUrl, karaoke } = karaokeActionSlice.actions;
export default karaokeActionSlice.reducer;
