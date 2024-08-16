// Import necessary modules and utilities
import axios from "axios";
import { LocalStorage } from "../util/index.ts";
import { IFormInput } from "../interfaces/blog.ts";
import { ProfileInterface } from "../interfaces/index.ts";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
  timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = LocalStorage.get("token");
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// API functions for User actions
const loginUser = (data: { email: string; password: string }) => {
  return apiClient.post("/users/login", data);
};

const registerUser = (data: {
  email: string;
  username: string;
  password: string;
}) => {
  return apiClient.post("/users/register", data);
};

const logoutUser = () => {
  return apiClient.get("/users/logout");
};

const selfUser = () => {
  return apiClient.get("/users/self");
};

const forgotPasswordRequest = (email: string) => {
  return apiClient.post("/users/forgot-password", { email });
};

const verifyOTPRequest = (data: { email: string; otp: string }) => {
  return apiClient.post("/users/verify-otp", data);
};

const resetPasswordRequest = (data: {
  newPassword: string;
  confirmPassword: string;
  token: string;
}) => {
  return apiClient.post(`/users/reset-password/${data.token}`, {
    newPassword: data.newPassword,
    confirmPassword: data.confirmPassword,
  });
};

const resendEmailVerificationRequest = (email: string) => {
  return apiClient.post(`/users/resend-verify-email`, { email });
};

const verifyEmailRequest = (token: string) => {
  return apiClient.get(`/users/verify-email/${token}`);
};

const updateAvatar = (data: any) => {
  return apiClient.patch(`/users/update-avatar`, data);
};

const refreshAccessTokenRequest = () => {
  return apiClient.post(`/users/refresh-token`);
};
// profile routes
const updateProfile = (data: ProfileInterface) => {
  return apiClient.patch(`/profile`, data);
};

const getProfile = () => {
  return apiClient.get(`/profile`);
};

// blogs api's
const addBlog = (data: IFormInput) => {
  return apiClient.post("/blogs", data);
};

const getAllBlogs = (sortType = "trending", page = 1, limit = 6) => {
  return apiClient.get(
    `/blogs/?page=${page}&limit=${limit}&sortType=${sortType}`
  );
};

const getBlogById = (blogId: string) => {
  return apiClient.get(`/blogs/${blogId}`);
};

const deleteBlog = (blogId: string) => {
  return apiClient.delete(`/blogs/${blogId}`);
};

const getFavoritesBlog = (page = 1, limit = 6) => {
  return apiClient.get(`/b/likes/self/?page=${page}&limit=${limit}`);
};

const getMyBlogs = (page = 1, limit = 6) => {
  return apiClient.get(`/blogs/self/blogs/?page=${page}&limit=${limit}`);
};

const toggleBlogLike = (blogId: string) => {
  return apiClient.post(`/b/likes/${blogId}`);
};

//  courses endpoints

const getAllCourses = (page = 1, limit = 8) => {
  return apiClient.get(`/courses?page=${page}&limit=${limit}`);
};

const getEnrollCourses = () => {
  return apiClient.get(`/users/enrollment/`);
};

const getFavoritesCourses = () => {
  return apiClient.get(`/users/favorites/`);
};

const getCourseById = (courseId: string) => {
  return apiClient.get(`/courses/${courseId}`);
};

// Export all the API functions
export {
  loginUser,
  logoutUser,
  registerUser,
  selfUser,
  forgotPasswordRequest,
  verifyOTPRequest,
  resetPasswordRequest,
  resendEmailVerificationRequest,
  verifyEmailRequest,
  refreshAccessTokenRequest,
  addBlog,
  getAllBlogs,
  getBlogById,
  getFavoritesBlog,
  toggleBlogLike,
  getMyBlogs,
  deleteBlog,
  getProfile,
  updateProfile,
  updateAvatar,
  getAllCourses,
  getEnrollCourses,
  getFavoritesCourses,
  getCourseById,
};
