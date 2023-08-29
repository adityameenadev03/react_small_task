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
import { v4 as uuid } from 'uuid';

const FormikForm2 = () => {
  const unique_id = uuid().slice(0,8);
  const navigate = useNavigate();
  const location = useLocation();
  const [editing, setEditing] = useState(false);


  useEffect(() => {
    if (location.state != null) {
      let currentArray = location.state;
      setEditing(true);
    }
  }, []);

  const updateInfo = (currentData) => {
    let id = currentData.personId;
    let formsArray = JSON.parse(localStorage.getItem("formsArray"));
    let index = formsArray.findIndex((item, i) => item.personId == id);
    formsArray.splice(index, 1, { ...currentData });
    localStorage.setItem("formsArray", JSON.stringify([...formsArray]));
    console.log(formsArray);
    navigate("/");
  };

  return (
    <Card className="shadow-sm border-ligh-gray p-4 m-1 rounded">
      <Link
        className="button btn bg-primary text-white mb-4 pb-1 pt-1"
        to={"/"}
      >
        Go Home
      </Link>
      <Card
        className="border-white shadow-lg p-3 mb-3 bg-white rounded"
      >
        <Formik
          initialValues={
            location.state != null
              ? location.state
              : { name: "", email: "", phone: "", gender: null }
          }
          onSubmit={(values, actions) => {
            let dataArray = JSON.parse(localStorage.getItem("formsArray"));
            dataArray.push({ ...values, personId: unique_id });
            localStorage.setItem("formsArray", JSON.stringify(dataArray));
            actions.resetForm();
            navigate("/");
            console.log(values);
          }}
          validationSchema={basicSchema}
        >
          {({ errors, touched, isSubmitting, isValid, values }) => (
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
            
              <div role="group" aria-labelledby="my-radio-group" className="d-flex align-items-baseline justify-content-between w-75 ms-2 mt-2">
              <span id="my-radio-group" className="form-label">
                Gender : 
              </span>
                <label  className="d-flex align-items-baseline">
                <span className="me-2">Male</span>
                  <Field type="radio" name="gender" value="male" />
                 
                </label>
                <label  className="d-flex align-items-baseline">
                <span className="me-2">Female</span>
                  <Field type="radio" name="gender" value="female" />
                  
                </label>
                {errors.gender && touched.gender ? (
                  <div className="error">{errors.gender}</div>
                ) : null}
              </div>
              {editing ? (
                <Button
                  className="bg-primary text-white mt-3"
                  onClick={() => updateInfo(values)}
                  disabled={isValid ? false : true}
                >
                  Save
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-primary text-white mt-3"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </Card>
    </Card>
  );
};

export default FormikForm2;
