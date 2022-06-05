import * as Yup from "yup";

export const signupvalidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(255, "Full name must be less than 255 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid")
    .max(255, "Email must be less than 255 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must be less than 255 characters"),
});
