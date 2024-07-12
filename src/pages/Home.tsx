import gsap from "gsap";
import React, { useEffect } from "react";
import { useAnimation } from "../context/animation.context";

const Home = () => {
  const { timeline } = useAnimation();
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  // Use effect to add animations to the timeline
  useEffect(() => {
    // Add heading animation
    timeline.add(
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 3 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.1 }
      ),
      2
    );
  }, [timeline]);

  return (
    <div className="w-full ">
      <div className="md:w-2/3 w-full md:mt-32 mt-20">
        <h2
          ref={headingRef}
          className="lg:text-8xl md:text-6xl sm:text-5xl text-4xl"
        >
          An Online <span>Learning</span> Platform, For Web Developers{" "}
          <span className="lg:text-7xl md:text-5xl sm:text-4xl text-3xl">
            📙
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Home;
