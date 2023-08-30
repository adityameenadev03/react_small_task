import React, { useEffect, useState } from "react";
import TableData from "../components/TableData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);

  const [formsArray, setFormsArray] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("formsArray"));
    if (storedData) {
      return storedData;
    } else {
      localStorage.setItem("formsArray", JSON.stringify([]));
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("formsArray", JSON.stringify(formsArray));
  }, [formsArray]);

  const handleEdit = (id) => {
    let currentArray = formsArray.find((item) => item.personId == id);
    navigate("/formik2", { state: currentArray });
  };

  const handleDelete = (id) => {
    setFormsArray((prevFormsArray) =>
      prevFormsArray.filter((item) => item.personId !== id)
    );
    setModelOpen(false);
  };

  return (
    <Card className="border-white shadow-lg">
      <Link to="/formik2">
        <button className="btn bg-primary btn-block text-white mb-4">
          Add User
        </button>
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
