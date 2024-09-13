import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
  recordedUrl: string;
  karaoke: boolean;
  record: boolean;
}

const initialState: PlayerState = {
  recordedUrl: "",
  karaoke: false,
  record: false,
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
    record: (state) => {
      state.record = !state.record;
    },
  },
});

export const { setRecordedUrl, karaoke, record } = karaokeActionSlice.actions;
export default karaokeActionSlice.reducer;
