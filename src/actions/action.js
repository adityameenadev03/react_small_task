export const EDIT_USER = (id) => {
  return {
    type: "EDIT_USER",
    id,
  };
};

export const DELETE_USER = (id) => {
  return {
    type: "DELETE_USER",
    id,
  };
};

export const ADD_USER = (data) => {
  return {
    type: "ADD_USER",
    payload: data,
  };
};
