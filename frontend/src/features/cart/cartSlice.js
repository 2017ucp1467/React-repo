import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
};

export const addToCart = createAsyncThunk(
  "cart/addItem",
  async ({ id, qty }, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      let data = response.data;
      data["qty"] = qty;
      return data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      //this action will be called only if we want to change qty from cart itself
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item.id);
      existItem.qty = item.qty;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItem: (state, action) => {
      console.log("action payload:", action.payload);
      const newCart = state.cartItems.filter((x) => x._id !== action.payload);
      state.cartItems = newCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: {
    [addToCart.fulfilled]: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      //   console.log("exist item", existItem); its returning a proxy object on console

      if (existItem) {
        // state.cartItems.map((x) => (x.id === existItem._id ? item : x)); this is not working need to debud why?
        existItem.qty = item.qty;
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addItem, removeItem, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
