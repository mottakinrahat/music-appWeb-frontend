// rootReducer.ts
import { combineReducers } from "redux";
import { baseApi } from "./api/baseApi";
import musicReducer from "./slice/musicSlice"; // Import additional reducers

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  music: musicReducer, // Add other reducers here
});

export type RootState = ReturnType<typeof reducer>;
