import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (error) => toast.error(error?.message);
const successNotification = (message) => toast.success(message);

export const instance = axios.create({
  baseURL: "http://localhost:8000",
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    successNotification("Data Fetched");
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    notify(error);

    try {
      switch (error.response.status) {
        case 404:
          throw Error("Not Found");
        case 500:
          throw Error("Internal Server Error");
      }
    } catch (err) {
      return Promise.reject(error);
    }

    if (error.response && error.response.data) {
      notify(error);
      return Promise.reject(error.response.data);
    }
  }
);

export const fetchAllUsers = async (params) => {
  const response = await instance.get(`${params}`);
  return response?.data?.data;
};

export const deleteUser = async (param) => {
  const response = await instance.delete(`${param}`);
  return response;
};

export const addUser = async (param, data) => {
  // const { param, data } = obj;
  console.log(data);
  const response = await instance.post(`${param}`, data);
  console.log(response?.data);

  return response?.data?.data;
};

export const editUser = async (param, data) => {
  const response = await instance.put(`${param}`, data);
  return response?.data?.data;
};
