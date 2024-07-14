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
