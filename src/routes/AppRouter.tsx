import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Users } from '../pages/Users';
import { UserProfile } from '../pages/UserProfile';
import { Companies } from '../pages/Companies';
import { CompanyProfile } from '../pages/CompanyProfile';
import { NotFound } from '../pages/NotFound';
import { AddRoutes } from "./routes";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../pages/Login";
import { Registration } from "../pages/Registration";
import { AuthCallback } from "../components/auth/AuthCallback";

const AppRouter = () => {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path={AddRoutes.AUTH_CALLBACK} element={<AuthCallback />} />

        <Route element={<PrivateRoute />}>
          <Route path={AddRoutes.ROOT} element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path={AddRoutes.ABOUT} element={<About />} />
            <Route path={AddRoutes.USERS} element={<Users />} />
            <Route path={AddRoutes.USERS_ID} element={<UserProfile />} />
            <Route path={AddRoutes.COMPANIES} element={<Companies />} />
            <Route path={AddRoutes.COMPANIES_ID} element={<CompanyProfile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    );
};

export { AppRouter };
