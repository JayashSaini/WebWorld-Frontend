import { CardSection } from "../../../components";
import React from "react";
import reactImage from "../../../assets/languages-icons/reactposter.png";

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
      {/* Our Courses Section  */}
      <CardSection label={label} courses={courses} />
      {/* End Our Courses Section  */}
    </div>
  );
};

export default CoursesLanding;
