import React, { useEffect } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { CourseInterface } from "../../interfaces";

interface CarouselProps {
  label: string;
  courses: CourseInterface[];
}

const CardSection: React.FC<CarouselProps> = ({ label, courses }) => {
  const navigate = useNavigate();
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
      checkScrollability();
    }
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -270, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 270, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full py-8">
      <div className="w-full flex justify-between px-3 items-end">
        <h2 className="custom-font md:text-2xl text-xl font-medium">{label}</h2>
        <button
          className="px-4 py-2 border-[1px] border-white rounded-sm cursor-pointer md:text-sm text-xs hover:bg-[#ef6d3536] duration-200 ease-in-out"
          onClick={() => {
            navigate("/dashboard/courses/all?show=all-courses");
          }}
        >
          View All
        </button>
      </div>
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto pt-2 md:pb- pb-5 scroll-smooth [scrollbar-width:none] "
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div
          className={cn(
            "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
          )}
        ></div>

        <div
          className={cn(
            "flex flex-row justify-start gap-4 pl-4",
            "max-w-7xl          " // remove max-w-4xl if you want the carousel to span the full width of its container
          )}
        >
          {courses.map((item, index) => (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                  once: true,
                },
              }}
              key={"card" + index}
              className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
            >
              <Card data={item} />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 sm:mr-10 mr-5">
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center disabled:opacity-50"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-neutral-500" />
        </button>
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center disabled:opacity-50"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <IconArrowNarrowRight className="h-6 w-6 text-neutral-500" />
        </button>
      </div>
    </div>
  );
};

export default CardSection;
