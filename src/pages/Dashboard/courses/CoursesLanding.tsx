import { CardSection, HorizontalCard } from "../../../components";
import React from "react";
import reactImage from "../../../assets/languages-icons/reactposter.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CoursesLanding: React.FC = () => {
  const label = "Our Popular Courses";
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
  return (
    <div className="w-full min-h-screen h-full">
      <div className="w-full sm:px-12 px-3 py-12 custom-hero-bg ">
        <h1 className="custom-font text-xl font-light">Courses</h1>
        <p className="custom-font text-2xl font-semibold">
          Welcome, Jayash to Our Courses
        </p>
      </div>
      {/* Continue Learning  */}
      <div className="max-w-screen-2xl m-auto py-8">
        <div className="w-full px-3 mb-3">
          <div className="w-full flex justify-between  items-center mb-2">
            <h2 className="custom-font md:text-2xl text-xl font-medium">
              Continue Learning
            </h2>
            <Link
              to="/dashboard/courses/all?show=my-enrollments"
              className="text-sm  flex gap-1 items-center justify-start duration-200 ease-in-out group"
            >
              My Enrollments
              <FaLongArrowAltRight className="ml-1 transform transition-transform duration-200 ease-in-out group-hover:translate-x-2" />
            </Link>
          </div>
          <HorizontalCard />
        </div>
        {/* End Continue Learning  */}
        {/* Our Courses Section  */}
        <CardSection label={label} courses={courses} />
        {/* End Our Courses Section  */}
      </div>
    </div>
  );
};

export default CoursesLanding;
