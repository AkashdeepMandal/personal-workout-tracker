import { Box } from "@mui/material";
import React from "react";

function Dashboard({ drawerWidth }) {
  console.log(drawerWidth);
  return (
    <Box
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        flexGrow: 1,
        p: 3,
        // height: "100vh",
        backgroundColor: "green",
      }}
    >
      Dashboard
    </Box>
  );
}

export default Dashboard;
