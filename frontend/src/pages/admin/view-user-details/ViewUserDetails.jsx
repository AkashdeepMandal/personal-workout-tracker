import { Avatar, Box, Card, Stack, Typography, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import { adminViewUserDetails } from "../../../apis/admin";
import { calculateAge } from "../../../utils/calculateAge";

function ViewUserDetails() {
  const { user } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchUserDetails() {
      await adminViewUserDetails(user.authToken, id).then((res) => {
        setUserDetails(res.data);
      });
    }
    fetchUserDetails();
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
        View User Details
      </Typography>
      <Box py={4} sx={{ width: "100%" }}>
        <Card sx={{ maxWidth: "360px", margin: "0 auto" }}>
          <Stack p={2} direction="column" spacing={2}>
            <Stack direction="row" spacing={4} alignItems="center">
              <Avatar
                sx={{ height: 70, width: 70 }}
                src={buildImage(userDetails?.avatar)}
              />
              <Stack direction="column" justifyContent="center">
                <Typography variant="body1" fontWeight={600}>
                  Name
                </Typography>
                <Typography variant="body1">{`${textCapitalize(
                  userDetails?.firstName
                )} ${textCapitalize(userDetails?.lastName)}`}</Typography>
              </Stack>
            </Stack>
            <Divider variant="middle" py={0} />
            <Stack direction="column" spacing={1}>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" fontWeight={600}>
                  Role :
                </Typography>
                <Typography variant="body1">{`${textCapitalize(
                  userDetails?.role
                )}`}</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" fontWeight={600}>
                  Gender :
                </Typography>
                <Typography variant="body1">{`${textCapitalize(
                  userDetails?.gender
                )}`}</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" fontWeight={600}>
                  Date of birth :
                </Typography>
                <Typography variant="body1">
                  {moment(userDetails.dob).format("DD / MM / yyyy")}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" fontWeight={600}>
                  Age :
                </Typography>
                <Typography variant="body1">
                  {`${calculateAge(userDetails.dob)} years`}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" fontWeight={600}>
                  E-mail :
                </Typography>
                <Typography variant="body1">{userDetails?.email}</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" fontWeight={600}>
                  Address :
                </Typography>
                <Typography variant="body1">{`${textCapitalize(
                  userDetails?.address
                )}`}</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" fontWeight={600}>
                  Joined :
                </Typography>
                <Typography variant="body1">
                  {moment(userDetails?.createdAt).format("DD / MM / YYYY")}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}

export default ViewUserDetails;
