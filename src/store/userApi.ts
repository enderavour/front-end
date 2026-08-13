import { User } from "../types/User"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserResponse
{
  users: User[];
  total: number;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    }
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, { skip: number, limit: number }>({
      query: ({ skip, limit }) => `/users?skip=${skip}&limit=${limit}`,
      providesTags: ["User"]
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, _id) => [
        { type: "User", _id }
      ]
    }),
    updateUser: builder.mutation<User, { id: number, data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        "User"
      ]
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["User"]
    }),
  })
});


export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi;
