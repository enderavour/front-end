import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Users from '../pages/Users/Users';
import UserProfile from '../pages/UserProfile/UserProfile';
import Companies from '../pages/Companies/Companies';
import CompanyProfile from '../pages/CompanyProfile/CompanyProfile';
import NotFound from '../pages/NotFound/NotFound';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<UserProfile />} />
                <Route path="companies" element={<Companies />} />
                <Route path="companies/:id" element={<CompanyProfile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
