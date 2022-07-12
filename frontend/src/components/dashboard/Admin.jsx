import React from "react";
import { useEffect } from "react";
import { countUsers } from "../../apis/admin";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Grid, Stack } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PersonIcon from "@mui/icons-material/Person";
import CountDocumentCard from "../card/CountDocumentCard";
import GroupIcon from "@mui/icons-material/Group";

const Admin = () => {
  const { user } = useSelector((state) => state.user);
  const [countUser, setCountUser] = useState({
    totalUser: "",
    admin: "",
    trainer: "",
    trainee: "",
  });
  useEffect(() => {
    countUsers(user.authToken).then((res) => {
      setCountUser(res.data.count);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid item sm={12}>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <CountDocumentCard
            label="Total Users"
            count={countUser.totalUser}
            bgcolor="#99f6e4"
            iconbgcolor="#0f766e"
            icon={GroupIcon}
          />
          <CountDocumentCard
            label="Total Admins"
            count={countUser.admin}
            bgcolor="#a7f3d0"
            iconbgcolor="#065f46"
            icon={VerifiedUserIcon}
          />
          <CountDocumentCard
            label="Total Trainers"
            count={countUser.trainer}
            bgcolor="#a5f3fc"
            iconbgcolor="#155e75"
            icon={PersonIcon}
          />
          <CountDocumentCard
            label="Total Trainees"
            count={countUser.trainee}
            bgcolor="#fee2e2"
            iconbgcolor="#fca5a5"
            icon={PersonIcon}
          />
        </Stack>
      </Grid>
      <Grid item sm={12}></Grid>
    </>
  );
};

export default Admin;
