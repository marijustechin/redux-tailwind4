import { Outlet } from "react-router";
import { Header } from "../components/header/Header";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
