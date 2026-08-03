import { useEffect } from "react";
import { useAppSelector } from "./hooks";
import { useLogout } from "./logout";

export const useTokenExpiration = () => {
  const invokeLogout = useLogout();

  const expiresAt = useAppSelector(
    (state) => state.auth.expiresAt
  );

  useEffect(() => {
    if (!expiresAt) return;

    const remainingTime = expiresAt - Date.now();

    if (remainingTime <= 0) {
      invokeLogout();
      return;
    }

    const timer = setTimeout(() => {
      invokeLogout();
    }, remainingTime);

    return () => clearTimeout(timer);

  }, [expiresAt, invokeLogout]);
};
