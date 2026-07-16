import { configureStore } from "@reduxjs/toolkit";
import stringReducer from "./slice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    string: stringReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
