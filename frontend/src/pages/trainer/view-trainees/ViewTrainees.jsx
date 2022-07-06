import { Box, Typography, useTheme } from "@mui/material";
import UserTable from "../../../components/table/trainer/UserTable";

function ViewTrainees() {
  const theme = useTheme();

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
        View Trainees
      </Typography>
      <UserTable action="view" />
    </Box>
  );
}

export default ViewTrainees;
