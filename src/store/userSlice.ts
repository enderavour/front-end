import { User } from "../types/User"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/apiService";

interface UsersState
{
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk<User[], {
  skip: number; limit: number;
}>(
  "users/fetchUsers",
  async ({skip, limit}) => {
    const response = await axiosInstance.get<User[]>(
     `/users?skip=${skip}&limit=${limit}`
    );

    return response.data;
  }
);

export const fetchUsersById = createAsyncThunk<User, number>(
  "users/fetchUsersById",
  async (userId: number) => {
    const response = await axiosInstance.get<User>(`/users/${userId}`);
    return response.data;
  }
);

export const updateUser = createAsyncThunk<
  User,
  { id: number, data: Partial<User> }
>(
  "users/updateUser",
  async ({ id, data }) => {
    const response = await axiosInstance.patch<User>(
      `/users/${id}`,
      data
    );

    return response.data;
  }
);

export const deleteUser = createAsyncThunk<
  number,
  number
>(
  "users/deleteUser",
  async (userId: number) => {
    await axiosInstance.delete(`/users/${userId}`);

    return userId;
  }
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch users"
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;

        const index = state.users.findIndex((user) => user.id === action.payload.id);

        if (index !== -1)
        {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter(user => user.id !== action.payload);

        state.selectedUser = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete user";
      })
      .addCase(fetchUsersById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUsersById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch fetch user";
      })
  }
});

export default usersSlice.reducer;
