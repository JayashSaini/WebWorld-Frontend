import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import {
  About,
  Dashboard,
  EmailVerification,
  EmailVerificationResult,
  ForgotPassword,
  Home,
  Login,
  Register,
  VerifyOTP,
} from "./pages";
import { PrivateRoute, PublicRoute } from "./components";
import ResetPassword from "./pages/auth/ResetPassword";

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

        <Route
          path="/auth/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/auth/verify-otp"
          element={
            <PublicRoute>
              <VerifyOTP />
            </PublicRoute>
          }
        />

        <Route
          path="/auth/reset-password/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/auth/email-verification"
          element={
            <PublicRoute>
              <EmailVerification />
            </PublicRoute>
          }
        />

        <Route
          path="/auth/email-verification/:token"
          element={
            <PublicRoute>
              <EmailVerificationResult />
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
