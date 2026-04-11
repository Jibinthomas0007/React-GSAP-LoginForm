import * as yup from "yup";

/* ================================
   🔹 Reusable Field Rules
================================ */

const usernameRule = yup
  .string()
  .trim()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username cannot exceed 20 characters")
  .required("Username is required");

const emailRule = yup
  .string()
  .trim()
  .email("Please enter a valid email address")
  .required("Email is required");

const phoneRule = yup
  .string()
  .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
  .required("Phone number is required");

const passwordRule = yup
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(32, "Password cannot exceed 32 characters")
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)/,
    "Password must contain at least one letter and one number"
  )
  .required("Password is required");

/* ================================
   🔹 Login Schema (Custom Messages)
================================ */

export const loginSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Enter username"), 
  password: yup
    .string()
    .required("Enter password"),    
});

/* ================================
   🔹 Register Schema (UNCHANGED)
================================ */

export const registerSchema = yup.object({
  username: usernameRule,
  email: emailRule,
  phone: phoneRule,
  password: passwordRule,

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});