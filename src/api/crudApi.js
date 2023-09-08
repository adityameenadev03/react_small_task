import { instance } from "../Service/service";

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
