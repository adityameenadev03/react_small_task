import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_USER } from "../../redux/actions/action";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isLoggedIn, userDetail } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(REMOVE_USER());
    navigate("/login");
  };
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#home">ManageSyS</Navbar.Brand>
        <Nav className="d-flex justify-content-around text-center me-3">
          <Nav.Link className="ms-3 p-2" href="/">
            Home
          </Nav.Link>
          {isLoggedIn ? (
            <>
              <Nav.Link className="ms-3">Hi, {userDetail.name} </Nav.Link>
              <Nav.Link className="ms-3" onClick={logoutUser}>
                <Button variant="danger" size="sm">
                  Logout
                </Button>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link className="ms-3 p-2" href="/signup">
                SignUp
              </Nav.Link>
              <Nav.Link className="ms-3 p-2" href="/login">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
