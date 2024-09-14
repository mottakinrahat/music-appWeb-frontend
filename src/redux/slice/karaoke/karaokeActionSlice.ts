import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
  recordedUrl: string;
  karaoke: boolean;
  isKaraokeRecord: boolean;
  isRecording: boolean | "play" | "pause";
  playRecording: boolean;
}

const initialState: PlayerState = {
  recordedUrl: "",
  karaoke: false,
  isKaraokeRecord: false,
  isRecording: false,
  playRecording: false,
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
    playRecording: (state) => {
      state.playRecording = !state.playRecording;
    },
  },
});

export const {
  setRecordedUrl,
  karaoke,
  isKaraokeRecord,
  isRecording,
  playRecording,
} = karaokeActionSlice.actions;
export default karaokeActionSlice.reducer;
