import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../apis/allUser";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  user: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await login(user);
      const userdata = {
        role: res.data.user.role,

        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,

        avatar: res.data.user?.avatar,
        authToken: res.data.authToken,
      };
      return userdata;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async (auth) => {
  const res = await logout(auth);
  return res;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const userData = {
        role: action.payload.role,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        avatar: action.payload?.avatar,
      };
      state.user = { ...state.user, ...userData };
    },
  },
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
      state.error = action.payload;
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
export const { updateUser } = userSlice.actions;
