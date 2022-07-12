import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Admin from "../../components/dashboard/Admin";
import { useSelector } from "react-redux";
import Trainer from "../../components/dashboard/Trainer";

function Dashboard() {
  const { user } = useSelector((state) => state.user);
  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        sx={{ fontSize: { xs: "24px", sm: "28px" } }}
      >
        Dashboard
      </Typography>
      <Grid
        container
        spacing={2}
        direction="column"
        py={4}
        sx={{ minHeight: "400px" }}
        justifyContent="center"
      >
        {user.role === "admin" && <Admin />}
        {user.role === "trainer" && <Trainer />}
      </Grid>
    </Box>
  );
}

export default Dashboard;
