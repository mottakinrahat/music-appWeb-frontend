import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
  recordedUrl: string;
  karaoke: boolean;
  isKaraokeRecord: boolean;
  isRecording: boolean | "play" | "pause";
}

const initialState: PlayerState = {
  recordedUrl: "",
  karaoke: false,
  isKaraokeRecord: false,
  isRecording: false,
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
isRecording: (state, action: PayloadAction<boolean | "play" | "pause">) => {
      state.isRecording = action.payload;
    },
  },
});

export const { setRecordedUrl, karaoke, isKaraokeRecord, isRecording } =
  karaokeActionSlice.actions;
export default karaokeActionSlice.reducer;
