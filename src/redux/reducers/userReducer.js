const userState = {
  userDetail: JSON.parse(localStorage.getItem("user")) || null,
  token: JSON.parse(localStorage.getItem("token")) || null,
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  error: null,
  isLoading: false,
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case "SET_USER":
      console.log("hhh");
      localStorage.setItem("user", JSON.stringify(action.payload));
      const { token } = action.payload;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      return {
        ...state,
        userDetail: { ...action.payload },
        token: token,
        isLoggedIn: true,
      };

    case "REMOVE_USER":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      return {
        ...state,
        userDetail: null,
        token: null,
        isLoggedIn: false,
      };
    case "SET_USER_ERROR":
      return { ...state, error: action.payload };

    case "SET_USER_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default userReducer;
