import React, { useEffect, useState } from "react";
import { HoverEffect } from "../components/ui/cardhover";
import { Project, projects } from "../lib/data.tsx";
import About from "./About";
import { HomeFooter, HomeHeader, CardCarousal } from "../components/index.ts";

const Home: React.FC = () => {
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);

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

    handleViewportChange(mediaQuery);

    mediaQuery.addListener(handleViewportChange);
    return () => mediaQuery.removeListener(handleViewportChange);
  }, []);

  // Function to slice projects array based on count
  const sliceProjects = (count: number) => {
    return projects.slice(0, projects.length - count);
  };

  return (
    <div className="max-w-screen-xl w-full md:px-8 px-2 m-auto">
      {/* Header section */}
      <HomeHeader />

      {/* Hero section */}
      <section className="w-full md:mt-32 mt-20">
        <h2 className="lg:text-8xl md:text-6xl text-5xl custom-font ">
          An Online <span>Learning</span> Platform, For Web Developers{" "}
        </h2>
      </section>

      {/* Features section */}
      <section className="w-full md:mt-40 mt-6 mx-auto ">
        <HoverEffect items={displayProjects} />
      </section>

      {/* courses section */}
      <section className="w-full ">
        <CardCarousal />
      </section>

      {/* About section */}
      <About />

      {/* Footer  */}
      <HomeFooter />
    </div>
  );
};

export default Home;
