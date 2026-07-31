import { useAppDispatch } from "./hooks";
import { clearStorage } from "../utils/authStorage";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useCallback } from "react";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useCallback(() => {
    dispatch(logout());
    clearStorage();
    navigate("/login");
  }, [dispatch, navigate]);
}
