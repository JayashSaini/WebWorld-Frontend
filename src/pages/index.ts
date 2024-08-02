import Home from "./Home";
import About from "./About";

// auth routes
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import EmailVerification from "./auth/EmailVerification";
import EmailVerificationHandler from "./auth/EmailVerificationHandler";
import ResetPassword from "./auth/ResetPassword";
import VerifyOTP from "./auth/VerifyOTP";
import SocialAuthCallback from "./auth/SocialAuthCallback";
import SocialAuthErrorHandler from "./auth/SocialAuthErrorHandler";

// dashboard routes
import Dashboard from "./Dashboard/Dashboard";

export {
  Home,
  About,
  Login,
  Register,
  ForgotPassword,
  VerifyOTP,
  ResetPassword,
  EmailVerification,
  EmailVerificationHandler,
  SocialAuthCallback,
  SocialAuthErrorHandler,
  Dashboard,
};
