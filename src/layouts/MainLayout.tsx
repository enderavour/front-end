import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Navigation } from "./Navigation"
import { Footer } from "./Footer";
import { HealthStatus } from "../components/HealthStatus";

export const MainLayout = () => {
  return (
    <>
      <Header />

      <HealthStatus />

      <Navigation />

      <Outlet />

      <Footer />
    </>
  )
};
