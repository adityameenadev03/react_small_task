import React, { useContext, useEffect, useState } from "react";
import TableData from "../components/Table/TableData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_USER,
  DELETE_USER,
  GET_ALL_USER,
  SET_ERROR,
  SET_LOADING,
} from "../redux/actions/action";
import UserDetailCard from "../components/Card/UserDetailCard";
import Loader from "../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorComponent from "../components/Error/ErrorComponent";
import NavBar from "../components/NavBar/NavBar";
import { deleteUser, fetchAllUsers } from "../api/crudApi";

const Home = () => {
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);
  const dispatch = useDispatch();

  const formsArray = useSelector((state) => state?.formsArray);

  const isLoading = useSelector((state) => state?.isLoading);
  const error = useSelector((state) => state?.error);

  const notify = (error) => toast.error(error?.message);
  const successNotification = (message) => toast.success(message);

  const handleEdit = (id) => {
    let currentArray = formsArray.find((item, i) => item.personId == id);
    navigate("/formik2", { state: currentArray });
  };

  const handleDelete = (id) => {
    const deleteArray = [...formsArray].find((item) => item.personId == id);

    deleteUser(`/userData/deleteUser/${deleteArray._id}`);
    dispatch(DELETE_USER(deleteArray._id));
    successNotification("item deleted");
    setModelOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(SET_LOADING(true));
        dispatch(SET_ERROR(null));
        const data = await fetchAllUsers("/userData/getAllUsers");
        if (data) {
          dispatch(GET_ALL_USER([...data]));
          dispatch(SET_LOADING(false));
          dispatch(SET_ERROR(false));
        }
      } catch (err) {
        dispatch(SET_LOADING(false));
        dispatch(SET_ERROR(err));
      }
    };
    fetchData();
  }, []);

  console.log(error, isLoading);

  return (
    <>
      <Container
        className="pt-5 min-vh-100"
        // style={{ height: "100vh" }}
      >
        <Link to={"/formik2"}>
          <div className="btn bg-primary btn-block text-white mb-4">
            Add User
          </div>
        </Link>

        {isLoading && !error && <Loader> </Loader>}
        {!isLoading && error && (
          <>
            <ToastContainer
              toastClassName={() =>
                "p-1 min-h-10 rounded-md  overflow-hidden cursor-pointer"
              }
              bodyClassName={() => "text-sm bg-danger text-black font-med pb-3"}
              position="top-left"
              autoClose={11000}
            />
            <ErrorComponent></ErrorComponent>
          </>
        )}
        {!isLoading && !error && formsArray && (
          <>
            <ToastContainer
              toastClassName={() =>
                "p-1 min-h-10 rounded-md  overflow-hidden cursor-pointer"
              }
              bodyClassName={() =>
                "text-sm bg-success text-black font-med pb-3"
              }
              position="top-right"
              autoClose={1000}
            />
            <UserDetailCard
              formsArray={formsArray}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              modelOpen={modelOpen}
              setModelOpen={setModelOpen}
            ></UserDetailCard>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
