import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { signUpSchema } from "../schema/signUpSchema";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "../redux/actions/action";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schema/loginSchema";
import { loginUser } from "../api/authApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkUseronDatabase = async (values) => {
    try {
      const data = await loginUser("/login", values);
      if (data) {
        dispatch(SET_USER(data));
        navigate("/");
      }
      console.log("fetch from server", data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Container className="w-50 min-vh-100 d-flex justify-content-center align-items-center ">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            checkUseronDatabase(values);
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