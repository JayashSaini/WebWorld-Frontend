import { CardSection, HorizontalCard, Loader } from "../../../components";
import React, { useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllCourses, getEnrollCourses } from "../../../api";
import { CourseInterface } from "../../../interfaces";
import { useAuth } from "../../../context/auth.context";

const CoursesLanding: React.FC = () => {
  const { user } = useAuth();
  const [loader, setLoader] = React.useState(true);
  const [courses, setCourses] = React.useState<CourseInterface[]>([]);
  const [enrollCourses, setEnrollCourses] = React.useState<CourseInterface[]>(
    []
  );

  useEffect(() => {
    setLoader(true);
    getAllCourses(1, 8)
      .then(({ data }) => {
        setCourses(data.data.courses);
      })
      .catch((err) => console.log(err));
    getEnrollCourses()
      .then(({ data }) => {
        setEnrollCourses(data.data.enrollCourses);
      })
      .catch((err) => console.log(err));
    setLoader(false);
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div className="w-full min-h-screen h-full">
      <div className="w-full sm:px-12 px-3 py-12 custom-hero-bg ">
        <h1 className="custom-font text-xl font-light">Courses</h1>
        <p className="poppins text-2xl font-semibold">
          Welcome,{" "}
          {user?.username ? capitalizeFirstLetter(user.username) : "Guest"} to
          Our Courses{" "}
        </p>
      </div>
      {/* Continue Learning  */}
      <div className="max-w-screen-2xl m-auto py-8">
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
