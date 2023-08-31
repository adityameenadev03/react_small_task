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
import UserInputForm from "../components/UserInputForm";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER } from "../actions/action";

const FormikForm2 = () => {
  const unique_id = uuid().slice(0, 8);
  const navigate = useNavigate();
  const location = useLocation();
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  console.log(ADD_USER);

  console.log("location", location.state);
  useEffect(() => {
    if (location.state != null) {
      setEditing(true);
    }
  }, []);

  const initialValues = location.state
    ? { ...location.state }
    : { name: "", email: "", phone: "", gender: null };

  return (
    <Card className="shadow-sm border-ligh-gray p-4 m-1 rounded">
      <Link
        className="button btn bg-primary text-white mb-4 pb-1 pt-1"
        to={"/"}
      >
        Go Home
      </Link>
      <Card className="border-white shadow-lg p-3 mb-3 bg-white rounded">
        <Formik
          initialValues={initialValues}
          validateOnMount:true
          onSubmit={(values, actions) => {
            if (editing) {
              navigate("/");
            } else {
              let done = dispatch(ADD_USER({ ...values, personId: unique_id }));
              if (done) {
                actions.resetForm();
                navigate("/");
              }
            }
          }}
          validationSchema={basicSchema}
        >
          {({ errors, touched, isSubmitting, isValid }) => (
            <UserInputForm
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
              isValid={isValid}
              editing={editing}
            ></UserInputForm>
          )}
        </Formik>
      </Card>
    </Card>
  );
};

export default FormikForm2;
