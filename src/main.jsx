import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FormikForm2 from "./pages/FormikForm2.jsx";

import { Provider } from "react-redux";
import store from "./store/store.js";
import { Counter } from "./redux/counter.jsx";

// app.js
import { QueryClient, QueryClientProvider } from "react-query";
import FetchData from "./pages/fetchData.jsx";
// Initialze the client
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
    path: "/fetchData",
    element: <FetchData />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </QueryClientProvider>
  </Provider>
);
