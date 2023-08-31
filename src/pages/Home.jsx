import React, { useEffect, useState } from "react";
import TableData from "../components/TableData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);

  const data = useSelector((state) => state?.formsArray);

  console.log(data);
  const [formsArray, setFormsArray] = useState([...data]);
  // useEffect(() => {
  //   let data = JSON.parse(localStorage.getItem("formsArray"));
  //   if (data) {
  //     setFormsArray([...data]);
  //   } else {
  //     localStorage.setItem("formsArray", JSON.stringify([]));
  //   }
  // }, []);

  useEffect(() => {
    console.log(data);
    if (data?.length > 0) {
      setFormsArray([...data]);
    }
  }, [data]);

  // useEffect(() => {
  //   localStorage.setItem("formsArray", JSON.stringify(formsArray));
  // }, [formsArray]);

  const handleEdit = (id) => {
    let currentArray = formsArray.find((item, i) => item.personId == id);
    navigate("/formik2", { state: currentArray });
  };

  const handleDelete = (id) => {
    console.log(id);
    let index = formsArray.findIndex((item, i) => item.personId == id);
    formsArray.splice(index, 1);
    setFormsArray([...formsArray]);
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
