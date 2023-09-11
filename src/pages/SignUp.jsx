import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { signUpSchema } from "../schema/signUpSchema";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "../redux/actions/action";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/authApi";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveUseronDatabase = async (values) => {
    try {
      const data = await signupUser("/user/signupUser", values);
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
          validationSchema={signUpSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            saveUseronDatabase(values);
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
                type="text"
                name="name"
                className="mb-2 ps-3"
                placeholder="Enter your Name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger mb-2 text-start ps-3 fs-7"
              />
              <Field
                type="email"
                name="email"
                className="mb-2 ps-3"
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
                className="mb-2 ps-3"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger mb-2 text-start ps-3 fs-7"
              />
              <Button
                type="submit"
                className=" mt-3"
                disabled={isSubmitting}
                variant="success"
              >
                SignUp
              </Button>
              <span className="text-center ">
                Already a user
                <Link to="/login" className="text-decoration-none">
                  Login here
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default SignUp;
