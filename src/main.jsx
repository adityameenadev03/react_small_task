import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Form from "./components/Form";
import FormikForm from "./pages/FormikForm.jsx";
import FormikForm2 from "./pages/FormikForm2.jsx";
import { SignupForm } from "./components/SignupForm.jsx";
import BootstrapPractice from "./pages/bootstrapPractice.jsx";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Root/>,
  // },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/formik",
    element: <FormikForm />,
  },
  {
    path: "/formik2",
    element: <FormikForm2 />,
  },
  {
    path: "/formik3",
    element: <SignupForm />,
  },
  {
    path: "/bootstrapPractice",
    element: <BootstrapPractice></BootstrapPractice>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
