import { useEffect, useRef } from "react";
import aboutus from "../assets/aboutus.svg";
import gsap from "gsap";
import { useAnimation } from "../context/animation.context";

const About: React.FC = () => {
  const { timeline } = useAnimation();
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      timeline.add(
        gsap.to(aboutRef.current, {
          opacity: 1,
          duration: 0.3,
        }),
        5
      );
    }
  }, [timeline]);

  return (
    <section
      ref={aboutRef}
      className="opacity-0 flex md:flex-row flex-col-reverse gap-14 md:my-28 my-10 "
    >
      <div className="md:w-1/2 w-full flex items-end justify-center">
        <img src={aboutus} alt="" className="md:w-[70%] w-full" />
      </div>
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-4xl text-3xl custom-font font-semibold">
          About Us
        </h1>
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
