import { useEffect, useState } from "react";
import { CourseInterface } from "../../interfaces";
import { useNavigate } from "react-router-dom";

interface HorizontalCardProps {
  data: CourseInterface;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ data }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640); // Tailwind's 'sm' breakpoint is 640px
  const subtitle = data.subTitle;
  const maxLength = isSmallScreen ? 50 : 100; // Adjust the length based on screen size
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className="w-full flex px-5 py-6 gap-2 cursor-pointer hover:bg-[#0e1b10ce] duration-100 ease-linear select-none"
        onClick={() => {
          navigate("/dashboard/courses/" + data?._id);
        }}
      >
        <div className="w-[30%] sm:h-[180px] h-[120px] overflow-hidden ">
          <img
            src={data.thumbnail.url}
            alt="thumbnail"
            className="h-full w-full object-cover rounded-md"
          />
        </div>
        <div className="w-[70%] text-white">
          <h2 className="custom-font2 sm:text-2xl text-xl  font-bold">
            {data.title}
          </h2>
          <p className="text-sm font-light text-neutral-300 mt-1">
            Lessons &nbsp;
            {data.syllabus.length}
          </p>
          <h3 className="poppins sm:text-[17px] text-sm font-normal sm:mt-1">
            {subtitle.slice(0, maxLength)}
            {subtitle.length > maxLength ? "..." : ""}
          </h3>
        </div>
      </div>
      <hr className=" border-neutral-700" />
    </>
  );
};

export default HorizontalCard;
