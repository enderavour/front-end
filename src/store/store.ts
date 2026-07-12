import { configureStore } from "@reduxjs/toolkit";
import stringReducer from "./slice";

export const store = configureStore({
  reducer: {
    string: stringReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
