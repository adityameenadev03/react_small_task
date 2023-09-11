import { Navigate, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import FormikForm2 from "../pages/FormikForm2";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <Home></Home> : <Navigate to="/login" />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/formik2",
    element: isLoggedIn ? <FormikForm2 /> : <Navigate to="/login" />,
  },
  {
    path: "/signup",
    element: isLoggedIn ? <Home></Home> : <SignUp />,
  },

  {
    path: "/login",
    element: isLoggedIn ? <Home></Home> : <Login />,
  },
];

export default routes;
