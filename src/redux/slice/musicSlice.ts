// store/musicSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicState {
  id: string | null;
  listWidth: number; // Add listWidth to state
}

const initialState: MusicState = {
  id: null,
  listWidth: 0, // Initialize listWidth
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string | null>) {
      state.id = action.payload;
    },
    setListWidth(state, action: PayloadAction<number>) {
      state.listWidth = action.payload; // Handle listWidth updates
    },
  },
});

export const { setId, setListWidth } = musicSlice.actions;
export default musicSlice.reducer;
