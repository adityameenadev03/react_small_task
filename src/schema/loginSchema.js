import * as yup from "yup";
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "Please enter a valid email")
    .required("Email is Required"),
  password: yup.string().required("Password number is Required"),
});
