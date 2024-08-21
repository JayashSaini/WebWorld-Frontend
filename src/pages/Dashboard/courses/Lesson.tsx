import { useEffect, useState } from "react";
import {
  CourseDetailInterface,
  CourseLessonInterface,
} from "../../../interfaces";
import { requestHandler } from "../../../util";
import { getCourseById, getSyllabusById } from "../../../api";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loader, TabSection } from "../../../components";
import { IoVideocamOutline } from "react-icons/io5";
import { IoArrowBack, IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { useAuth } from "../../../context/auth.context";

const Lesson = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lesson, setLesson] = useState<CourseLessonInterface>();
  const [course, setCourse] = useState<CourseDetailInterface>();

  const { courseId, lessonId } = useParams();

  const { user, toggleCourseFavorites, addCourseToEnrollment } = useAuth();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isEnroll, setIsEnroll] = useState<boolean>(false);

  const ellipsis =
    course?.title?.length && course.title.length > 30 ? "..." : "";

  useEffect(() => {
    requestHandler(
      async () => await getSyllabusById(courseId || "", lessonId || ""),
      setIsLoading,
      ({ data }) => {
        setLesson(data);
      },
      (err) => {
        toast.error(err);
        window.location.href = "/";
      }
    );
    requestHandler(
      async () => await getCourseById(courseId || ""),
      setIsLoading,
      ({ data }) => {
        setCourse(data);
      },
      (err) => {
        toast.error(err);
        window.location.href = "/";
      }
    );
  }, [courseId, lessonId]);

  useEffect(() => {
    if (user) {
      isFavoriteHandler();
      isEnrollHandler();
    }
  }, [user, courseId]);

  const isFavoriteHandler = () => {
    const isFavorite = user?.favorites.find((id) => id === courseId);
    setIsFavorite(isFavorite == undefined ? false : true);
  };

  const isEnrollHandler = () => {
    const isEnroll = user?.enrollments.find((id) => id === courseId);
    setIsEnroll(isEnroll == undefined ? false : true);
  };

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
          {isEnroll ? (
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
                <h2 className="sm:text-4xl text-sm custom-font font-medium">
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
        <TabSection lesson={lesson} about={course?.about} isEnroll={isEnroll} />
      </div>
      <div className="w-[30%] lg:block hidden h-screen border-l-[1px] border-l-neutral-800 absolute top-0 right-0">
        <h2 className="sm:text-xl text-lg poppins font-medium px-1 my-2 ">
          Syllabus
        </h2>
        <div className="w-full h-full mt-2 overflow-y-auto scroll-smooth">
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
