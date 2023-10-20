import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";

import { useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const pathNoNavbar = ["/login"];
  return (
    <>
      {!pathNoNavbar.includes(location.pathname) && <Navbar />}

      <Outlet />
      {/* {baseInfo && <Footer />} */}
    </>
  );
};

export default MainLayout;
