import { Outlet } from "react-router-dom";
import { CourseFooter, CourseHeader } from "../components";

const CourseLayout = () => {
  return (
    <div className="w-full h-auto ">
      {/* Header section */}
      <CourseHeader />
      <Outlet />
      {/* Footer  */}
      <CourseFooter />
    </div>
  );
};

export default CourseLayout;
