import React, { useContext, useEffect, useState } from "react";
import TableData from "../components/Table/TableData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, deleteUser } from "../redux/actions/action";
import UserDetailCard from "../components/Card/UserDetailCard";
import Loader from "../components/Loader/Loader";
import "react-toastify/dist/ReactToastify.css";
import ErrorComponent from "../components/Error/ErrorComponent";
import NavBar from "../components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { formsArray, isLoading } = useSelector((state) => state?.userData);
  console.log(formsArray, isLoading, error);

  const notify = (error) => toast.error(error?.message);
  const successNotification = (message) => toast.success(message);

  const handleEdit = (id) => {
    let currentArray = formsArray.find((item, i) => item.personId == id);
    navigate("/formik2", { state: currentArray });
  };

  const handleDelete = (id) => {
    const deleteArray = [...formsArray].find((item) => item.personId == id);
    dispatch(
      deleteUser(`/userData/deleteUser/${deleteArray._id}`, deleteArray._id)
    );
  };

  useEffect(() => {
    dispatch(fetchAllUsers("/userData/getAllUsers"));
  }, []);

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
