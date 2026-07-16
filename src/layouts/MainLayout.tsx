import { Outlet } from "react-router-dom";

import { Header } from "../components/layout/Header";
import { Navigation } from "../components/layout/Navigation";
import { Footer } from "../components/layout/Footer";

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
