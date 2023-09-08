import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FormikForm2 from "./pages/FormikForm2.jsx";

import { Provider, useDispatch } from "react-redux";
import store from "./redux/store/store.js";
import ErrorPage from "./pages/ErrorPage.jsx";
import SignUp from "./pages/SignUp.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <ErrorPage />,
//   },

//   {
//     path: "/formik2",
//     element: <FormikForm2 />,
//   },
//   {
//     path: "/signup",
//     element: <SignUp />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
