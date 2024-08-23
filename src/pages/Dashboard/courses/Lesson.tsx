import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Loader, TabSection } from "../../../components";
import { IoVideocamOutline } from "react-icons/io5";
import { IoArrowBack, IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { useAuth } from "../../../context/auth.context";
import { useCourse } from "../../../context/course.context";

const Lesson = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { courseId, lessonId } = useParams();
  const {
    course,
    setLessonHandler,
    setCourseHandler,
    lesson,
    isEnrolled,
    isFavorite,
  } = useCourse();
  const { toggleCourseFavorites, addCourseToEnrollment } = useAuth();

  useEffect(() => {
    if (courseId) {
      setIsLoading(true);
      setCourseHandler(courseId).finally(() => {
        setIsLoading(false);
      });
    }
    if (courseId && lessonId) {
      setIsLoading(true);
      setLessonHandler(courseId, lessonId).finally(() => {
        setIsLoading(false);
      });
    }
  }, [courseId, lessonId]);

  const ellipsis =
    course?.title?.length && course.title.length > 30 ? "..." : "";

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full h-screen flex overflow-hidden relative">
      <div className="lg:w-[70%] h-full w-full overflow-y-scroll ">
        <div className="w-full flex justify-between items-center px-2 py-4 bg-neutral-900">
          <Link
            to={`/dashboard/courses/${courseId}`}
            className="flex gap-2 items-center text-base  hover:gap-3"
          >
            <IoArrowBack className="sm:text-base text-lg" />
            <div className="sm:flex hidden">
              {course?.title.slice(0, 30)}
              {ellipsis}
            </div>
          </Link>
          <div
            className="flex gap-2 items-center  text-lg cursor-pointer font-semibold"
            onClick={() => toggleCourseFavorites(courseId || "")}
          >
            {isFavorite ? <IoBookmark /> : <IoBookmarkOutline />}
            <p className="sm:text-sm text-xs uppercase text-center poppins font-medium">
              {isFavorite ? "Added to Favorites" : "Add to Favorites"}
            </p>
          </div>
        </div>
        <div className="w-full relative" style={{ paddingTop: "56.25%" }}>
          {isEnrolled ? (
            <div className="w-full absolute top-0 left-0 h-full">
              <iframe
                src={lesson?.video?.url}
                title={lesson?.title}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ) : (
            <div className="w-full absolute top-0 left-0 h-full bg-neutral-800 flex items-center py-5">
              <div className="w-full sm:px-6 px-3">
                <p className="sm:text-sm text-xs font-sans poppins uppercase text-neutral-300 mb-5">
                  <Link
                    to="/dashboard/courses"
                    className="text-orange-400 hover:underline sm:text-sm text-xs"
                  >
                    Learn
                  </Link>{" "}
                  / Course / {course?.title.slice(0, 15)}...
                </p>
                <h2 className="sm:text-4xl text-sm custom-font2 font-bold">
                  {lesson?.title}
                </h2>
                <p className="poppins sm:text-base text-xs  font-medium mb-2">
                  365 Days Validity
                </p>
                <Button
                  fullWidth={false}
                  onClick={async () => {
                    addCourseToEnrollment(courseId || "");
                  }}
                  size="small"
                >
                  Enroll For Free
                </Button>
              </div>
            </div>
          )}
        </div>
        {/* Tab Section  */}
        <TabSection />
      </div>
      <div className="w-[30%] lg:block hidden h-screen border-l-[1px] border-l-neutral-800 absolute top-0 right-0">
        <h2 className="sm:text-xl text-lg poppins font-medium px-1 my-2 ">
          Syllabus
        </h2>
        <div className="w-full h-[95%] mt-2 overflow-y-auto scroll-smooth">
          {course?.lessonTitles.map((lesson, idx) => (
            <Link
              key={idx}
              className={`px-2 py-5 cursor-pointer flex gap-2 items-top justify-start border-[1px] border-neutral-800 duration-200 ease-linear ${
                lesson?._id === lessonId
                  ? "bg-neutral-700"
                  : "hover:bg-neutral-700"
              }`}
              to={`/dashboard/courses/learn/${courseId}/lesson/${lesson._id}`}
            >
              <IoVideocamOutline className="text-xl text-neutral-200 font-bold" />
              <div>
                <h3 className=" poppins text-base text-white ">
                  {lesson.title}
                </h3>
                <p className=" text-sm text-neutral-300 custom-font">Video</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lesson;
