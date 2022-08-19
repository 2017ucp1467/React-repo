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
    // addItem: (state, action) => {
    //   const item = action.payload;
    //   const existItem = state.cartItems.find((x) => x.id === item.id);
    //   if (existItem) {
    //     state.cartItems = state.cartItems.map((x) =>
    //       x.id === existItem ? item : x
    //     );
    //   } else {
    //     state.cartItems.push(item);
    //   }
    // },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
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

export const { removeItem, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
