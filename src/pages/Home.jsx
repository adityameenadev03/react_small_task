import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);

  const [formsArray, setFormsArray] = useState(
    JSON.parse(localStorage.getItem("formsArray")) || []
  );

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("formsArray"));
    if (data) {
      setFormsArray([...data]);
    } else {
      localStorage.setItem("formsArray", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formsArray", JSON.stringify(formsArray));
  }, [formsArray]);

  const handleEdit = (id) => {
    let currentArray = formsArray.find((item, i) => item.personId == id);
    navigate("/formik", { state: currentArray });
  };

  const handleDelete = (id) => {
    let index = formsArray.findIndex((item, i) => item.personId == id);
    formsArray.splice(index, 1);
    setFormsArray([...formsArray]);
    setModelOpen(false);
  };

  return (
    <div>
      <Link to={"/formik"}>
        <div className="btn bg-primary btn-block text-white mb-4" >
          {" "}
          Add User
        </div>
      </Link>
      <Table
        formsArray={formsArray}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        modelOpen={modelOpen}
        setModelOpen={setModelOpen}
      ></Table>
    </div>
  );
};

export default Home;
