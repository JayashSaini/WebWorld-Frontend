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
import Courses from "./Dashboard/Courses";

// blogs routes
import Blogs from "./Dashboard/blogs/blogs";
import AddBlogs from "./Dashboard/blogs/addBlog";
import MyBlogs from "./Dashboard/blogs/myBlogs";
import Blog from "./Dashboard/blogs/blog";
import Profile from "./Dashboard/Profile";
import Settings from "./Dashboard/Settings";

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
  Courses,
  Blogs,
  AddBlogs,
  MyBlogs,
  Blog,
  Profile,
  Settings,
};
