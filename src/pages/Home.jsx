import React, { useEffect, useState } from "react";
import TableData from "../components/TableData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_USER } from "../actions/action";

const Home = () => {
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);
  const dispatch = useDispatch();

  const formsArray = useSelector((state) => state?.formsArray);

  const handleEdit = (id) => {
    let currentArray = formsArray.find((item, i) => item.personId == id);
    navigate("/formik2", { state: currentArray });
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(DELETE_USER(id));
    setModelOpen(false);
  };

  return (
    <Card>
      <Link to={"/formik2"}>
        <div className="btn bg-primary btn-block text-white mb-4">
          {" "}
          Add User
        </div>
      </Link>
      <TableData
        formsArray={formsArray}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        modelOpen={modelOpen}
        setModelOpen={setModelOpen}
      ></TableData>
    </Card>
  );
};

export default Home;
