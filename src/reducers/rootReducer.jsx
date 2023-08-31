const initState = {
  formsArray: JSON.parse(localStorage.getItem("formsArray")) || [],
};
console.log(initState);

const rootReducer = (state = initState, action) => {
  console.log(action);
  if (action.type === "DELETE_POST") {
    let newPosts = state.posts.filter((post) => {
      return post.id !== action.id;
    });
    return {
      ...state,
      posts: newPosts,
    };
  }
  if (action.type === "ADD_USER") {
    let newFormsArray = [...state.formsArray, action.payload];
    localStorage.setItem("formsArray", JSON.stringify(newFormsArray));
    return { ...state, formsArray: newFormsArray };
  }
  // if (action.type === "ADD_USER")
  // return { ...state, formsArray: [...state.formsArray, action.payload] };
};

export default rootReducer;
