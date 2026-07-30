import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Company } from "../types/Company";

interface CompanyResponse
{
  companies: Company[];
  total: number;
}

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    }
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/companies"
    }),
    getUserCompanies: builder.query<CompanyResponse, number>({
      query: (userId) => `/users/${userId}/companies`,
      providesTags: ["Company"]
    }),
    leaveCompany: builder.mutation<void, number>({
      query: (companyId) => ({
        url: `/companies/${companyId}/leave`,
        method: "DELETE"
      }),
      invalidatesTags: ["Company"]
    })
  }),
});

export const { useGetCompaniesQuery, useGetUserCompaniesQuery, useLeaveCompanyMutation } = companyApi;
