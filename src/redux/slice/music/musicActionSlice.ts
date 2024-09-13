import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
  playing: boolean;
  songId: string | null;
  repeat: "repeat-all" | "repeat-one" | "repeat-off" | "shuffle";
  audioElement: HTMLAudioElement | null | any;
  showLyric: boolean;
}

const initialState: PlayerState = {
  playing: false,
  songId: null,
  repeat: "repeat-all", // Default repeat mode
  audioElement: null,
  showLyric: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playSong: (state, action: PayloadAction<string | null>) => {
      state.playing = true;
      state.songId = action?.payload;
    },
    playImport: (state) => {
      state.playing = true;
    },
    pauseSong: (state) => {
      state.playing = false;
    },
    showLyric: (state) => {
      state.showLyric = !state.showLyric;
    },
    toggleRepeat: (state) => {
      if (state.repeat === "repeat-all") {
        state.repeat = "repeat-one";
      } else if (state.repeat === "repeat-one") {
        state.repeat = "repeat-off";
      } else if (state.repeat === "repeat-off") {
        state.repeat = "shuffle";
      } else {
        state.repeat = "repeat-all";
      }
    },
    setAudioElement: (
      state,
      action: PayloadAction<HTMLAudioElement | null>
    ) => {
      state.audioElement = action.payload;
    },
  },
});

export const {
  playSong,
  pauseSong,
  playImport,
  toggleRepeat,
  setAudioElement,
  showLyric,
} = playerSlice.actions;
export default playerSlice.reducer;
