import axios from "axios";

import { toast } from "react-toastify";

const notify = (error) => toast.error(error?.message);
const successNotification = (message) => toast.success(message);

export const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

instance.interceptors.request.use(
  function (config) {
    if (config.authorization !== false) {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(response);
    successNotification("fetched");

    return response;
  },
  (error) => {
    console.log(error);
    try {
      if (error?.response?.data) {
        throw Error(`${error?.response?.data?.message}`);
      } else {
        switch (error?.response?.status) {
          case 404:
            throw Error("Not Found");
          case 500:
            throw Error("Internal Server Error");
        }
      }
    } catch (error) {
      toast.error(error?.message);
      return Promise.reject(error);
    }
  }
);
