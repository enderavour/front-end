import axiosInstance from "./apiService";

export const healthCheck = () => {
  return axiosInstance.get("/health");
}
