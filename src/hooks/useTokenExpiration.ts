import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./hooks";
import { logout } from "../store/authSlice";
import { clearAuth } from "../utils/authStorage";

export const useTokenExpiration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const expiresAt = useAppSelector(
    (state) => state.auth.expiresAt
  );

  useEffect(() => {
    if (!expiresAt) return;

    const remainingTime = expiresAt - Date.now();

    if (remainingTime <= 0) {
      dispatch(logout());
      clearAuth();
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => {
      dispatch(logout());
      clearAuth();
      navigate("/login");
    }, remainingTime);

    return () => clearTimeout(timer);

  }, [dispatch, expiresAt, navigate]);
};
