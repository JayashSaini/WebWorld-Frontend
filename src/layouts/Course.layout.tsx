import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CourseFooter, CourseHeader } from "../components";

const CourseLayout: React.FC = () => {
  const location = useLocation();

  // Check if the current path includes '/courses/lesson'
  const isLessonPath = location.pathname.includes("/courses/learn");

  return (
    <div className="w-full h-auto">
      {/* Conditionally render Header and Footer based on the path */}
      {!isLessonPath && <CourseHeader />}
      <Outlet />
      {!isLessonPath && <CourseFooter />}
    </div>
  );
};

export default CourseLayout;
