import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { basicSchema } from "../schema/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import UserInputForm from "../components/UserInputForm";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER, EDIT_USER, addUser, editUser } from "../actions/action.js";

const FormikForm2 = () => {
  const unique_id = uuid().slice(0, 8);
  const navigate = useNavigate();
  const location = useLocation();
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

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
              console.log("values", values);
              dispatch(editUser({ ...values, personId: unique_id }));
              navigate("/");
            } else {
              // dispatch(ADD_USER({ ...values, personId: unique_id }));
              dispatch(addUser({ ...values, personId: unique_id }));
              actions.resetForm();
              navigate("/");
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
