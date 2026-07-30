import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/apiService";
import { Company } from "../types/Company";
import { current } from "@reduxjs/toolkit";

interface CompanyResponse
{
  companies: Company[];
  total: number;
};

export interface CompanyState
{
  companies: Company[];
  total: number;
  selectedCompany: Company | null;
  loading: boolean;
  error: string | null;
};

export interface CreateCompanyRequest
{
  name: string;
  description: string | null;
  is_visible: boolean;
};

const initialState: CompanyState = {
  companies: [],
  total: 0,
  selectedCompany: null,
  loading: false,
  error: null
};

export const createCompany = createAsyncThunk<
  Company,
  CreateCompanyRequest
>(
  "companies/createCompany",
  async (data) => {
    const resp = await axiosInstance.post<Company>("/companies", data);
    console.log(resp.data);
    return resp.data;
  }
);

export const updateCompany = createAsyncThunk<
  Company,
  { id: number, data: Partial<Company> }
  >(
  "companies/updateCompany",
  async ({ id, data }) => {
    const response = await axiosInstance.patch<Company>(`/companies/${id}`, data);
    return response.data;
  }
);

export const deleteCompany = createAsyncThunk<number, number>(
  "companies/deleteCompany",
  async (companyId: number) => {
    await axiosInstance.delete(`/companies/${companyId}`);

    return companyId;
  }
);

export const fetchCompanies = createAsyncThunk<CompanyResponse, {
  skip: number; limit: number;
}>(
  "companies/fetchCompanies",
  async ({ skip, limit }) => {
    const response = await axiosInstance.get<CompanyResponse>(`/companies?skip=${skip}&limit=${limit}`);

    return response.data;
  }
)

export const fetchCompanyById = createAsyncThunk<Company, number>(
  "companies/fetchCompanyById",
  async (companyId: number) => {
    const response = await axiosInstance.get<Company>(`/companies/${companyId}`);
    return response.data;
  }
);

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.fulfilled, (state, action) => {
        console.log(current(state));

        state.loading = false;
        state.companies = [
          ...state.companies,
          action.payload,
        ];
        state.total++;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create company";
      })
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.companies = action.payload.companies;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch companies"
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCompany = action.payload;

        const index = state.companies.findIndex((company) => company.id === action.payload.id);

        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update company";
      })
      .addCase(updateCompany.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;

        state.companies = state.companies.filter(company => company.id !== action.payload);
        state.total -= 1;
        state.selectedCompany = null;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete company";
      })
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCompany = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch company";
      })
  }
});

export default companySlice.reducer;
