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
  },
});

export default userSlice.reducer;
export const { loginUser, logoutUser } = userSlice.actions;
