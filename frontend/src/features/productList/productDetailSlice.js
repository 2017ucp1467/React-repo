import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {},
  isLoading: true,
};

export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  extraReducers: {
    [getProductDetail.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    },
    [getProductDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default productDetailSlice.reducer;
