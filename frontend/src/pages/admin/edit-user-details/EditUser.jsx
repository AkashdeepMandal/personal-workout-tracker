import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import EditProfilePicture from "./EditProfilePicure";
import EditUserPassword from "./EditUserPassword";
import AdminEditUserDetails from "./EditUserDetails";

function EditUser() {
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
          <Stack direction="column" spacing={2}>
            <EditProfilePicture id={id} />
            <EditUserPassword id={id} />
          </Stack>
        </Grid>
        <Grid item sm={8}>
          <AdminEditUserDetails id={id} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditUser;
