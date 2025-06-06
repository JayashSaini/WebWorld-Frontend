import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EnrollmentCard, Loader } from "../../../components";
import { IoVideocamOutline } from "react-icons/io5";
import { useCourse } from "../../../context/course.context";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { course, setCourseHandler } = useCourse();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      setCourseHandler(courseId).finally(() => {
        setIsLoading(false);
      });
    }
  }, [courseId]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full min-h-screen h-full sm:px-14 px-2">
      <div className="flex flex-col sm:flex-row sm:gap-4 gap-1 sm:py-6 py-3">
        {/* <!-- Left Container 1 --> */}
        <div className="sm:w-3/5 w-full sm:flex sm:flex-col">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm font-sans poppins uppercase text-neutral-300">
              <Link
                to="/dashboard/courses"
                className="text-orange-400 hover:underline"
              >
                Learn
              </Link>{" "}
              / Course / {course?.title.slice(0, 15)}...
            </p>
            <h2 className="sm:text-4xl text-2xl custom-font2 font-bold sm:mt-10 mt-5">
              {course?.title}
            </h2>
            <h2 className="sm:text-lg text-sm mt-1 text-neutral-200">
              {course?.subTitle}
            </h2>
          </div>
          {/* <!-- Right Container (positioned between left containers on small screens) --> */}
          <div className="sm:hidden">
            <EnrollmentCard data={course} />
          </div>
          {/* <!-- Left Container 2 --> */}
          <div>
            <h2 className="sm:text-xl text-lg  poppins font-medium sm:mt-10 mt-5">
              Syllabus
            </h2>
            <div className="w-full sm:h-[500px] h-[300px] border-neutral-700 border-[1px] neutral rounded-xl mt-2 scroll-smooth overflow-y-scroll">
              {course?.lessonTitles.map((lesson, idx) => (
                <Link
                  key={idx}
                  className={`px-3 py-6 cursor-pointer flex gap-2 items-top justify-start border-[1px] border-neutral-800 duration-200 ease-linear ${
                    idx === 0 ? "bg-neutral-700" : "hover:bg-neutral-700"
                  }`}
                  to={`/dashboard/courses/learn/${course?._id}/lesson/${lesson._id}`}
                >
                  <IoVideocamOutline className="sm:text-xl text-lg text-neutral-200 font-bold" />
                  <div>
                    <h3 className="sm:text-base poppins text-sm text-white ">
                      {lesson.title}
                    </h3>
                    <p className="sm:text-sm text-xs text-neutral-300 custom-font">
                      Video
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <h2 className="sm:text-2xl text-xl custom-font font-medium mt-5">
              About this Course
            </h2>
            <p className="sm:text-base text-sm mt-1 text-neutral-200">
              {course?.about}
            </p>
          </div>
        </div>

        {/* <!-- Right Container (positioned to the right of both left containers on larger screens) --> */}
        <div className=" w-full  h-fit hidden  sm:w-2/5 sm:flex ">
          <EnrollmentCard data={course} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
