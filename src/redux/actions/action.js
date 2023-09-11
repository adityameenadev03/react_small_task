import { instance } from "../../Service/service";

export const fetchAllUsers = (params) => {
  return async (dispatch, getState) => {
    console.log("fetching data");
    try {
      const response = await instance.get(`${params}`);
      const data = await response?.data?.data;
      console.log(data);
      if (data) {
        dispatch(GET_ALL_USER([...data]));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (param, id) => {
  return async (dispatch, getState) => {
    console.log("fetching data");
    try {
      const response = await instance.delete(`${param}`);
      const data = response;
      console.log(data);
      dispatch(DELETE_USER(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUser = (param, body) => {
  return async (dispatch, getState) => {
    try {
      console.log(param, body);
      const response = await instance.post(`${param}`, body);
      const data = await response?.data?.data;
      console.log(data);
      if (data) {
        dispatch(ADD_USER({ ...data, personId: data.personId }));
      }
    } catch (err) {}
  };
};

export const editUser = (param, body) => {
  return async (dispatch, getState) => {
    try {
      const response = await instance.put(`${param}`, body);
      const data = await response?.data?.data;
      console.log(data);
      if (data) {
        dispatch(EDIT_USER({ ...data, personId: body.personId }));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const SET_USER = (data) => {
  return {
    type: "SET_USER",
    payload: data,
  };
};

export const REMOVE_USER = () => {
  return {
    type: "REMOVE_USER",
  };
};

export const EDIT_USER = (data) => {
  return {
    type: "EDIT_USER",
    payload: data,
  };
};

export const DELETE_USER = (id) => {
  return {
    type: "DELETE_USER",
    payload: id,
  };
};

export const GET_ALL_USER = (data) => {
  return {
    type: "GET_ALL_USER",
    payload: data,
  };
};

export const ADD_USER = (data) => {
  return {
    type: "ADD_USER",
    payload: data,
  };
};
