import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full min-h-screen h-full custom-main-bg text-white select-none">
      <Outlet />
    </div>
  );
};

export default Layout;
