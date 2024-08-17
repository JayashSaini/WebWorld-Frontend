import React from "react";
import { Route, Routes } from "react-router-dom";
import CourseLayout from "../layouts/Course.layout";
import { CourseDetails, CourseList, CoursesLanding } from "../pages";

const CourseRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CourseLayout />}>
      <Route index={true} path="/" element={<CoursesLanding />} />
      <Route path="/all" element={<CourseList />} />
      <Route path="/:courseId" element={<CourseDetails />} />
    </Route>
  </Routes>
);

export default CourseRoutes;
