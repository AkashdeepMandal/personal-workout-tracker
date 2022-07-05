import { useEffect, useState } from "react";
import { Avatar, Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Link as NavLink } from "react-router-dom";
import { adminViewWorkouts } from "../../../apis/admin";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import cardio from "../../../assets/cardio.png";

const columns = [
  { field: "id", headerName: "Id", hide: true, allowSearch: false },
  { field: "category", headerName: "Category", flex: 1 },
  {
    field: "logo",
    headerName: "Logo",
    renderCell: (params) => {
      return (
        <>
          {params.value ? (
            <Avatar src={buildImage(params.value)} />
          ) : (
            <Avatar src={cardio} />
          )}
        </>
      );
    },
    allowSearch: false,
    flex: 1,
  },

  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  { field: "calories", headerName: "Calories per minute", flex: 1 },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          <Button
            size="small"
            to={`/admin/view-workout-details/${params.id}`}
            variant="contained"
            component={NavLink}
            sx={{ fontSize: "14px", textTransform: "capitalize" }}
          >
            View
          </Button>
        </>
      );
    },
  },
];

function ViewWorkouts() {
  const [tableData, setTableData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();

  useEffect(() => {
    adminViewWorkouts(user.authToken)
      .then((res) => {
        const workouts = res.data.map((workout) => {
          return {
            id: workout._id,
            category: `${textCapitalize(workout.category)}`,
            name: `${textCapitalize(workout.name)}`,
            calories: workout.calories,
            logo: workout.logo ? workout.logo : null,
          };
        });
        setTableData(workouts);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);

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
        View Users
      </Typography>
      <DataGrid
        disableColumnSelector
        disableDensitySelector
        rows={tableData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        backgroundColor={theme.palette.grey[50]}
        sx={{ boxShadow: "0 0 12px #ccc" }}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
}

export default ViewWorkouts;
