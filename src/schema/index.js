import * as yup from "yup";

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
// const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/i;
const phoneRegex = "[6-9]{1}[0-9]{9}"
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const basicSchema = yup.object().shape({

  name: yup.string().required("Name is Required"),
  email: yup.string().matches(emailRegex,"Please enter a valid emaillll").required("Email is Required"),
  // .matches(phoneRegex,"Please enter a valid phone")
  phone: yup.string().matches(phoneRegex,"Please enter a valid Phone").required("Phone number is Required"),
  gender:yup.string().required("Selecting Gender is must ")
  
});
