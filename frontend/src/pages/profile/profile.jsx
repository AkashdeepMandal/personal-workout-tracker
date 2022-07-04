import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import ProfileCard from "../../components/card/ProfileCard";
import ChangePassWord from "../../components/form/changePassWord";
import EditUserDetails from "../../components/form/editUserDetails";

function Profile({ drawerWidth }) {
  return (
    <Box>
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
          <EditUserDetails />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
