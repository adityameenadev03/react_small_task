import React, { useEffect, useState } from "react";
import TableData from "../components/TableData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  DELETE_USER,
  GET_ALL_USER,
  SET_FETCH_ERROR,
  getAllUsers,
} from "../actions/action";
import UserDetailCard from "../components/UserDetailCard";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const deleteUser = (id) => {
  console.log("hello");
  return axios.delete(`http://localhost:8000/deleteUser/${id}`);
};

const fetchAllUsers = () => {
  return axios.get(`http://localhost:8000/getAllUsers`);
};

const Home = () => {
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);
  const dispatch = useDispatch();

  const formsArray = useSelector((state) => state?.formsArray);

  // const loading = useSelector((state) => state?.loading);
  // const error = useSelector((state) => state?.error);

  const notify = (error) => toast.error(error?.message);
  const successNotification = (message) => toast.success(message);

  // Queries
  const {
    data,
    isLoading,
    isError: fetchingError,
    isSuccess,
  } = useQuery({
    queryKey: "allUsers",

    queryFn: fetchAllUsers,
    refetchOnMount: true,
    onSuccess: (data) => {
      console.log(data.data.data);
      dispatch(GET_ALL_USER(data.data.data));
      successNotification("Users Fetched");
    },
    onError: (error) => {
      const { name, message } = error;
      notify({ name, message });
    },
  });

  const { mutate, isError: deleteError } = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data, variables) => {
      const id = variables;
      console.log(id);
      console.log("data succesfully deleted", data);
      dispatch(DELETE_USER(id));
      successNotification("Item Deleted");
    },
    onError: (error) => {
      const { name, message } = error;
      notify({ name, message });
    },
  });

  const handleEdit = (id) => {
    let currentArray = formsArray.find((item, i) => item.personId == id);
    navigate("/formik2", { state: currentArray });
  };

  const handleDelete = (id) => {
    const deleteArray = [...formsArray].find((item) => item.personId == id);
    mutate(deleteArray._id);
    setModelOpen(false);
  };

  useEffect(() => {
    // dispatch(getAllUsers());
  }, []);

  return (
    <>
      {!isSuccess && !isLoading && (
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
      {isLoading && !fetchingError && <Loader> </Loader>}

      <Container className="mt-5">
        <Link to={"/formik2"}>
          <div className="btn bg-primary btn-block text-white mb-4">
            Add User
          </div>
        </Link>

        {isSuccess && (
          <>
            <div>
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
            </div>
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
