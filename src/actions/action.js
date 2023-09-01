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

// addUser is a action cretor which return thunk function to perform async task
//  you can also pass thunk function directly to dispatch
export const addUser = (someOther) => {
  return async (disptach, getState) => {
    const response = await fetch("http://localhost:8000/addUser", {
      method: "POST",
      body: JSON.stringify({
        ...someOther,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let data = await response.json();
    console.log(data);
    if (data) {
      disptach(ADD_USER(data));
    }
  };
};

export const deleteUser = (someOther) => {
  return async (disptach, getState) => {
    try {
      const response = await fetch("http://localhost:8000/deleteUser", {
        method: "DELETE",
        body: JSON.stringify({
          ...someOther,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      let data = await response.json();
      disptach(DELETE_USER(someOther.personId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const editUser = (someOther) => {
  return async (disptach, getState) => {
    try {
      const response = await fetch("http://localhost:8000/editUser", {
        method: "PUT",
        body: JSON.stringify({
          ...someOther,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      let data = await response.json();
      console.log("server data", data);
      disptach(EDIT_USER(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllUsers = (someOther) => {
  return async (disptach, getState) => {
    let data;
    try {
      const response = await fetch("http://localhost:8000/getAllUsers");
      data = await response.json();
      console.log(data);
      console.log(typeof data);
    } catch (err) {
      console.log(err);
    }
    if (data) {
      disptach(GET_ALL_USER(data));
    }
  };
};
