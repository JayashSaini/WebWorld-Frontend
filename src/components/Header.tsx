import gsap from "gsap";
import React, { useEffect } from "react";
import { useAnimation } from "../context/animation.context";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  const { timeline } = useAnimation();
  const headingRef = React.useRef(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Use effect to add animations to the timeline
  useEffect(() => {
    // Add heading animation
    timeline.add(
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 3 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.1 }
      ),
      0
    );

    // Add button animation
    timeline.add(
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 3 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.1 }
      ),
      1
    );
  }, [timeline]);

  return (
    <nav className="w-full flex items-center justify-between md:px-5 px-3 md:py-5 py-4 border-b-[#e8eaa1] border-b-[1px]">
      <Link to="/" ref={headingRef}>
        <img src={logo} alt="" className="w-[180px]" />
      </Link>
      <button ref={buttonRef} className=" button ">
        Login
      </button>
    </nav>
  );
};

export default Header;
