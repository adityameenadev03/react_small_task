import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ErrorComponent = () => {
  const error = useSelector((state) => state?.error);
  console.log(error);
  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorComponent;
