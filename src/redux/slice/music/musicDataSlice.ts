// store/musicDataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicDataState {
  id: string | null;
  fileData: string | null;
  title: string | null;
}

const initialState: MusicDataState = {
  id: null,
  fileData: null,
  title: null,
};

const musicDataSlice = createSlice({
  name: "musicData",
  initialState,
  reducers: {
    setMusicData(state, action: PayloadAction<MusicDataState>) {
      state.id = action.payload.id;
      state.fileData = action.payload.fileData;
      state.title = action.payload.title;
    },
    clearMusicData(state) {
      state.id = null;
      state.fileData = null;
      state.title = null;
    },
  },
});

export const { setMusicData, clearMusicData } = musicDataSlice.actions;
export default musicDataSlice.reducer;
