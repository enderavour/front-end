import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { AddRoutes } from "../routes";

export const PrivateRoute = () => {
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();

  if (!token)
  {
    return <Navigate
      to={AddRoutes.LOGIN}
      state={{ from: location }}
      replace
    />;
  }

  return <Outlet />;
}
