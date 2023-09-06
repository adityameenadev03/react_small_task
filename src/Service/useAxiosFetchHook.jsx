// import React, { useEffect, useState } from "react";
// import { instance } from "./service";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const notify = (error) => toast.error(error?.message);
// const successNotification = (message) => toast.success(message);

// const useAxiosFetchHook = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   instance.interceptors.request.use(
//     function (config) {
//       setIsLoading(true);
//       setError(null);
//       return config;
//     },
//     function (error) {
//       setError(error);
//       setIsLoading(false);
//       return Promise.reject(error);
//     }
//   );
//   instance.interceptors.response.use(
//     (response) => {
//       setError(null);
//       setIsLoading(false);
//       successNotification("Data Fetched");

//       console.log(response);
//       return response;
//     },
//     (error) => {
//       setError(error);
//       setIsLoading(false);
//       console.log(error);
//       notify(error);

//       try {
//         switch (error.response.status) {
//           case 404:
//             throw Error("Not Found");
//           case 500:
//             throw Error("Internal Server Error");
//         }
//       } catch (err) {
//         return Promise.reject(error);
//       }

//       if (error.response && error.response.data) {
//         notify(error);
//         return Promise.reject(error.response.data);
//       }
//     }
//   );

//   return { fetchAllUsers, deleteUser, editUser, addUser, isLoading, error };
// };

// export default useAxiosFetchHook;
