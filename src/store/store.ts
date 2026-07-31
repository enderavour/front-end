import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usersReducer from "./userSlice";
import companyReducer from "./companySlice";
import { companyApi } from "./companyApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    companies: companyReducer,

    [companyApi.reducerPath]: companyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(companyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
