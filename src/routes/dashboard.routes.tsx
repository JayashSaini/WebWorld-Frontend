import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Blog,
  Blogs,
  CourseList,
  CoursesLanding,
  MyBlogs,
  Profile,
  Settings,
} from "../pages";
import { PrivateRoute } from "../components";
import DashboardLayout from "../layouts/Dashboard.layout";
import AddBlog from "../pages/Dashboard/blogs/addBlog";

const DashboardRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index={true} path="/courses" element={<CoursesLanding />} />
      <Route path="/courses/all" element={<CourseList />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="/blogs" element={<Blogs />} />
      <Route path="/create-blog" element={<AddBlog />} />
      <Route path="/blogs/:blogId" element={<Blog />} />

      <Route path="/my-blogs" element={<MyBlogs />} />
    </Route>
  </Routes>
);

const DashboardRoutesWrapper: React.FC = () => (
  <PrivateRoute>
    <DashboardRoutes />
  </PrivateRoute>
);

export default DashboardRoutesWrapper;
