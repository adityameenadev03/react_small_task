import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8000",

  //   headers: { "Authorization": `Bearer ${"563492ad6f91700001000001429a36bd1bb24659933594c131ab9fdc"}` },
});

instance.interceptors.response.use(
  (response) => {
    console.log(response);
    const { data: data } = response;
    console.log(data);
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 404:
        throw Error("Not Found");
      case 500:
        throw Error("Internal Server Error");
    }
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

// instance.interceptors.request.use((req) => {
//   console.log(req);
//   return req;
// });

export const fetchAllUsers = async (params) => {
  const response = await instance.get(`${params}`);
  return response;
  //   return response?.data?.data;
  //   return response?.data?.result;
};

export const deleteUser = async (param) => {
  const response = await instance.delete(`${param}`);
  try {
    if (response.status === 200) {
      console.log(response?.data);
      return response;
      //   return response?.data?.result;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const addUser = async (obj) => {
  const { param, data } = obj;
  const response = await instance.post(`${param}`, data);
  try {
    if (response.status === 200) {
      console.log(response?.data);
      return response;
      //   return response?.data?.result;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const editUser = async (obj) => {
  const { param, data } = obj;
  const response = await instance.put(`${param}`, data);
  try {
    if (response.status === 200) {
      console.log(response?.data);
      return response;
      //   return response?.data?.result;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

// const res1 = await deleteUser("/deleteUser/64f6c673a29301cddf37ad7a");
// console.log("res 1-----------", res1);

// const fetchAllUsers2 = async () => {
//   return axios.get(`http://localhost:8000/getAllUsers`).then((data) => data);
// };

// const res2 = await fetchAllUsers2();
// console.log("res2 ----------", res2);
