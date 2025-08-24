// store/musicSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MusicState {
  id: string | null;
  pathHistory: string | null;
  listWidth: number; // Added for responsive width
  playlistOpen: number; // Added for responsive width
}

const initialState: MusicState = {
  id: null,
  pathHistory: null,
  listWidth: 0, // Initial value
  playlistOpen: 0, // Initial value
};



const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setSongId(state, action: PayloadAction<MusicState['id']>) {
      state.id = action.payload;
    },
    setPathHistory(state, action: PayloadAction<string | null>) {
      state.pathHistory = action.payload;
    },
    clearPathHistory(state) {
      state.pathHistory = null;
    },
    togglePlaylist(state, action: PayloadAction<number>) {
      const screenWidth = action.payload;
      const width = screenWidth < 480 ? 300 : screenWidth < 768 ? 400 : 700;
      if (state.listWidth <= 0) {
        state.playlistOpen = width;
        state.listWidth = width;
      } else {
        state.playlistOpen = 0;
        state.listWidth = 0;
      }
    },
    setListWidth(state, action: PayloadAction<number>) {
      state.listWidth = action.payload;
    },
    setPlaylistOpen(state, action: PayloadAction<number>) {
      state.playlistOpen = action.payload;
    },
  },
});

export const {
  setSongId,
  setPathHistory,
  clearPathHistory,
  togglePlaylist,
  setListWidth,
  setPlaylistOpen,
} = musicSlice.actions;
export default musicSlice.reducer;
