import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import logo from '../assets/weblogo.svg'

const Header = () => {
  const headingRef = useRef(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { user, token } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(!!user && !!token); // Set initial state based on user and token

  const navigate = useNavigate();

  useEffect(() => {
    // Update the isLoggedIn state whenever user or token changes
    setIsLoggedIn(!!user && !!token);
  }, [user, token]);

  return (
    <nav className="w-full flex items-center justify-between md:px-5 px-3 md:py-5 py-4 ">
      <Link to="/" ref={headingRef}>
        <h1 className="custom-font md:text-3xl text-2xl font-semibold">
          <img src={logo} alt="web world" className="md:w-[170px] w-[150px]"/>
        </h1>
      </Link>
      <button
        ref={buttonRef}
        className="button"
        onClick={() => {
          if (!isLoggedIn) {
            navigate("/auth/login");
          } else {
            navigate("/learn");
          }
        }}
      >
        {isLoggedIn ? "Dashboard" : "Sign In"}
      </button>
    </nav>
  );
};

export default Header;
