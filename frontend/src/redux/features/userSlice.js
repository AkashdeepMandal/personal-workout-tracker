import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../apis/requests";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
  error: "",
};

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
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
});

export const logoutUser = createAsyncThunk("user/logoutUser", async (auth) => {
  const res = await logout(auth);
  return res;
});

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
      state.user = action.payload;
      state.error = "";
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.error.message;
    },
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.error = "";
    },
    [logoutUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;
// export const { logoutUser } = userSlice.actions;
