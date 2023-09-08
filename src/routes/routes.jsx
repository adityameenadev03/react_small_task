import { Navigate, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import FormikForm2 from "../pages/FormikForm2";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

const routes = (user) => [
  {
    path: "/",
    element: user ? <Home></Home> : <Navigate to="/login" />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/formik2",
    element: user ? <FormikForm2 /> : <Navigate to="/login" />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/login",
    element: <Login />,
  },
];

export default routes;
