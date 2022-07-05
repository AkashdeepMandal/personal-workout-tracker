import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      const userData = {
        role: action.payload.user.role,
        firstName: action.payload.user.firstName,
        lastName: action.payload.user.lastName,
        avatar: action.payload.user?.avatar,
        authToken: action.payload.authToken,
      };
      state.user = userData;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
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
});

export default userSlice.reducer;
export const { loginUser, logoutUser, updateUser } = userSlice.actions;
