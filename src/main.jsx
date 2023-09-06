import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FormikForm2 from "./pages/FormikForm2.jsx";

import { Provider } from "react-redux";
import store from "./redux/store/store.js";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AxiosLearn from "./redux/actions/axiosLearn.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/formik2",
    element: <FormikForm2 />,
  },

  {
    path: "/axioslearn",
    element: <AxiosLearn></AxiosLearn>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <App />
        <ReactQueryDevtools initialIsOpen={true} />
      </RouterProvider>
    </QueryClientProvider>
  </Provider>
);
