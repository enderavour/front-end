import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

import { Home } from '../pages/Home/';
import { About } from '../pages/About/';
import { Users } from '../pages/Users/';
import { UserProfile } from '../pages/UserProfile';
import { Companies } from '../pages/Companies';
import { CompanyProfile } from '../pages/CompanyProfile';
import { NotFound } from '../pages/NotFound';
import { AppRoutes } from "./routes";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={AppRoutes.ROOT} element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path={AppRoutes.ABOUT} element={<About />} />
                <Route path={AppRoutes.USERS} element={<Users />} />
                <Route path={AppRoutes.USER_PROFILE} element={<UserProfile />} />
                <Route path={AppRoutes.COMPANIES} element={<Companies />} />
                <Route path={AppRoutes.COMPANY_PROFILE} element={<CompanyProfile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export { AppRouter };
