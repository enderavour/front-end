import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadAuth } from "../utils/authStorage";

interface AuthState
{
  token: string | null,
  expiresAt: number | null
};

interface LoginPayload
{
  token: string,
  expiresAt: number
};

const auth = loadAuth();

const initialState: AuthState = auth ?? {
  token: null,
  expiresAt: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:
  {
    login(state, action: PayloadAction<LoginPayload>) {
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
    },
    logout(state) {
      state.token = null;
      state.expiresAt = null;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    }
  }
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
