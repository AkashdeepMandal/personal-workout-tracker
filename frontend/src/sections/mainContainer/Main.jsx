import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../sideBar/SideBar";

function Main() {
  return (
    <Stack direction="row">
      <SideBar />
      <Outlet />
    </Stack>
  );
}

export default Main;
