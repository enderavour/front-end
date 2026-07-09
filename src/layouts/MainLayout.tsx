import { Outlet } from "react-router-dom";

import Header from "../components/Common/Header/Header";
import Navigation from "../components/Common/Navigation/Navigation";
import Footer from "../components/Common/Footer/Footer"

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

export default MainLayout;
