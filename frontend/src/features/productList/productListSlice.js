import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: true,
};

export const getProductList = createAsyncThunk(
  "product/getProductList",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/api/products/");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const productListSlice = createSlice({
  name: "productsList",
  initialState,
  extraReducers: {
    // [getProductList.pending]: (state) => {
    //   state.isLoading = true;
    // },
    [getProductList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getProductList.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default productListSlice.reducer;
