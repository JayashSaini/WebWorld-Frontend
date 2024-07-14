import { useEffect, useRef } from "react";
import webworldpng from "../assets/webworld.png";
import { useAnimation } from "../context/animation.context";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

const About: React.FC = () => {
  const { timeline } = useAnimation();
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      timeline.add(
        gsap.fromTo(
          aboutRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 50%",
              end: "bottom 50%",
              scrub: true,
            },
          }
        ),
        4
      );
    }
  }, []);

  return (
    <section
      ref={aboutRef}
      className="flex md:flex-row flex-col-reverse gap-5 my-28"
    >
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <img src={webworldpng} alt="" className="md:w-3/5 w-full" />
      </div>
      <div className="md:w-1/2 w-full">
        <h1 className="text-5xl custom-font font-semibold">About Us</h1>
        <p className="text-base md:w-4/5 w-full">
          Welcome to our online learning platform tailored for web developers.
          We're dedicated to empowering you with practical skills through
          interactive tutorials, expert-led courses, and project-based learning.
          Our mission is to foster a supportive community where you can grow
          your expertise and build real-world projects. Join us on this journey
          to elevate your web development skills and career prospects.
          <br />
          <br />
          <span className="text-white md:block hidden">
            This platform is designed solely for learning purposes. While we
            strive to provide comprehensive educational resources, please
            approach all content and exercises with a focus on learning and
            skill enhancement.
          </span>
        </p>
      </div>
    </section>
  );
};

export default About;
