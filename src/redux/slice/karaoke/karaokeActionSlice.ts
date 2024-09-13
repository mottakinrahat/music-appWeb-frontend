import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
  recordedUrl: string;
  karaoke: boolean;
  isKaraokeRecord: boolean;
}

const initialState: PlayerState = {
  recordedUrl: "",
  karaoke: false,
  isKaraokeRecord: false,
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
    isKaraokeRecord: (state, action: PayloadAction<boolean>) => {
      state.isKaraokeRecord = action.payload;
    },
  },
});

export const { setRecordedUrl, karaoke, isKaraokeRecord } = karaokeActionSlice.actions;
export default karaokeActionSlice.reducer;
