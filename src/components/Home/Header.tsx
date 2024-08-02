import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import logo from "../../assets/weblogo.svg";
import { useAnimation } from "../../context/animation.context";
import gsap from "gsap";

const Header = () => {
  const { timeline } = useAnimation();
  const headingRef = useRef(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { user, token } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(!!user && !!token); // Set initial state based on user and token

  const navigate = useNavigate();

  useEffect(() => {
    timeline.add(
      gsap.to(headingRef.current, { opacity: 1, duration: 0.3, delay: 0.3 }),
      0
    );
    // Add button animation
    timeline.add(gsap.to(buttonRef.current, { opacity: 1, duration: 0.3 }), 1);

    // Update the isLoggedIn state whenever user or token changes
    setIsLoggedIn(!!user && !!token);
  }, [user, token]);

  return (
    <nav className="w-full flex items-center justify-between md:py-5 py-4 ">
      <Link to="/" ref={headingRef} className="opacity-0">
        <h1 className="custom-font md:text-3xl text-2xl font-semibold">
          <img src={logo} alt="web world" className="md:w-[170px] w-[150px]" />
        </h1>
      </Link>
      <button
        ref={buttonRef}
        className="button opacity-0"
        onClick={() => {
          if (!isLoggedIn) {
            navigate("/auth/login");
          } else {
            navigate("/learn");
          }
        }}
      >
        {isLoggedIn ? "Courses" : "Sign In"}
      </button>
    </nav>
  );
};

export default Header;
