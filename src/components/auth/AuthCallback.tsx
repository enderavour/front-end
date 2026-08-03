import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { login } from "../../store/authSlice";
import axiosInstance from "../../api/apiService";
import { setToStorage } from "../../utils/authStorage";
import { AddRoutes } from "../../routes/routes";
import { getCurrentUser } from "../../services/userService";
import { Loader } from "../ui/Loader";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        navigate(AddRoutes.LOGIN);
        return;
      }

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

      try {
        const response = await getCurrentUser();

        const authData = {
          token,
          expiresAt: Date.now() + 60 * 60 * 1000,
          userId: response.data.id,
        };

        dispatch(login(authData));
        setToStorage(
          authData.token,
          authData.expiresAt,
          authData.userId
        );

        navigate(AddRoutes.ROOT);
      } catch (error) {
        console.error(error);
        navigate(AddRoutes.LOGIN);
      }
    };

    handleAuth();
  }, [dispatch, navigate]);

  return <Loader />;
};
