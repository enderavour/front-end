import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

const PrivateRoute = () => {
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();

  if (!token)
  {
    return <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />;
  }

  return <Outlet />;
}

export { PrivateRoute };
