import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center px-2">
      <div className="m-auto sm:max-w-screen-sm w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
