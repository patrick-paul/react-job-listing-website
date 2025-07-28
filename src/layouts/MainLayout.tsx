import { Outlet } from "react-router-dom";
import ToastCustomContainer from "../components/ui/ToastCustomContainer";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <ToastCustomContainer />
    </>
  );
};

export default MainLayout;
