import React, { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { CourseLessonInterface } from "../../interfaces";
import { requestHandler } from "../../util";
import { toggleCourseLikeHandler } from "../../api";

interface AboutCourseProps {
  lesson?: CourseLessonInterface;
  about?: string;
}
const AboutCourse: React.FC<AboutCourseProps> = ({ lesson, about }) => {
  const [isUserLiked, setIsUserLiked] = useState(lesson?.isUserLiked);
  const [totalLikes, setTotalLikes] = useState<number | undefined>(
    lesson?.totalLikes || 0
  );

  const handleLikeToggle = async () => {
    if (isUserLiked) {
      setTotalLikes((prevLikes) => (prevLikes ? prevLikes - 1 : 0));
    } else {
      setTotalLikes((prevLikes) => (prevLikes ? prevLikes + 1 : 1));
    }
    await requestHandler(
      async () => await toggleCourseLikeHandler(lesson?._id || ""),
      null,
      () => {},
      () => {}
    );
    setIsUserLiked(!isUserLiked);
  };

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
