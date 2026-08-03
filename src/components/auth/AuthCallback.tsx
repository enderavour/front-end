import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { login } from "../../store/authSlice";
import axiosInstance from "../../api/apiService";
import { setToStorage } from "../../utils/authStorage";

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

      try {
        const response = await axiosInstance.get("/users/me");

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

        navigate("/");
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    handleAuth();
  }, [dispatch, navigate]);

  return <p>Loading...</p>;
};

export { AuthCallback };
