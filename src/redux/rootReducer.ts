import { combineReducers } from "redux";
import { baseApi } from "./api/baseApi";
import musicReducer from "./slice/music/musicSlice";
import musicDataReducer from "./slice/music/musicDataSlice";
import playerReducer from "./slice/music/musicActionSlice";
import karaokeActionSlice from "./slice/karaoke/karaokeActionSlice";

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  music: musicReducer,
  musicData: musicDataReducer,
  player: playerReducer,
  karaoke: karaokeActionSlice,
});

export type RootState = ReturnType<typeof reducer>;
