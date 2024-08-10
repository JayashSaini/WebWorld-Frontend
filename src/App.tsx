import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AuthRoutesWrapper from "./routes/auth.routes";
import DashboardRoutesWrapper from "./routes/dashboard.routes";
import { Home } from "./pages";
import SiteRoutesWrapper from "./routes/site.routes";

function App() {
  return (
    <Routes>
      {/* Wrap all routes with Layout */}
      <Route path="/" element={<Layout />}>
        {/* site routes */}
        <Route index={true} path="/" element={<Home />} />

        {/* Site routes  */}
        <Route path="/site/*" element={<SiteRoutesWrapper />} />

        {/* Auth routes */}
        <Route path="/auth/*" element={<AuthRoutesWrapper />} />

        {/* Dashboard routes */}
        <Route path="/dashboard/*" element={<DashboardRoutesWrapper />} />

        {/* 404 page */}
        <Route
          path="*"
          element={
            <div className="w-full h-screen flex items-center justify-center">
              <h1 className="text-lg">404 Page not found | Not Design yet</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
