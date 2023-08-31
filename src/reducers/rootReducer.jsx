const initState = {
  formsArray: JSON.parse(localStorage.getItem("formsArray")) || [],
};
// JSON.parse(localStorage.getItem("formsArray")) || console.log(initState);

const rootReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_USER":
      let newArr = [...state.formsArray, action.payload];
      localStorage.setItem("formsArray", JSON.stringify(newArr));
      return { ...state, formsArray: [...newArr] };
    case "DELETE_USER":
      let newArray = state.formsArray.filter(
        (item) => item.personId !== action.payload
      );
      localStorage.setItem("formsArray", JSON.stringify(newArray));
      return { ...state, formsArray: [...newArray] };
    case "EDIT_USER":
      let updatedArray = state.formsArray.map((item) =>
        item.personId == action.payload.personId ? { ...action.payload } : item
      );
      localStorage.setItem("formsArray", JSON.stringify(updatedArray));
      console.log(updatedArray);
      return { ...state, formsArray: [...updatedArray] };
    default:
      return state;
  }
};

export default rootReducer;
