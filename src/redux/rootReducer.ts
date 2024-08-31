// rootReducer.ts
import { combineReducers } from "redux";
import { baseApi } from "./api/baseApi";
import musicReducer from "./slice/musicSlice"; // Import additional reducers
import musicDataReducer from "./slice/musicDataSlice";

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  music: musicReducer, // Add other reducers here
  musicData: musicDataReducer,
});

export type RootState = ReturnType<typeof reducer>;
