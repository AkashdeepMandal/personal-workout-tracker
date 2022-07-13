import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { traineeProgressHistory } from "../../apis/trainee";
import WorkoutProgressCard from "../card/WorkoutProgressCard";

const Trainee = () => {
  const { user } = useSelector((state) => state.user);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    traineeProgressHistory(user.authToken).then((res) => {
      setProgress(res.data);
    });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid item sm={12}>
        {progress.length ? (
          <>
            <Typography
              variant="h6"
              textAlign="center"
              pb={2}
              sx={{ fontWeight: 600 }}
            >
              Last workout sessions
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              sx={{ flexWrap: "wrap" }}
            >
              {progress.map((workout) => {
                return (
                  <WorkoutProgressCard key={workout._id} value={workout} />
                );
              })}
            </Stack>
          </>
        ) : (
          <Typography
            variant="h6"
            textAlign="center"
            pb={1}
            sx={{ fontWeight: 600 }}
          >
            You did not complete any workouts
          </Typography>
        )}
      </Grid>
      <Grid item sm={12}></Grid>
    </>
  );
};

export default Trainee;
