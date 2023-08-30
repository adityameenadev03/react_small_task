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
import { basicSchema } from "../schema/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import UserDetailForm from "../components/userDetailForm";

const FormikForm2 = () => {
  const unique_id = uuid().slice(0, 8);
  const navigate = useNavigate();
  const location = useLocation();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (location.state != null) {
      let currentArray = location.state;
      setEditing(true);
    }
  }, []);

  console.log(editing);

  const handleSubmit = (values, actions) => {
    const dataArray = JSON.parse(localStorage.getItem("formsArray")) || [];

    if (editing) {
      // console.log("hello");
      // updateInfo(values);
      navigate("/");
    } else {
      dataArray.push({ ...values, personId: unique_id });
    }
    localStorage.setItem("formsArray", JSON.stringify(dataArray));
    actions.resetForm();
    navigate("/");
  };

  const initialValues = location.state
    ? { ...location.state }
    : { name: "", email: "", phone: "", gender: null };
  return (
    <Card className="shadow-sm border-ligh-gray p-4 m-1 rounded">
      <Link className="button btn bg-primary text-white mb-4   " to={"/"}>
        <h4 className="alalign-baseline">Go Home</h4>
      </Link>
      <Card className="border-white shadow-lg p-3 mb-3 bg-body rounded">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={basicSchema}
        >
          {({ errors, touched, isSubmitting, isValid, values }) => (
            <UserDetailForm
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
              isValid={isValid}
              values={values}
              editing={editing}
            ></UserDetailForm>
          )}
        </Formik>
      </Card>
    </Card>
  );
};

export default FormikForm2;
