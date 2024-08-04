import React from "react";
import { Route, Routes } from "react-router-dom";
import SiteLayout from "../layouts/site.layout";
import { About } from "../pages";

const SiteRoutesWrapper: React.FC = () => (
  <Routes>
    <Route path="/" element={<SiteLayout />}>
      <Route path="/about" element={<About />} />
    </Route>
  </Routes>
);

export default SiteRoutesWrapper;
