// src/routes/auth.routes.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  ForgotPassword,
  VerifyOTP,
  ResetPassword,
  EmailVerification,
  EmailVerificationHandler,
  SocialAuthCallback,
  SocialAuthErrorHandler,
} from "../pages";
import { PublicRoute } from "../components";
import AuthLayout from "../layouts/Auth.layout";

const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route
        path="/email-verification/:token"
        element={<EmailVerificationHandler />}
      />
      <Route
        path="/google/:accessToken/:refreshToken"
        element={<SocialAuthCallback />}
      />
      <Route path="/google/error" element={<SocialAuthErrorHandler />} />
    </Route>
  </Routes>
);

const AuthRoutesWrapper: React.FC = () => (
  <PublicRoute>
    <AuthRoutes />
  </PublicRoute>
);

export default AuthRoutesWrapper;
