import { Outlet } from "react-router-dom";

import { Header }  from "./Header";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

const MainLayout = () => {
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
