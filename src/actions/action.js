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

export const ADD_USER = (data) => {
  return {
    type: "ADD_USER",
    payload: data,
  };
};
