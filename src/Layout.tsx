import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, Footer } from './components';

const Layout = () => {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check if the route includes '/auth'
    if (location.pathname.includes('/auth')) {
      setShowHeaderFooter(false);
    } else {
      setShowHeaderFooter(true);
    }
  }, [location.pathname]);

  return (
    <div className="w-full min-h-screen h-full custom-main-bg text-white">
      {showHeaderFooter && <Header />}
      <div className="max-w-screen-xl w-full m-auto">
        <div className="md:px-8 px-2">
          <Outlet />
        </div>
      </div>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
