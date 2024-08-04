import { Outlet } from "react-router-dom";
import { HomeFooter, HomeHeader } from "../components";

const SiteLayout = () => {
  return (
    <div className="max-w-screen-xl w-full md:px-8 px-2 m-auto">
      {/* Header section */}
      <HomeHeader />
      <Outlet />
      {/* Footer  */}
      <HomeFooter />
    </div>
  );
};

export default SiteLayout;
