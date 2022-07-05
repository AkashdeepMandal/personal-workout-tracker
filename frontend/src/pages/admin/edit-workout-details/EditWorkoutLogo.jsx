import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { adminViewWorkoutDetails } from "../../../apis/admin";
import { buildImage } from "../../../utils/buildImage";
import { adminUploadWorkoutLogo } from "../../../apis/admin";
import cardio from "../../../assets/cardio.png";

function EditWorkoutLogo({ id }) {
  const { user } = useSelector((state) => state.user);
  const [workoutDetails, setWorkoutDetails] = useState({ name: "" });
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    async function getUserData() {
      await adminViewWorkoutDetails(user.authToken, id).then((res) => {
        setWorkoutDetails(res.data);
      });
    }
    getUserData();
    // eslint-disable-next-line
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleProfilePicSubmission = async () => {
    const formData = new FormData();
    formData.append("logo", selectedFile);

    await adminUploadWorkoutLogo(user.authToken, formData, id)
      .then((res) => {
        setSelectedFile(null);
        setIsSelected(false);
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <Card sx={{ boxShadow: "0 0 12px #ccc" }}>
      <CardContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          py={3}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "White",
              color: "#212121",
            }}
            alt={`${workoutDetails.name} `}
            src={workoutDetails.logo ? buildImage(workoutDetails.logo) : cardio}
          />
          <Typography
            variant="h6"
            sx={{ textTransform: "capitalize", fontWeight: 600 }}
          >{`${workoutDetails.name}`}</Typography>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          size="medium"
          variant="text"
          component="label"
          sx={{ width: "100%", textTransform: "capitalize", fontWeight: 600 }}
          disabled={isSelected ? true : false}
        >
          Choose Logo
          <input type="file" onChange={changeHandler} hidden />
        </Button>
        <Button
          size="medium"
          variant="outlined"
          sx={{ width: "100%", textTransform: "capitalize", fontWeight: 600 }}
          disabled={isSelected ? false : true}
          onClick={handleProfilePicSubmission}
        >
          Upload Logo
        </Button>
      </CardActions>
    </Card>
  );
}

export default EditWorkoutLogo;
