import React, { useEffect, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import { basicSchema } from "../schema/index";
import { Link, useLocation, useNavigate } from "react-router-dom";

const FormikForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onSubmit = (values, actions) => {
    let dataArray = JSON.parse(localStorage.getItem("formsArray"));
    dataArray.push({ ...values, personId: dataArray.length + 1 });
    localStorage.setItem("formsArray", JSON.stringify(dataArray));
    actions.resetForm();
    navigate("/");
  };
  const {
    values,
    errors,
    touched,
    setValues,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: null,
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(false);

  useEffect(() => {
    if (location.state != null) {
      let currentArray = location.state;
      setEditing(true);
      setEditingId(currentArray.personId);
      setValues({ ...currentArray });
    }
  }, []);

  const updateInfo = (id) => {
    let formsArray = JSON.parse(localStorage.getItem("formsArray"));
    let index = formsArray.findIndex((item, i) => item.personId == id);
    formsArray.splice(index, 1, { ...values });
    localStorage.setItem("formsArray", JSON.stringify([...formsArray]));
    console.log(formsArray);
    navigate("/");
  };
  return (
    <>
      <Link
        className="button btn bg-primary text-white mb-4 pb-1 pt-1"
        to={"/"}
      >
        Go Home
      </Link>
      <div className="card mb-0 text-bg-light pb-0">
        <h2>Enter Your details</h2>

    
        <form
          action=""
          // onSubmit={handleChange}
          className="input mb-1"
        >
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Name
            </label>
            <input
              type="text"
              required
              value={values.name}
              className={
                errors.name && touched.name
                  ? "form-control input-error"
                  : "form-control"
              }
              onChange={handleChange}
              id="name"
              placeholder="Enter Your Name"
            />
            {errors.name && touched.name && (
              <p className="error">{errors.name}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Email
            </label>
            <input
              type="text"
              value={values.email}
              //   onFocus={() => setError(false)}
              onChange={handleChange}
              className={
                errors.email && touched.email
                  ? "form-control input-error"
                  : "form-control"
              }
              id="email"
              placeholder="Enter Your Email"
            />
            {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              value={values.phone}
              onChange={handleChange}
              className={
                errors.phone && touched.phone
                  ? "form-control input-error"
                  : "form-control"
              }
              id="phone"
              minLength={10}
              maxLength={10}
              //   pattern="[6-9]{1}[0-9]{9}"
              placeholder="Enter Your Phone"
            />
            {errors.phone && touched.phone && (
              <p className="error">{errors.phone}</p>
            )}
          </div>
          <div className="mb-3 d-flex flex-row ">
            <span className="pe-4">Gender :</span>
              <div className="d-flex flex-row">
                <label htmlFor="gender" className="form-label m-0">
                  Male
                </label>
                <input
                  type="radio"
                  required
                  className={
                    errors.gender && touched.gender
                      ? "me-3 input-error"
                      : "me-3 p-1"
                  }
                  checked={values.gender === "male"}
                  onChange={handleChange}
                  id="gender"
                  value="male"
                />
              </div>
              <div className="d-flex flex-row ">
                <label htmlFor="gender" className="form-label m-0">
                  Female 
                </label>
                <input
                  type="radio"
                  className={
                    errors.gender && touched.gender
                      ? "me-3 input-error"
                      : ""
                  }
                  checked={values.gender === "female"}
                  onChange={handleChange}
                  id="gender"
                  value="female"
                ></input>
              
              </div>
              {errors.gender && touched.gender && (
                  <p className="error">{errors.gender}</p>
                )}
          </div>

          <p type="button">
            {editing ? (
              <button
                className="button btn bg-success text-white pb-1 pt-1"
                onClick={() => updateInfo(editingId)}
              >
                Save
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="button btn bg-success text-white pb-1 pt-1"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </p>
        </form>
      </div>
    </>
  );
};

export default FormikForm;
