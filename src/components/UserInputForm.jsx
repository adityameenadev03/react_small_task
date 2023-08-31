import React, { useEffect, useState } from "react";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useField,
  useFormik,
  useFormikContext,
} from "formik";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
const UserInputForm = ({ editing }) => {
  const formik = useFormikContext();
  const { values, errors, touched, isSubmitting, isValid } = formik;
  console.log(formik);
  const [timeoutId, setTimeoutId] = useState(null);
  const [error, setError] = useState(null);

  const updateLocalState = (currentData) => {
    let id = currentData.personId;
    let formsArray = JSON.parse(localStorage.getItem("formsArray"));
    let index = formsArray.findIndex((item, i) => item.personId == id);
    formsArray.splice(index, 1, { ...currentData });
    localStorage.setItem("formsArray", JSON.stringify([...formsArray]));
  };
  const updateInfo = (currentData) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(setTimeout(() => updateLocalState(currentData), 1000));
  };

  console.log("isValid", error, isValid);

  useEffect(() => {
    if (editing && isValid) {
      updateInfo(values);
    }
  }, [values]);

  return (
    <>
      <Form>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <Field
          id="name"
          type="text"
          name="name"
          placeholder="Enter your Name"
        />

        {errors.name && touched.name ? (
          <div className="error">{errors.name}</div>
        ) : null}

        <label htmlFor="email" className="form-label">
          Email
        </label>
        <Field
          id="email"
          name="email"
          placeholder="Enter Your Email"
          type="email"
        />
        {errors.email && touched.email ? (
          <div className="error">{errors.email}</div>
        ) : null}
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <Field
          id="phone"
          name="phone"
          placeholder="Enter Your Phone Number"
          type="tel"
          maxLength={10}
        />
        {errors.phone && touched.phone ? (
          <div className="error">{errors.phone}</div>
        ) : null}

        <div
          role="group"
          aria-labelledby="my-radio-group"
          className="d-flex align-items-baseline justify-content-between w-75 ms-2 mt-2"
        >
          <span id="my-radio-group" className="form-label">
            Gender :
          </span>
          <label className="d-flex align-items-baseline">
            <span className="me-2">Male</span>
            <Field type="radio" name="gender" value="male" />
          </label>
          <label className="d-flex align-items-baseline">
            <span className="me-2">Female</span>
            <Field type="radio" name="gender" value="female" />
          </label>
          {errors.gender && touched.gender ? (
            <div className="error">{errors.gender}</div>
          ) : null}
        </div>
        <Button
          type="submit"
          className={
            isValid
              ? "bg-primary text-white mt-3"
              : "bg-primary text-white mt-3 opacity-25"
          }
          disabled={isSubmitting || (editing && !isValid)}
        >
          {editing ? "Save" : "Submit"}
        </Button>
      </Form>
    </>
  );
};

export default UserInputForm;
