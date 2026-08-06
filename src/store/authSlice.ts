import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromStorage } from "../utils/authStorage";

interface AuthState
{
  token: string | null;
  userId: number | null;

  loading: boolean;
  error: string | null;
};

interface LoginPayload
{
  token: string,
  userId: number | null
};

const auth = getFromStorage();

const initialState: AuthState = auth ?? {
  token: null,
  userId: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:
  {
    login(state, action: PayloadAction<LoginPayload>) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.token = null;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    }
  }
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
