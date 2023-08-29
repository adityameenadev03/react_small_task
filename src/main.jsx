import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import {
  createBrowserRouter,
  
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Form from './components/Form'
import FormikForm from './components/FormikForm.jsx';

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
    element: <Form  />,
  },
  {
    path: "/formik",
    element: <FormikForm  />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} >
    <App />
     </RouterProvider>
  </React.StrictMode>,
)
