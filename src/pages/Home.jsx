import React, { useEffect, useState } from "react";
import TableData from "../components/TableData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_USER, GET_ALL_USER } from "../redux/actions/action";
import UserDetailCard from "../components/Card/UserDetailCard";
import Loader from "../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAllUsers, deleteUser } from "../Service/service";

const Home = () => {
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);
  const dispatch = useDispatch();

  const formsArray = useSelector((state) => state?.formsArray);

  const notify = (error) => toast.error(error?.message);
  const successNotification = (message) => toast.success(message);

  const {
    data,
    isLoading,
    isError: fetchingError,
    isSuccess,
  } = useQuery({
    queryKey: ["allUsers"],

    queryFn: () => fetchAllUsers("/getAllUsers"),
    onSuccess: (data) => {
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
      const id = variables.split("/")[1];

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
    mutate(`deleteUser/${deleteArray._id}`);
    setModelOpen(false);
  };

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

      <Container className="mt-5">
        <Link to={"/formik2"}>
          <div className="btn bg-primary btn-block text-white mb-4">
            Add User
          </div>
        </Link>

        {isLoading && !fetchingError && <Loader> </Loader>}

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
