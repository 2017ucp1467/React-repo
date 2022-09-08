import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserList = createAsyncThunk(
  "getAllUsers", //used for generating actions internally,i.e, getAllUsers/pending
  async (arg, thunkAPI) => {
    const {
      user: { userInfo },
    } = thunkAPI.getState();
    try {
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      };
      const response = await axios.get("/users/", { headers });
      console.log("response for userList", response);
      return response.data;
    } catch (err) {
      console.log("error occured in getUserList api call");
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  }
);

const initialState = {};

const adminUserSlice = createSlice({
  name: "admin", //used for generating actions internally, i.e, admin/reducername
  initialState,
  reducers: {
    clearUserList: (state) => {
      state.userList = null;
    },
  },
  extraReducers: {
    [getUserList.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userList = action.payload;
    },
    [getUserList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.userList = null;
    },
  },
});

export const { clearUserList } = adminUserSlice.actions;

export default adminUserSlice.reducer;
