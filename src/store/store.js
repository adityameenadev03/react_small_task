import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers/rootReducer";

import { composeWithDevTools } from "redux-devtools-extension";

const enhancers = [applyMiddleware(thunk), composeWithDevTools()];

let store = createStore(rootReducer, compose(...enhancers));

export default store;
