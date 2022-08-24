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
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  extraReducers: {
    [getProductDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    },
    [getProductDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default productDetailSlice.reducer;
