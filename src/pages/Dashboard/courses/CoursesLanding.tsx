import React, { useEffect, useState } from "react";
import { CardSection, HorizontalCard, Loader } from "../../../components";
import { Link } from "react-router-dom";
import { getAllCourses, getEnrollCourses } from "../../../api";
import { CourseInterface } from "../../../interfaces";
import { useAuth } from "../../../context/auth.context";
import { requestHandler } from "../../../util"; // Make sure to import requestHandler
import { FaLongArrowAltRight } from "react-icons/fa";

const CoursesLanding: React.FC = () => {
  const { user } = useAuth();
  const [loader, setLoader] = useState(true);
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [enrollCourses, setEnrollCourses] = useState<CourseInterface[]>([]);

  useEffect(() => {
    // Fetch all courses
    requestHandler(
      async () => await getAllCourses(1, 8),
      setLoader,
      ({ data }) => {
        setCourses(data.courses);
      },
      () => (window.location.host = "/auth/login")
    );

    // Fetch enrolled courses
    requestHandler(
      async () => await getEnrollCourses(),
      setLoader,
      ({ data }) => {
        setEnrollCourses(data.enrollCourses);
      },
      () => (window.location.host = "/auth/login")
    );
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div className="w-full h-auto min-h-screen">
      <div className="w-full sm:px-12 px-3 py-12 custom-hero-bg ">
        <h1 className="custom-font text-xl font-light">Courses</h1>
        <p className="poppins text-2xl font-semibold">
          Welcome,{" "}
          {user?.username ? capitalizeFirstLetter(user.username) : "Guest"} to
          Our Courses{" "}
        </p>
      </div>
      {/* Continue Learning  */}
      <div className=" m-auto py-8">
        {enrollCourses.length > 0 && (
          <div className="w-full px-3 mb-3">
            <div className="w-full flex justify-between  items-center mb-2">
              <h2 className="custom-font md:text-2xl text-xl font-medium">
                Continue Learning
              </h2>
              <Link
                to="/dashboard/courses/all?show=my-enrollments"
                className="md:text-base text-sm   flex gap-1 items-center justify-start duration-200 ease-in-out group"
              >
                My Enrollments
                <FaLongArrowAltRight className=" transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
              </Link>
            </div>
            <HorizontalCard data={enrollCourses[enrollCourses.length - 1]} />
          </div>
        )}
        {/* End Continue Learning  */}
        {/* Our Courses Section  */}
        <CardSection label="Our Popular Courses" courses={courses} />
        {/* End Our Courses Section  */}
      </div>
    </div>
  );
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default CoursesLanding;
