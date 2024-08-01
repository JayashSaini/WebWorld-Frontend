import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full min-h-screen h-full custom-main-bg text-white">
      <div className="max-w-screen-xl w-full m-auto">
        <div className="md:px-8 px-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
