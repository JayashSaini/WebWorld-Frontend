import * as yup from "yup";

// Defining validation userLoginSchema with Yup
export const userLoginSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .email("Email is invalid"),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();

// Defining validation userRegisterSchema with Yup
export const userRegisterSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .email("Email is invalid"),
    username: yup
      .string()
      .trim()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters long"),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();
