import { Avatar, Box, Card, Stack, Typography, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import { adminViewWorkoutDetails } from "../../../apis/admin";
import cardio from "../../../assets/cardio.png";

function ViewWorkoutDetails() {
  const { user } = useSelector((state) => state.user);
  const [workoutDetails, setWorkoutDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchWorkoutDetails() {
      await adminViewWorkoutDetails(user.authToken, id).then((res) => {
        setWorkoutDetails(res.data);
      });
    }
    fetchWorkoutDetails();
    // eslint-disable-next-line
  }, []);

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
                  Created on :
                </Typography>
                <Typography variant="body1">
                  {moment(workoutDetails?.createdAt).format("DD / MM / YYYY")}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}

export default ViewWorkoutDetails;
