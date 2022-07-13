import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  traineeMonthlyProgress,
  traineeWeeklyProgress,
} from "../../../apis/trainee";
import BarChart from "../../../components/charts/BarChart";
import moment from "moment";

const Report = () => {
  const { user } = useSelector((state) => state.user);
  const [monthlyProgress, setMonthlyProgress] = useState({
    labels: [],
    data: [],
  });
  const [weeklyProgress, setWeeklyProgress] = useState({
    labels: [],
    data: [],
  });
  const theme = useTheme();

  useEffect(() => {
    traineeMonthlyProgress(user.authToken).then((res) => {
      setMonthlyProgress(res.data.monthlyProgress);
    });
    traineeWeeklyProgress(user.authToken).then((res) => {
      setWeeklyProgress(res.data.weeklyProgress);
    });
    // eslint-disable-next-line
  }, []);

  console.log(weeklyProgress);

  return (
    <Box
      sx={{
        height: { xs: `calc(100vh - 60px)`, sm: `calc(100vh - 250px)` },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        mb={2}
        sx={{
          fontSize: { xs: "24px", sm: "28px" },
          color: theme.palette.grey[800],
        }}
      >
        Report
      </Typography>
      <Stack direction="column" spacing={2}>
        <Box height={300}>
          <Typography variant="body1">
            Weekly report - Average calories burned per day
          </Typography>
          <BarChart data={weeklyProgress} label={`Weekly progress`} />
        </Box>
        <Box height={300}>
          <Typography variant="body1" pt={6}>
            Monthly report - Average calories burned per month
          </Typography>
          <BarChart
            data={monthlyProgress}
            label={`${moment().format("yyyy")} monthly progress`}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Report;
