import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { useAnimation } from "../context/animation.context";
import { HoverEffect } from "../components/ui/cardhover";
import { Project, projects } from "../lib/data";

const Home: React.FC = () => {
  const { timeline } = useAnimation();
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleViewportChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // If viewport is smaller than md, remove two objects from the array
        setDisplayProjects(projects.slice(0, projects.length - 2));
      } else {
        // If viewport is larger or equal to md, show all objects
        setDisplayProjects(projects);
      }
    };

    // Initial check
    if (mediaQuery.matches) {
      setDisplayProjects(projects.slice(0, projects.length - 2));
    } else {
      setDisplayProjects(projects);
    }

    mediaQuery.addListener(handleViewportChange); // Listen for changes

    return () => mediaQuery.removeListener(handleViewportChange); // Cleanup listener on unmount
  }, []);

  return (
    <div className="w-full">
      {/* hero section  */}
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

      {/* featuers section  */}
      <section className="w-full md:mt-40 mt-24 mx-auto">
        <HoverEffect items={displayProjects} />
      </section>
    </div>
  );
};

export default Home;
