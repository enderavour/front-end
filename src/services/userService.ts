import axiosInstance from "../api/apiService";
import { ApiRoutes } from "../routes/routes";

export const getCurrentUser = () => {
  return axiosInstance.get(ApiRoutes.USERS_ME);
}
