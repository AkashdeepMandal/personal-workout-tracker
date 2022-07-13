import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Grid, Stack } from "@mui/material";
import CountDocumentCard from "../card/CountDocumentCard";
import GroupIcon from "@mui/icons-material/Group";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { countTrainees, countWorkouts } from "../../apis/trainer";

const Trainer = () => {
  const { user } = useSelector((state) => state.user);
  const [count, setCount] = useState({
    trainees: 0,
    workouts: 0,
  });
  useEffect(() => {
    (async () => {
      const counts = {};
      await countTrainees(user.authToken).then((res) => {
        counts.trainees = res.data.countTrainees;
      });
      await countWorkouts(user.authToken).then((res) => {
        counts.workouts = res.data.countWorkouts;
      });
      setCount(counts);
    })();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid item sm={12}>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ flexWrap: "wrap" }}
        >
          <CountDocumentCard
            label="Total Trainees"
            count={count.trainees}
            bgcolor="#99f6e4"
            iconbgcolor="#0f766e"
            icon={GroupIcon}
          />
          <CountDocumentCard
            label="Total Workouts"
            count={count.workouts}
            bgcolor="#a7f3d0"
            iconbgcolor="#065f46"
            icon={FitnessCenterIcon}
          />
        </Stack>
      </Grid>
      <Grid item sm={12}></Grid>
    </>
  );
};

export default Trainer;
