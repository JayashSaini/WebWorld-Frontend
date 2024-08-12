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

export const userResetPasswordSchema = yup
  .object({
    newPassword: yup
      .string()
      .trim()
      .required("Password is required")
      .min(8, "New Password must be at least 8 characters long"),
    confirmPassword: yup
      .string()
      .trim()
      .required("Confirm Password is required")
      .min(8, "Confirm Password must be at least 8 characters long")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  })
  .required();

export const userForgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .email("Email is invalid"),
  })
  .required();

export const userVerifyOTP = yup
  .object({
    otp: yup
      .string()
      .trim()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits long"),
  })
  .required();

export const blogSchema = yup.object().shape({
  heading: yup.string().required("Heading is required"),
  subHeading: yup.string().required("Subheading is required"),
  content: yup.string().required("Content is required"),
  blogCategory: yup.string().required("Category is required"),
  blogImage: yup
    .mixed<File>()
    .nullable()
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || value.size <= 5 * 1024 * 1024 // 5MB max
    )
    .test(
      "fileType",
      "Unsupported file type",
      (value) => !value || ["image/jpeg", "image/png"].includes(value.type) // Allowed types
    ),
});

export const profileSchema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .nullable() // Allow null values for optional fields
      .trim()
      .min(2, "First name must be at least 2 characters long"),
    lastName: yup
      .string()
      .nullable() // Allow null values for optional fields
      .trim()
      .min(2, "Last name must be at least 2 characters long"),
    email: yup
      .string()
      .nullable() // Allow null values for optional fields
      .trim()
      .email("Please enter a valid email address"),
    phoneNumber: yup
      .string()
      .nullable() // Allow null values for optional fields
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits long"),
  })
  .test(
    "at-least-one-field",
    "At least one field must be updated",
    function (value) {
      return Object.values(value).some(
        (field) => field !== null && field !== ""
      );
    }
  );
