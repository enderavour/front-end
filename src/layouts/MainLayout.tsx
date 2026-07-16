import { Outlet } from "react-router-dom";

import { Header }  from "./Header";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { useTokenExpiration } from "../hooks/useTokenExpiration";

const MainLayout = () => {
  useTokenExpiration();

  return (
    <>
      <Header />

      <Navigation />

      <Outlet />

      <Footer />
    </>
  )
};

export { MainLayout };
