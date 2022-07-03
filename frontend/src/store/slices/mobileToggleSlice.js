import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileOpen: false,
};

const mobileToggleSlice = createSlice({
  name: "mobileToggle",
  initialState,
  reducers: {
    sideBarOpen: (state) => {
      state.isMobileOpen = true;
    },
    sideBarClose: (state) => {
      state.isMobileOpen = false;
    },
  },
});

export default mobileToggleSlice.reducer;
export const { sideBarOpen, sideBarClose } = mobileToggleSlice.actions;
