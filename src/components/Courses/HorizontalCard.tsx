import { useEffect, useState } from "react";
import reactImage from "../../assets/languages-icons/reactposter.png";
// interface HorizontalCardProps {
//   data: {
//     title: string;
//     thumbnail: string;
//     lessons: number;
//   };
// }

const HorizontalCard: React.FC = () => {
  const data = {
    title: "Chai aur ReactJS",
    subTitle:
      "Chai aur ReactJS is a comprehensive tutorial on ReactJS. It covers everything from the basics to advanced concepts.",
    thumbnail: reactImage,
    lessons: 12,
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640); // Tailwind's 'sm' breakpoint is 640px
  const subtitle = data.subTitle;
  const maxLength = isSmallScreen ? 70 : 100; // Adjust the length based on screen size

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="w-full flex px-5 py-6 gap-2 cursor-pointer hover:bg-[#0e1b10ce] duration-100 ease-linear select-none">
        <div className="w-[30%] sm:h-[180px] h-[120px] overflow-hidden ">
          <img
            src={data.thumbnail}
            alt="thumbnail"
            className="h-full w-full object-cover rounded-md"
          />
        </div>
        <div className="w-[70%] text-white">
          <h2 className="custom-font sm:text-2xl text-xl  font-light">
            {data.title}
          </h2>
          <p className="text-sm font-light text-gray-300 mt-1">
            Lessons &nbsp;
            {data.lessons}
          </p>
          <h3 className="poppins sm:text-lg text-sm font-normal">
            {subtitle.slice(0, maxLength)}
            {subtitle.length > maxLength ? "..." : ""}
          </h3>
        </div>
      </div>
      <hr className=" border-slate-800" />
    </>
  );
};

export default HorizontalCard;
