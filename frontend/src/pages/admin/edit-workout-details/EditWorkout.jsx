import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import EditWorkoutLogo from "./EditWorkoutLogo";
import EditWorkoutDetails from "./EditWorkoutDetails";

function EditWorkout() {
  const { id } = useParams();

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        sx={{ fontSize: { xs: "24px", sm: "28px" } }}
      >
        Edit User Details
      </Typography>

      <Grid container spacing={2} direction="row" py={4}>
        <Grid item sm={4}>
          <EditWorkoutLogo id={id} />
        </Grid>
        <Grid item sm={8}>
          <EditWorkoutDetails id={id} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditWorkout;
