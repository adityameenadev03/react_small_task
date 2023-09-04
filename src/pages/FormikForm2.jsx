import React, { useEffect, useState } from "react";
import { Formik, useFormik, useFormikContext } from "formik";
import { basicSchema } from "../schema/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Container, ToastContainer } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import UserInputForm from "../components/UserInputForm";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER, EDIT_USER, addUser, editUser } from "../actions/action.js";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const addUserApi = (data) => {
  return axios
    .post("http://localhost:8000/addUser", {
      ...data,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const editUserApi = (data) => {
  return axios
    .put("http://localhost:8000/editUser", {
      ...data,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const FormikForm2 = () => {
  const unique_id = uuid().slice(0, 8);
  const navigate = useNavigate();
  const location = useLocation();
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const notify = (error) => toast.error(error?.message);
  const successNotification = (message) => toast.success(message);

  useEffect(() => {
    if (location.state != null) {
      setEditing(true);
    }
  }, []);

  const { mutate, data, isLoading, isError } = useMutation(addUserApi, {
    onSuccess: (data) => {
      console.log("User succesfully Added", data?.data?.data);
      dispatch(ADD_USER({ ...data?.data?.data }));
      successNotification("User succesfully Added");
    },
    onError: (error) => {
      const { name, message } = error;
      notify({ name, message });
    },
  });

  const { mutate: mutatefn } = useMutation(editUserApi, {
    onSuccess: (data) => {
      console.log("User succesfully Edited");
      console.log(data?.data?.data);
      dispatch(EDIT_USER({ ...data?.data?.data }));
      successNotification("User succesfully Edited");
    },
    refetchQueries: [{ query: "allUsers" }],
    onError: (error) => {
      const { name, message } = error;
      notify({ name, message });
    },
  });

  console.log(data);
  // const postUser = (data) => {
  //   mutate()
  // }

  const initialValues = location.state
    ? { ...location.state }
    : { name: "", email: "", phone: "", gender: null };

  return (
    <Container className="d-flex justify-content-center ">
      {!isError && !isLoading && (
        <div>
          <ToastContainer
            toastClassName={() =>
              "p-1 min-h-10 rounded-md  overflow-hidden cursor-pointer"
            }
            bodyClassName={() => "text-sm bg-danger text-black font-med pb-3"}
            position="top-right"
            autoClose={5000}
          />
        </div>
      )}
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
                mutatefn({ ...values, personId: unique_id });
                navigate("/");
              } else {
                // dispatch(ADD_USER({ ...values, personId: unique_id }));
                mutate({ ...values, personId: unique_id });
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
    </Container>
  );
};

export default FormikForm2;
