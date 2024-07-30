import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useAnimation } from "../context/animation.context";
import { HoverEffect } from "../components/ui/cardhover";
import { Project, projects } from "../lib/data";
import About from "./About";

const Home: React.FC = () => {
  const { timeline } = useAnimation();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);

  // Animation effect for heading on component mount
  const animateHeading = () => {
    timeline.add(
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 3 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.1 }
      ),
      0
    );
  };

  // Function to handle media query changes and update displayProjects state
  const handleViewportChange = (e: MediaQueryListEvent) => {
    if (e.matches) {
      setDisplayProjects(sliceProjects(3));
    } else {
      setDisplayProjects(projects);
    }
  };

  useEffect(() => {
    const mediaQuery: any = window.matchMedia("(max-width: 768px)");

    animateHeading();
    handleViewportChange(mediaQuery);

    mediaQuery.addListener(handleViewportChange);
    return () => mediaQuery.removeListener(handleViewportChange);
  }, [timeline]);

  // Function to slice projects array based on count
  const sliceProjects = (count: number) => {
    return projects.slice(0, projects.length - count);
  };

  return (
    <div className="w-full">
      {/* Hero section */}
      <section className="md:w-2/3 w-full md:mt-32 mt-20">
        <h2
          ref={headingRef}
          className="lg:text-8xl md:text-6xl text-5xl custom-font"
        >
          An Online <span>Learning</span> Platform, For Web Developers{" "}
          <span className="lg:text-7xl md:text-5xl sm:text-4xl text-3xl md:inline-block hidden">
            📙
          </span>
        </h2>
      </section>

      {/* Features section */}
      <section className="w-full md:mt-40 mt-24 mx-auto">
        <HoverEffect items={displayProjects} />
      </section>

      {/* About section */}
      <About />
    </div>
  );
};

export default Home;
