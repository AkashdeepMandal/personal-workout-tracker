import { configureStore } from "@reduxjs/toolkit";
import mobileToggleSlice from "./slices/mobileToggleSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    mobileToggle: mobileToggleSlice,
  },
});

export default store;
