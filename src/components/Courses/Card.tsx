import React from "react";

interface CardProps {
  data: {
    title: string;
    thumbnail: string;
    lessons: number;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div
      className="sm:w-[320px] w-[270px] bg-[#2222228f] h-auto inline-block border-[1px] border-[#ffffff57] px-4 py-6 rounded-md cursor-pointer select-none 
  "
    >
      <div className="w-full sm:h-52 h-40 overflow-hidden cursor-pointer rounded-md">
        <img
          src={data.thumbnail}
          alt="react"
          className="w-full h-full hover:scale-105 duration-200 ease-in-out rounded-md"
        />
      </div>
      <div className="mt-2">
        <h3 className="custom-font sm:text-lg text-base  w-[90%] font-light">
          {data.title}
        </h3>
        <p className="text-sm font-light text-gray-300">
          Lessons &nbsp;
          {data.lessons}
        </p>
      </div>
    </div>
  );
};

export default Card;
