import { useEffect, useState } from "react";
import {
  Avatar,
  useTheme,
  Button,
  Snackbar,
  Alert,
  Slide,
  Grid,
  Typography,
  Box,
  Stack,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import {
  trainerAssiginWorkout,
  trainerGetAssignedWorkout,
  trainerViewWorkouts,
} from "../../../apis/trainer";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import cardio from "../../../assets/cardio.png";

function AssignWorkouts({ id }) {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [workoutList, setWorkoutList] = useState([]);
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();

  const viewWorkoutColumns = [
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
              variant="contained"
              sx={{
                fontSize: "14px",
                textTransform: "capitalize",
              }}
              onClick={() => {
                handleAssignWorkout(
                  params.id,
                  params.row.name,
                  params.row.logo
                );
              }}
            >
              Assign
            </Button>
          </>
        );
      },
    },
  ];

  const assignedWorkoutColumns = [
    { field: "id", headerName: "Id", hide: true, allowSearch: false },
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
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              size="small"
              variant="contained"
              sx={{
                fontSize: "14px",
                textTransform: "capitalize",
              }}
              onClick={() => {
                handleRemoveWorkout(params.id);
              }}
            >
              remove
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    trainerViewWorkouts(user.authToken)
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
        setIsLoading(false);
        setTableData(workouts);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    trainerGetAssignedWorkout(user.authToken, id).then((res) => {
      const workout = res.data[0].workouts.map((value) => {
        return {
          id: value.workout._id,
          logo: value.workout.logo,
          name: `${textCapitalize(value.workout.name)}`,
        };
      });
      setWorkoutList(workout);
    });

    // eslint-disable-next-line
  }, []);

  const handleAssignWorkout = (id, name, logo) => {
    if (!workoutList.some((e) => e.id === id)) {
      setWorkoutList([...workoutList, { id, name, logo }]);
    } else {
      setSnackBarState({
        ...snackBarState,
        open: true,
        severity: "warning",
        message: "Workout is Already Assigned",
      });
    }
  };

  const handleRemoveWorkout = (id) => {
    const remainingWorkout = workoutList.filter((e) => e.id !== id);
    setWorkoutList(remainingWorkout);
  };

  const handleSubmit = async () => {
    const assignedWorkouts = workoutList.map((value) => {
      return { workout: value.id };
    });
    await trainerAssiginWorkout(user.authToken, assignedWorkouts, id)
      .then((res) => {
        setSnackBarState({
          ...snackBarState,
          open: true,
          severity: "success",
          message: "Workout assigned Successfully",
        });
      })
      .catch((error) => {
        setSnackBarState({
          ...snackBarState,
          open: true,
          severity: "error",
          message: error.response.data.error.message,
        });
      });
  };

  // Snackbar
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    severity: "success",
    message: "",
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = snackBarState;

  const handleClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackBarState.open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={Slide}
        direction="down"
      >
        <Alert
          onClose={handleClose}
          severity={snackBarState.severity}
          sx={{ width: "100%" }}
        >
          {snackBarState.message}
        </Alert>
      </Snackbar>

      <Box p={2} sx={{ boxShadow: "0 0 12px #ccc", height: "100%" }}>
        <Grid
          container
          spacing={2}
          direction="row"
          py={4}
          sx={{ height: "100%" }}
        >
          <Grid item sm={7}>
            <Typography variant="body1" mb={2} sx={{ fontWeight: 600 }}>
              Available Workouts
            </Typography>
            <DataGrid
              disableSelectionOnClick
              disableColumnSelector
              disableDensitySelector
              rows={tableData}
              columns={viewWorkoutColumns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              backgroundColor={theme.palette.grey[50]}
              loading={isLoading}
            />
          </Grid>

          <Grid item sm={5}>
            <Typography variant="body1" mb={2} sx={{ fontWeight: 600 }}>
              Assined Workouts
            </Typography>

            <Stack direction="column" gap={1} sx={{ height: "100%" }}>
              <DataGrid
                disableSelectionOnClick
                disableColumnSelector
                disableDensitySelector
                rows={workoutList}
                columns={assignedWorkoutColumns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                backgroundColor={theme.palette.grey[50]}
                loading={isLoading}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                mt={2}
                sx={{ width: "max-content", marginLeft: "auto" }}
              >
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AssignWorkouts;
