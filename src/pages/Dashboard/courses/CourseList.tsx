import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HorizontalCard, Loader } from "../../../components";
import {
  getAllCourses,
  getCoursesByQuery,
  getEnrollCourses,
  getFavoritesCourses,
} from "../../../api";
import { CourseInterface } from "../../../interfaces";
import { toast } from "sonner";

const CourseList: React.FC = () => {
  const [loader, setLoader] = React.useState(true);
  const location = useLocation(); // Access the location object
  const queryParams = new URLSearchParams(location.search); // Create an instance of URLSearchParams
  const showParam = queryParams.get("show"); // Get the 'show' query parameter value
  const query = queryParams.get("query");
  const [courses, setCourses] = React.useState<CourseInterface[]>([]);

  useEffect(() => {
    setLoader(true);
    if (showParam == "my-enrollments") {
      getEnrollCourses()
        .then(({ data }) => {
          setCourses(data.data.enrollCourses);
        })
        .catch((err) => console.log(err));
    } else if (showParam == "favorites") {
      getFavoritesCourses()
        .then(({ data }) => {
          setCourses(data.data.favoriteCourses);
        })
        .catch((err) => console.log(err));
    } else if (showParam == "search-results") {
      if (query) {
        getCoursesByQuery(query)
          .then(({ data }) => {
            setCourses(data.data.courses);
          })
          .catch((err) => console.log(err));
      } else toast.error("Please enter a search query");
    } else {
      getAllCourses(1, 100)
        .then(({ data }) => {
          setCourses(data.data.courses);
        })
        .catch((err) => console.log(err));
    }
    setLoader(false);
  }, [query]);

  const label = convertToHumanReadable(showParam);
  return loader ? (
    <Loader />
  ) : (
    <div className="w-full min-h-screen h-auto">
      <div className="w-full sm:px-12 px-3 sm:py-16 py-12 custom-hero-secondary-bg ">
        <h1 className="custom-font sm:text-4xl text-3xl font-medium">
          {label}
        </h1>
      </div>
      <div className="p-3 max-w-screen-2xl m-auto">
        <p className="text-base font-sans custom-font text-neutral-300">
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
            Courses
            <span className="text-white text-xs p-2 bg-neutral-800 rounded-full">
              {courses.length < 10 ? "0" + courses.length : courses.length}{" "}
            </span>
          </h2>
          {courses.length > 0 ? (
            <div className="w-full min-h-[600px] max-h-[1000px] border-neutral-700 border-[1px] rounded-xl mt-2  overflow-y-scroll">
              {courses.map((course) => (
                <div key={course._id}>
                  <HorizontalCard data={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-[600px] border-neutral-700 border-[1px] rounded-md flex justify-center items-center text-white">
              No Course here.{" "}
            </div>
          )}
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
