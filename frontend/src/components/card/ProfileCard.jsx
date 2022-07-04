import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/slices/userSlice";
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

import { uploadProfilePic } from "../../apis/allUser";
import { buildImage } from "../../utils/buildImage";

function ProfileCard() {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleProfilePicSubmission = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    await uploadProfilePic(formData, user.authToken)
      .then((res) => {
        dispatch(updateUser(res.data));
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
          {isLoggedIn && (
            <>
              <Avatar
                sx={{
                  width: { xs: 32, sm: 80 },
                  height: { xs: 32, sm: 80 },
                  bgcolor: "White",
                  color: "#212121",
                }}
                alt={`${user.firstName} ${user.lastName}`}
                src={buildImage(user?.avatar)}
              />
              <Typography
                variant="h6"
                sx={{ textTransform: "capitalize", fontWeight: 600 }}
              >{`${user.firstName} ${user.lastName}`}</Typography>
            </>
          )}
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        {/* <Stack direction="row" spacing={1}> */}
        <Button
          size="medium"
          variant="text"
          component="label"
          sx={{ width: "100%", textTransform: "capitalize", fontWeight: 600 }}
          disabled={isSelected ? true : false}
        >
          Choose Picture
          <input type="file" onChange={changeHandler} hidden />
        </Button>
        <Button
          size="medium"
          variant="outlined"
          sx={{ width: "100%", textTransform: "capitalize", fontWeight: 600 }}
          disabled={isSelected ? false : true}
          onClick={handleProfilePicSubmission}
        >
          Upload Picture
        </Button>
        {/* </Stack> */}
      </CardActions>
    </Card>
  );
}

export default ProfileCard;
