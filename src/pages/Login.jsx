import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { signUpSchema } from "../schema/signUpSchema";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SET_ERROR, SET_USER } from "../redux/actions/action";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schema/loginSchema";
import { loginUser } from "../api/authApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkUseronDatabase = async (values, formikFunctions) => {
    try {
      dispatch(SET_USER_LOADING(true));
      dispatch(SET_USER_ERROR(false));
      const data = await loginUser("/user/loginUser", values);
      if (data) {
        dispatch(SET_USER(data));
        navigate("/");
      }
      // console.log("fetch from server", data);
      dispatch(SET_USER_LOADING(false));
      dispatch(SET_USER_ERROR(false));
    } catch (err) {
      dispatch(SET_USER_LOADING(false));
      dispatch(SET_USER_ERROR(err));
      if (err.message.toLowerCase().includes("password")) {
        formikFunctions.setErrors({ password: err.message });
      } else if (err.message.toLowerCase().includes("email")) {
        formikFunctions.setErrors({ email: err.message });
      }
      formikFunctions.setSubmitting(false);
    }
  };
  return (
    <>
      <Container className="w-50 min-vh-100 d-flex justify-content-center align-items-center ">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, formikFunctions) => {
            console.log(formikFunctions);
            checkUseronDatabase(values, formikFunctions);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form className="card">
              <Field
                type="email"
                name="email"
                className="ps-3 mb-2"
                placeholder="Enter your Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger mb-2 text-start ps-3 fs-7"
              />
              <Field
                type="password"
                name="password"
                className=" ps-3"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger mb-2 text-start ps-3 fs-7"
              />
              <Button
                type="submit"
                className="mt-3 "
                disabled={isSubmitting}
                variant="success"
              >
                Login
              </Button>

              <span className="text-center">
                If not signed up ,{" "}
                <Link to="/signup" className="text-decoration-none">
                  sign up here
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Login;
