import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useCourse } from "../../context/course.context";

const AboutCourse: React.FC = () => {
  const { lesson, course, ToggleLikedHandler, isUserLiked, totalLikes } =
    useCourse();

  return (
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
          <div
            onClick={() => {
              ToggleLikedHandler(lesson?._id || "");
            }}
            className="cursor-pointer text-xl"
          >
            {isUserLiked ? <AiFillLike /> : <AiOutlineLike />}
          </div>
          <span className="text-neutral-300 text-lg">{totalLikes}</span>
        </label>
      </div>
      <h3 className="sm:text-xl text-base font-medium custom-font mt-3">
        About This Course
      </h3>
      <p className="text-sm font-light mt-1 ">{course?.about}</p>
    </>
  );
};

export default AboutCourse;
