import React from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import AssignWorkouts from "./AssignWorkouts";

function AssignWorkoutTrainee() {
  const { name, id } = useParams();

  return (
    <Box
      sx={{
        height: { xs: `calc(100vh - 60px)`, sm: `calc(100vh - 20px)` },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        pb={2}
        sx={{ fontSize: { xs: "24px", sm: "28px" } }}
      >
        {`Assign Workout for ${name}`}
      </Typography>
      <AssignWorkouts id={id} />
    </Box>
  );
}

export default AssignWorkoutTrainee;
