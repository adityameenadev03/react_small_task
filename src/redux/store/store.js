import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers/rootReducer";

import { composeWithDevTools } from "redux-devtools-extension";

const enhancers = [applyMiddleware(thunk), composeWithDevTools()];

let store = createStore(rootReducer, compose(...enhancers));

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../reducers/counterSlice";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
