// store/musicSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicState {
  id: string | null;
}

const initialState: MusicState = {
  id: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string | null>) {
      state.id = action.payload;
    },
  },
});

export const { setId } = musicSlice.actions;
export default musicSlice.reducer;
