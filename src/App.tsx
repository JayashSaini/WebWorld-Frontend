import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { About, Home } from "./pages";
import AuthRoutesWrapper from "./routes/auth.routes";
import DashboardRoutesWrapper from "./routes/dashboard.routes";

function App() {
  return (
    <Routes>
      {/* Wrap all routes with Layout */}
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index={true} path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Auth routes */}
        <Route path="/auth/*" element={<AuthRoutesWrapper />} />

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
