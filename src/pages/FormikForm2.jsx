import React, { useEffect, useState } from "react";
import { Formik, useFormik, useFormikContext } from "formik";
import { basicSchema } from "../schema/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Container, ToastContainer } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import UserInputForm from "../components/Form/UserInputForm";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER, EDIT_USER } from "../redux/actions/action.js";
import { toast } from "react-toastify";
import { addUser, editUser } from "../api/crudApi";

const FormikForm2 = () => {
  const unique_id = uuid().slice(0, 8);
  const navigate = useNavigate();
  const location = useLocation();
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const notify = (error) => toast.error(error?.message);
  const successNotification = (message) => toast.success(message);

  useEffect(() => {
    if (location.state != null) {
      setEditing(true);
    }
  }, []);

  const initialValues = location.state
    ? { ...location.state }
    : { name: "", email: "", phone: "", gender: null };

  return (
    <Container className="d-flex justify-content-center ">
      {!error && !isLoading && (
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
                const editUserOnApi = async () => {
                  const data = await editUser("/editUser", {
                    ...values,
                    personId: unique_id,
                  });

                  dispatch(EDIT_USER({ ...data, personId: unique_id }));
                  navigate("/");
                };
                editUserOnApi();
              } else {
                const addUserFetch = async () => {
                  const data = await addUser("/addUser", {
                    ...values,
                    personId: unique_id,
                  });
                  dispatch(ADD_USER({ ...data, personId: unique_id }));
                  actions.resetForm();
                  navigate("/");
                };

                addUserFetch();
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
