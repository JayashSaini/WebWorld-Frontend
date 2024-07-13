import gsap from "gsap";
import React, { useEffect } from "react";
import { useAnimation } from "../context/animation.context";

const Header = () => {
  const { timeline } = useAnimation();
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Use effect to add animations to the timeline
  useEffect(() => {
    // Add heading animation
    timeline.add(
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 3 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.3 }
      ),
      0
    );

    // Add button animation
    timeline.add(
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 3 },
        { opacity: 1, y: 0, duration: 0.5 }
      ),
      1
    );
  }, [timeline]);

  return (
    <nav className="w-full flex items-center justify-between md:px-5 px-3 md:py-5 py-4 border-b-[#e8eaa1] border-b-[1px]">
      <h1 ref={headingRef} className="text-3xl font-light custom-font">
        web world
      </h1>
      <button
        ref={buttonRef}
        className=" text-white font-medium text-lg md:mr-8 mr-2"
      >
        Login
      </button>
    </nav>
  );
};

export default Header;
