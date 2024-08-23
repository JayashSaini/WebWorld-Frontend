import React, { useEffect, useState } from "react";
import { CourseDetailInterface } from "../../interfaces";
import { VscAdd, VscCheck } from "react-icons/vsc";
import Button from "../Button";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useCourse } from "../../context/course.context";
interface CardProps {
  data: CourseDetailInterface | null;
}

const EnrollmentCard: React.FC<CardProps> = ({ data }) => {
  const { addCourseToEnrollment } = useAuth();
  const { isEnrolled } = useCourse();
  const navigate = useNavigate();

  return (
    <div
      className="w-full custom-secondary-bg  inline-block  px-4 py-6 rounded-md cursor-pointer group 
  "
    >
      <div className="w-full overflow-hidden cursor-pointer rounded-md">
        <img
          src={data?.thumbnail.url}
          alt="react"
          className="w-full  group-hover:scale-105 duration-200 ease-in-out rounded-md"
        />
      </div>
      <div className="mt-2">
        <p className="flex gap-1 items-center justify-start text-sm mb-1">
          <VscAdd className="text-base" /> 365 Days Validity
        </p>
        <Button
          onClick={async () => {
            if (!isEnrolled) {
              addCourseToEnrollment(data?._id || "");
            }
            navigate(
              `/dashboard/courses/learn/${data?._id}/lesson/${data?.lessonTitles[0]._id}`
            );
          }}
        >
          {isEnrolled ? "Go to Lessons" : "Enroll For Free"}
        </Button>
        <hr className="border-gray-700 my-6" />
        <h3 className="text-base font-medium mb-3  custom-font">
          What's Included &nbsp;
        </h3>
        <div className="flex gap-2 items-center">
          <VscAdd className="text-sm text-gray-400" />
          <div>
            <p className="text-sm font-light text-white">
              {data?.syllabus.length} Lessons
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <VscCheck className="text-sm text-gray-400" />
          <div>
            <p className="text-sm font-light text-white">
              Online Accessibility
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCard;
