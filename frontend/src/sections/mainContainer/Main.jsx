import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../sideBar/SideBar";

function Main() {
  return (
    <Stack
      direction="row"
      sx={{ height: { xs: `calc(100vh - 50px)`, sm: `calc(100vh - 60px)` } }}
    >
      <SideBar />
      <Box
        sx={{
          overflowY: "scroll",
          paddingX: { xs: "18px", sm: "30px" },
          paddingY: { xs: "20px", sm: "60px" },
          width: "100%",
          height: { xs: `calc(100vh - 50px)`, sm: `calc(100vh - 60px)` },
          backgroundColor: "#f9fafc",
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
}

export default Main;
