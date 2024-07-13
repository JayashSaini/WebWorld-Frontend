import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
const Layout = () => {
  return (
    <div className="w-full min-h-screen h-full custom-main-bg text-white">
      <Header />
      <div className="max-w-screen-xl w-full m-auto">
        <div className="md:px-5 px-3">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
