import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../apis/requests";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  data: null,
  isError: false,
  error: "",
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkapi) => {
    try {
      const res = await login(user);
      const userdata = {
        role: res.data.user.role,
        name: {
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
        },
        avatar: res.data.user?.avatar,
        authToken: res.data.authToken,
      };
      return userdata;
    } catch (error) {
      const errorMsg = error.response.data.error.message;
      return thunkapi.rejectWithValue({ error: errorMsg });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (auth, thunkapi) => {
    try {
      const res = await logout(auth);
      return res.data;
    } catch (error) {
      const errorMsg = error.response.data.error.message;
      return thunkapi.rejectWithValue({ error: errorMsg });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.data = action.payload;
      state.isError = false;
      state.error = "";
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.data = null;
      state.isError = true;
      state.error = action.payload.error;
    },
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.data = null;
      state.isError = false;
      state.error = "";
    },
    [logoutUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.data = null;
      state.isError = true;
      state.error = action.payload.error;
    },
  },
});

export default userSlice.reducer;
