import React from "react";
import { Route, Routes } from "react-router-dom";
import { Blogs, Courses } from "../pages";
import { PrivateRoute } from "../components";
import DashboardLayout from "../DashboardLayout";

const DashboardRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index={true} path="/courses" element={<Courses />} />
      <Route path="/blogs" element={<Blogs />} />
    </Route>
  </Routes>
);

const DashboardRoutesWrapper: React.FC = () => (
  <PrivateRoute>
    <DashboardRoutes />
  </PrivateRoute>
);

export default DashboardRoutesWrapper;
