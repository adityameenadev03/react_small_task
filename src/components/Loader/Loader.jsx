import React from "react";
import "./loader.css";
import { Container } from "react-bootstrap";

const Loader = () => {
  return (
    <Container className="center-div">
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
    </Container>
  );
};

export default Loader;
