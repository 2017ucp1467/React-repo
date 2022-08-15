// import { createStore, combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// const reducer = combineReducers({});

// const initialState = {};

// const middleware = [thunk];
import productListReducer from "./features/productList/productListSlice";
import productDetailReducer from "./features/productList/productDetailSlice";

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetail: productDetailReducer,
  },
});

export default store;