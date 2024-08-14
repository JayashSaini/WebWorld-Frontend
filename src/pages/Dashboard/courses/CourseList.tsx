import React from "react";
import reactImage from "../../../assets/languages-icons/reactposter.png";
import { Link, useLocation } from "react-router-dom";
import { HorizontalCard } from "../../../components";

const courses = [
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
  {
    title: "ReactJS",
    thumbnail: reactImage,
    lessons: 12,
  },
];

const CourseList: React.FC = () => {
  const location = useLocation(); // Access the location object
  const queryParams = new URLSearchParams(location.search); // Create an instance of URLSearchParams
  const showParam = queryParams.get("show"); // Get the 'show' query parameter value

  const label = convertToHumanReadable(showParam);
  return (
    <div className="w-full min-h-screen h-auto">
      <div className="w-full sm:px-12 px-3 sm:py-16 py-12 custom-hero-secondary-bg ">
        <h1 className="custom-font sm:text-4xl text-3xl font-medium">
          {label}
        </h1>
      </div>
      <div className="p-3 max-w-screen-2xl m-auto">
        <p className="text-base font-sans custom-font">
          <Link
            to="/dashboard/courses"
            className="text-orange-400 hover:underline"
          >
            Learn
          </Link>{" "}
          / {label}
        </p>

        <div className="my-8 mt-14 md:px-8 px-2">
          <h2 className=" sm:text-3xl text-2xl flex items-center justify-start gap-2">
            {showParam === "all-courses" ? "Courses" : "All"}{" "}
            <span className="text-white text-xs p-2 bg-slate-800 rounded-full">
              {courses.length < 10 ? "0" + courses.length : courses.length}{" "}
            </span>
          </h2>
          <div className="w-full min-h-[600px] max-h-[1000px] border-gray-700 border-[1px] rounded-md mt-2  overflow-y-scroll">
            <HorizontalCard />
            <HorizontalCard />
            <HorizontalCard />
            <HorizontalCard />
            <HorizontalCard />
            <HorizontalCard />
            <HorizontalCard />
            <HorizontalCard />
            <HorizontalCard />
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to convert URL-friendly strings to human-readable format
const convertToHumanReadable = (param: string | null): string => {
  if (!param) return "All Courses"; // Default label if param is null

  // Convert hyphens to spaces and capitalize each word
  return param
    .replace(/-/g, " ") // Replace hyphens with spaces
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join words with spaces
};

export default CourseList;
