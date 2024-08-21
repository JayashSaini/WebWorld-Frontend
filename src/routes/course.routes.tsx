import React from "react";
import { Route, Routes } from "react-router-dom";
import CourseLayout from "../layouts/Course.layout";
import { CourseDetails, CourseList, CoursesLanding, Lesson } from "../pages";

const CourseRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CourseLayout />}>
      <Route index={true} path="/" element={<CoursesLanding />} />
      <Route path="/all" element={<CourseList />} />
      <Route path="/:courseId" element={<CourseDetails />} />
      <Route path="/learn/:courseId/lesson/:lessonId" element={<Lesson />} />
    </Route>
  </Routes>
);

export default CourseRoutes;
