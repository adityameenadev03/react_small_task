export const EDIT_USER = (id) => {
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

// addUser is a action cretor which return thunk function to perform async task
//  you can also pass thunk function directly to dispatch
export const addUser = (someOther) => {
  return async (disptach, getState) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/10"
    );
    let data = await response.json();
    console.log(data);
    data = someOther;
    console.log(data);

    disptach(ADD_USER(data));
  };
};
