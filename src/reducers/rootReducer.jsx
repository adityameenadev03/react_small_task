const initState = {
  formsArray: JSON.parse(localStorage.getItem("formsArray")) || [],
};
console.log(initState);

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_USER":
      console.log("ehlo");
      let newFormsArray = [...state.formsArray, action.payload];
      localStorage.setItem("formsArray", JSON.stringify(newFormsArray));
      return { ...state, formsArray: [...newFormsArray] };

    case "DELETE_USER":
      let newArray = [...state.formsArray].filter(
        (item) => item.personId !== action.payload
      );
      localStorage.setItem("formsArray", JSON.stringify(newArray));
      return { ...state, formsArray: [...newArray] };

    case "EDIT_USER":
      let newEditedArray = [...state.formsArray].map((item) =>
        item.personId == action.payload.personId ? { ...action.payload } : item
      );
      localStorage.setItem("formsArray", JSON.stringify(newEditedArray));
      return { ...state, formsArray: [...newEditedArray] };
    default:
      return state;
  }
};

export default rootReducer;
