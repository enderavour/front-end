import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { companyApi } from "./companyApi";
import { userApi } from "./userApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [companyApi.reducerPath]: companyApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(companyApi.middleware)
      .concat(userApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
