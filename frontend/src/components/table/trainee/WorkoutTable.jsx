import { useEffect, useState } from "react";
import {
  Avatar,
  useTheme,
  Button,
  Snackbar,
  Alert,
  Slide,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import cardio from "../../../assets/cardio.png";
import { traineeGetAssignedWorkout } from "../../../apis/trainee";

const WorkoutTable = () => {
  const { user } = useSelector((state) => state.user);
  const [workoutList, setWorkoutList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  const startWorkoutColumns = [
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
      field: "calories",
      headerName: "Calories per minuets",
      flex: 1,
      hide: true,
      allowSearch: false,
    },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            size="small"
            to={`/trainee/start-workouts/${params.id}`}
            variant="contained"
            disabled={params.row.status === "Completed" ? true : false}
            component={NavLink}
            sx={{ fontSize: "14px", textTransform: "capitalize" }}
          >
            Start Workout
          </Button>
        );
      },
    },
  ];

  // assigned workout table
  useEffect(() => {
    setIsLoading(true);
    traineeGetAssignedWorkout(user.authToken)
      .then((res) => {
        const workout = res.data.workouts.map((value) => {
          return {
            id: value.workout._id,
            logo: value.workout.logo,
            status: `${textCapitalize(value.status)}`,
            calories: value.workout.calories,
            name: `${textCapitalize(value.workout.name)}`,
          };
        });
        const checkAllWorkoutCompleted = workout.every(
          (value) => value.status === "Completed"
        );
        if (checkAllWorkoutCompleted) {
          openSuccessAlart({
            message:
              "All workouts are completed for today, Come back tomorrow.",
          });
        }
        setWorkoutList(workout);
      })
      .catch((error) => {
        openRejectAlart({
          message: "Workouts are not assigned to you yet",
        });
      });
    setIsLoading(false);

    // eslint-disable-next-line
  }, []);

  // Snackbar
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    severity: "success",
    message: "",
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = snackBarState;

  const openSuccessAlart = (newState) => {
    setSnackBarState({ ...snackBarState, open: true, ...newState });
  };

  const openRejectAlart = (newState) => {
    setSnackBarState({
      ...snackBarState,
      severity: "error",
      open: true,
      ...newState,
    });
  };

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
      {snackBarState.severity === "success" ? (
        <DataGrid
          disableColumnMenu
          disableSelectionOnClick
          rows={workoutList}
          columns={startWorkoutColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          backgroundColor={theme.palette.grey[50]}
          loading={isLoading}
        />
      ) : (
        <Stack
          direction="column"
          sx={{ height: "400px" }}
          justifyContent="center"
        >
          <Typography variant="h6" textAlign="center" pb={1}>
            Workouts are not assigned to you yet
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default WorkoutTable;
