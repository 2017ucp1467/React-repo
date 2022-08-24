import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userInfo: userInfoFromStorage };

export const userLogin = createAsyncThunk(
  "user/loginRequest",
  async (userCreds, thunkAPI) => {
    const { username, password } = userCreds;
    try {
      const headers = { "Content-type": "application/json" };
      const response = await axios.post(
        "/users/login/",
        { username, password },
        { headers }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  }
);

const userSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    userLogout: () => {
      return {};
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      return { isLoading: true };
    },
    [userLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
    [userLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.error = action.payload;
    },
  },
});

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
