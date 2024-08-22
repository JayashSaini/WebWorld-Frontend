import React from "react";
import { CourseInterface } from "../../interfaces";
import { useNavigate } from "react-router-dom";

interface CardProps {
  data: CourseInterface;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="sm:w-[320px] w-[270px] bg-[#2222228f] sm:h-[330px] h-[290px] inline-block border-[1px] border-neutral-700 px-4 py-7 rounded-md cursor-pointer select-none "
      onClick={() => {
        navigate("/dashboard/courses/" + data?._id);
      }}
    >
      <div className="w-full sm:h-52 h-40 overflow-hidden cursor-pointer rounded-md">
        <img
          src={data.thumbnail.url}
          alt="react"
          className="w-full h-full hover:scale-105 duration-200 ease-in-out rounded-md"
        />
      </div>
      <div className="mt-2">
        <h3 className="custom-font2  text-base  w-[90%] font-semibold">
          {data.title.slice(0, 55)}
          {data.title.length > 55 ? "..." : ""}
        </h3>
        <p className="text-sm font-light text-gray-300">
          Lessons &nbsp;
          {data.syllabus.length}
        </p>
      </div>
    </div>
  );
};

export default Card;
