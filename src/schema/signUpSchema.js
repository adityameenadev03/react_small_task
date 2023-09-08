import * as yup from "yup";
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .matches(emailRegex, "Please enter a valid email")
    .required("Email is Required"),
  password: yup.string().required("Phone number is Required"),
});
