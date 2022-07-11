import {
  Avatar,
  Box,
  Card,
  Stack,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { useParams, Link as NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import {
  traineeSaveWorkouts,
  traineeViewWorkoutDetails,
} from "../../../apis/trainee";
import cardio from "../../../assets/cardio.png";

const StartWorkout = () => {
  const { user } = useSelector((state) => state.user);
  const [workoutDetails, setWorkoutDetails] = useState({});
  const [duration, setDuration] = useState({ minute: 0, second: 0 });
  const [totalCalories, setTotalCalories] = useState(0);
  const navigate = useNavigate();
  let timer;

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await traineeViewWorkoutDetails(user.authToken, id).then((res) => {
        setWorkoutDetails(res.data);
      });
    })();
    // eslint-disable-next-line
  }, []);

  // calculate duration
  useEffect(() => {
    // eslint-disable-next-line
    timer = setInterval(() => {
      setDuration({ ...duration, second: duration.second + 1 });
      if (duration.second === 59) {
        setDuration({ minute: duration.minute + 1, second: 0 });
        setTotalCalories(workoutDetails.calories * (duration.minute + 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  // finish workout on click
  const handleClick = async () => {
    clearInterval(timer);
    const workouts = {
      name: workoutDetails.name,
      // logo: workoutDetails.logo,
      duration: `${
        duration.minute < 10 ? "0" + duration.minute : duration.minute
      } : ${duration.second < 10 ? "0" + duration.second : duration.second}`,
      totalCalories,
    };
    console.log(workouts);
    await traineeSaveWorkouts(user.authToken, workouts)
      .then(() => {
        navigate("/trainee/start-workouts");
      })
      .catch(() => {
        navigate("/trainee/start-workouts");
      });
    // setDuration({ minute: 0, second: 0 });
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        sx={{ fontSize: { xs: "24px", sm: "28px" } }}
      >
        View Workout Details
      </Typography>
      <Box py={4} sx={{ width: "100%" }}>
        <Card sx={{ maxWidth: "360px", margin: "0 auto" }}>
          <Stack p={2} direction="column" spacing={2}>
            <Stack direction="row" spacing={4} alignItems="center">
              <Avatar
                sx={{ height: 70, width: 70 }}
                src={
                  workoutDetails.logo
                    ? buildImage(workoutDetails?.logo)
                    : cardio
                }
              />
              <Stack direction="column" justifyContent="center">
                <Typography variant="body1" fontWeight={600}>
                  Name
                </Typography>
                <Typography variant="body1">{`${textCapitalize(
                  workoutDetails?.name
                )}`}</Typography>
              </Stack>
            </Stack>
            <Divider variant="middle" py={0} />
            <Stack direction="column" spacing={1}>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" fontWeight={600}>
                  Category :
                </Typography>
                <Typography variant="body1">{`${textCapitalize(
                  workoutDetails?.category
                )}`}</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" fontWeight={600}>
                  Calories burn per minute :
                </Typography>
                <Typography variant="body1">
                  {workoutDetails?.calories}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" fontWeight={600}>
                  Duration :
                </Typography>
                <Typography variant="body1">
                  {`${
                    duration.minute < 10
                      ? "0" + duration.minute
                      : duration.minute
                  } : ${
                    duration.second < 10
                      ? "0" + duration.second
                      : duration.second
                  }`}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" fontWeight={600}>
                  Total Calories Burned :
                </Typography>
                <Typography variant="body1">{totalCalories}</Typography>
              </Stack>
            </Stack>
            <Divider variant="middle" py={0} />
            <Stack justifyContent="center">
              <Button
                size="small"
                to={`/trainee/start-workouts`}
                variant="contained"
                component={NavLink}
                sx={{ fontSize: "14px", textTransform: "capitalize" }}
                onClick={handleClick}
              >
                Finish Workout
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default StartWorkout;
