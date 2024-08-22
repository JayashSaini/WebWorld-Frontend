import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { CourseLessonInterface } from "../../interfaces";
import { requestHandler } from "../../util";
import { getSyllabusById, toggleCourseLikeHandler } from "../../api";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";

interface AboutCourseProps {
  about?: string;
  courseId?: string;
  lessonId?: string;
}
const AboutCourse: React.FC<AboutCourseProps> = ({
  courseId,
  lessonId,
  about,
}) => {
  const [lesson, setLesson] = useState<CourseLessonInterface>();
  const [isLoading, setIsLoading] = useState(false);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState<number | undefined>(0);
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
  }, []);

  useEffect(() => {
    setIsUserLiked(lesson?.isUserLiked || false);
    setTotalLikes(lesson?.totalLikes || 0);
  }, [lesson]);

  const handleLikeToggle = async () => {
    if (isUserLiked) {
      setTotalLikes((prevLikes) => (prevLikes ? prevLikes - 1 : 0));
    } else {
      setTotalLikes((prevLikes) => (prevLikes ? prevLikes + 1 : 1));
    }
    setIsUserLiked((prev) => !prev);
    await requestHandler(
      async () => await toggleCourseLikeHandler(lesson?._id || ""),
      null,
      () => {},
      () => {}
    );
  };

  return isLoading ? (
    <div className="w-full h-[500px] flex justify-center items-center custom-main-bg">
      <TailSpin
        visible={true}
        height="30"
        width="30"
        color="#fff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  ) : (
    <>
      <h2 className="sm:text-2xl text-base font-medium">{lesson?.title}</h2>
      <p className="text-sm font-light mt-1 custom-color">
        {lesson?.subHeading}
      </p>

      <div className="inline-block my-2 ">
        <label
          className="flex gap-4 items-center  poppins"
          htmlFor="like-checkbox"
        >
          <div onClick={handleLikeToggle} className="cursor-pointer text-xl">
            {isUserLiked ? <AiFillLike /> : <AiOutlineLike />}
          </div>
          <span className="text-neutral-300 text-lg">{totalLikes}</span>
        </label>
      </div>
      <h3 className="sm:text-xl text-base font-medium custom-font mt-3">
        About This Course
      </h3>
      <p className="text-sm font-light mt-1 ">{about}</p>
    </>
  );
};

export default AboutCourse;
