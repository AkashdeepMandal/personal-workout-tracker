import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slices/userSlice";
import { getUserDetails, uploadProfilePic } from "../../apis/allUser";
import ProfileCard from "../../components/card/ProfileCard";
import ChangePassWord from "../../components/form/changePassWord";

function Profile({ drawerWidth }) {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    async function fetch() {
      await getUserDetails(user.authToken)
        .then((res) => setUserDetails(res.data))
        .catch((error) => setUserDetails(null));
    }
    fetch();
  }, []);

  return (
    <Box
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        flexGrow: 1,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        sx={{ fontSize: { xs: "24px", sm: "28px" } }}
      >
        Account
      </Typography>
      <Grid container spacing={2} direction="row" py={4}>
        <Grid item sm={4}>
          <Stack direction="column" spacing={2}>
            <ProfileCard />
            <ChangePassWord />
          </Stack>
        </Grid>
        <Grid item sm={8}>
          <Box sx={{ backgroundColor: "red", height: "200px" }}>asfas</Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
