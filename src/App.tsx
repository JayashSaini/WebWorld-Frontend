import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { About, Dashboard, Home, Login, Register } from "./pages";
import { PrivateRoute, PublicRoute } from "./components";

function App() {
  return (
    <Routes>
      {/* Wrap all routes with Layout */}
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index={true} path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Auth routes */}
        <Route
          path="/auth/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/auth/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Secure Routes  */}

        <Route
          path="/learn"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
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
