export const SET_ERROR = (data) => {
  return {
    type: "SET_ERROR",
    payload: data,
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

export const SET_LOADING = (data) => {
  return {
    type: "SET_LOADING",
    payload: data,
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

// addUser is a action cretor which return thunk function to perform async task
//  you can also pass thunk function directly to dispatch
export const addUser = (someOther) => {
  return async (dispatch, getState) => {
    dispatch(SET_FETCH_ERROR(false));
    dispatch(SET_LOADING_STATUS(true));
    try {
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

      if (response.status == 400) {
        throw new Error(`${data.message}`);
      }
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }

      if (response.status == 201) {
        console.log("dispathed");
        dispatch(ADD_USER(data.data));
      }
      dispatch(SET_LOADING_STATUS(false));
    } catch (error) {
      console.log(error);
      dispatch(SET_FETCH_ERROR({ message: error.message }));
      dispatch(SET_LOADING_STATUS(false));
    }
  };
};

export const deleteUser = (someOther) => {
  return async (dispatch, getState) => {
    dispatch(SET_FETCH_ERROR(false));
    dispatch(SET_LOADING_STATUS(true));
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

      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }

      if (response.status == 204) {
        console.log("dispathed");
        dispatch(DELETE_USER(someOther.personId));
      }
      dispatch(SET_LOADING_STATUS(false));
    } catch (error) {
      console.log(error);
      dispatch(SET_FETCH_ERROR({ message: error.message }));
      dispatch(SET_LOADING_STATUS(false));
    }
  };
};

export const editUser = (someOther) => {
  return async (dispatch, getState) => {
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
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      const data = await response.json();
      if (response.status == 201) {
        dispatch(EDIT_USER(data.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllUsers = (someOther) => {
  return async (dispatch, getState) => {
    dispatch(SET_FETCH_ERROR(false));
    dispatch(SET_LOADING_STATUS(true));

    try {
      const response = await fetch("http://localhost:8000/getAllUsers");
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      const data = await response.json();
      if (response.status == 200) {
        console.log("dispathed");
        console.log(data);
        dispatch(GET_ALL_USER(data.data));
      }
      dispatch(SET_LOADING_STATUS(false));
    } catch (err) {
      console.log(err);
      dispatch(SET_FETCH_ERROR({ message: err.message }));
      dispatch(SET_LOADING_STATUS(false));
    }
  };
};
