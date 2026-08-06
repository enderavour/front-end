import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Company } from "../types/Company";

interface CompanyResponse
{
  companies: Company[];
  total: number;
};

interface CreateCompanyRequest
{
  name: string;
  description: string | null;
  is_visible: boolean;
};

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    }
  }),
  tagTypes: [
    "Company",
    "Invitation",
    "Request",
    "Member"
  ],
  endpoints: (builder) => ({
    inviteUser: builder.mutation<void, { companyId: number; userId: number }>({
      query: ({ companyId, userId }) => ({
        url: `/company/${companyId}/invite/${userId}`,
        method: "POST"
      }),
      invalidatesTags: ["Company"]
    }),
    cancelInvitation: builder.mutation({
      query: invitationId => ({
        url: `/invitations/${invitationId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Invitation"]
    }),
    getCompaniesInvitation: builder.query({
      query: companyId => `/companies/${companyId}/invitations`,
      providesTags: ["Invitation"]
    }),
    acceptRequest: builder.mutation({
      query: requestId => ({
        url: `/requests/${requestId}/accept`,
        method: "POST"
      }),
      invalidatesTags: ["Request", "Member"]
    }),
    rejectRequest: builder.mutation({
      query: requestId => ({
        url: `/requests/${requestId}/reject`,
        method: "POST"
      }),
      invalidatesTags: ["Request"]
    }),
    getMembers: builder.query({
        query: companyId => `/companies/${companyId}/members`,
        providesTags: ["Member"]
    }),
    excludeMember: builder.mutation({
        query: ({ companyId, userId }) => ({
          url: `/companies/${companyId}/members/${userId}`,
          method: "DELETE"
        }),
        invalidatesTags: ["Member"]
    }),
    getCompanies: builder.query<CompanyResponse, { skip: number, limit: number }>({
      query: ({ skip, limit }) => `/companies?skip=${skip}&limit=${limit}`,
      providesTags: ["Company"]
    }),
    getCompanyById: builder.query<Company, number>({
      query: (id) => `/companies/${id}`,
      providesTags: (_result, _error, id) => [
        { type: "Company", id }
      ]
    }),
    createCompany: builder.mutation<Company, CreateCompanyRequest>({
      query: (body) => ({
        url: "/companies",
        method: "POST",
        body
      }),
      invalidatesTags: ["Company"]
    }),
    updateCompany: builder.mutation<Company, { id: number; data: Partial<Company> }>({
      query: ({ id, data }) => ({
        url: `/companies/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Company", id },
        "Company"
      ]
    }),
    deleteCompany: builder.mutation<void, number>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Company"]
    }),
    getUserCompanies: builder.query<CompanyResponse, number>({
      query: (userId) => `/users/${userId}/companies`,
      providesTags: ["Company"]
    }),
    leaveCompany: builder.mutation<void, number>({
      query: (companyId) => ({
        url: `/companies/${companyId}/leave`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"]
    })
  }),
});

export const {
  useGetCompaniesQuery,
  useGetUserCompaniesQuery,
  useInviteUserMutation,
  useLeaveCompanyMutation,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
