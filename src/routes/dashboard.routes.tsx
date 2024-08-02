import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages";
import { PrivateRoute } from "../components";

const DashboardRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
);

const DashboardRoutesWrapper: React.FC = () => (
  <PrivateRoute>
    <DashboardRoutes />
  </PrivateRoute>
);

export default DashboardRoutesWrapper;
