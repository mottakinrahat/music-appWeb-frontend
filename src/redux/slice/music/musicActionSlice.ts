import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  playing: boolean;
  songId: string | null;
}

const initialState: PlayerState = {
  playing: false,
  songId: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playSong: (state, action: PayloadAction<string>) => {
      state.playing = true;
      state.songId = action.payload;
      localStorage.setItem(
        "songData",
        JSON.stringify({ play: true, id: action.payload })
      );
    },
    pauseSong: (state) => {
      state.playing = false;
      if (state.songId) {
        localStorage.setItem(
          "songData",
          JSON.stringify({ play: false, id: state.songId })
        );
      }
    },
  },
});

export const { playSong, pauseSong } = playerSlice.actions;
export default playerSlice.reducer;
