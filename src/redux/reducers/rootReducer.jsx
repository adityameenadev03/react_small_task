const initState = {
  formsArray: JSON.parse(localStorage.getItem("formsArray")) || [],
  error: false,
  loading: false,
};
console.log(initState);

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_FETCH_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING_STATUS":
      return { ...state, loading: action.payload };
    case "GET_ALL_USER":
      console.log(action.payload);
      localStorage.setItem("formsArray", JSON.stringify(action.payload));
      return { ...state, formsArray: [...action.payload] };

    case "ADD_USER":
      console.log(action.payload);
      let newFormsArray = [...state.formsArray, action.payload];
      localStorage.setItem("formsArray", JSON.stringify(newFormsArray));
      return { ...state, formsArray: [...newFormsArray] };

    case "DELETE_USER":
      console.log(action.payload);
      let newArray = [...state.formsArray].filter((item) => {
        console.log(item._id);
        return item._id !== action.payload;
      });
      console.log(newArray);
      localStorage.setItem("formsArray", JSON.stringify(newArray));
      return { ...state, formsArray: [...newArray] };

    case "EDIT_USER":
      let newEditedArray = [...state.formsArray].map((item) =>
        item._id == action.payload._id ? { ...action.payload } : item
      );
      localStorage.setItem("formsArray", JSON.stringify(newEditedArray));
      console.log("dispatch");
      console.log("to be edit array", { ...action.payload });
      console.log("after edit", newEditedArray);
      return { ...state, formsArray: [...newEditedArray] };
    default:
      return state;
  }
};

export default rootReducer;
