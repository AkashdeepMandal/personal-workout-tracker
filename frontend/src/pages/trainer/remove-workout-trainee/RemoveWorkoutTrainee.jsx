import { Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Avatar,
  useTheme,
  Button,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import cardio from "../../../assets/cardio.png";
import {
  trainerGetAssignedWorkout,
  trainerRemoveWorkout,
} from "../../../apis/trainer";

const RemoveWorkoutTrainee = () => {
  const { name, id } = useParams();
  const [tableData, setTableData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();

  const columns = [
    { field: "id", headerName: "Id", hide: true, allowSearch: false },
    { field: "category", headerName: "Category", width: 120 },
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
      width: 180,
    },
    { field: "calories", headerName: "Calories per minute", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Button
              size="small"
              color="error"
              variant="contained"
              sx={{
                fontSize: "14px",
                textTransform: "capitalize",
              }}
              onClick={() => {
                handelRemove(params.id);
              }}
            >
              Remove
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    trainerGetAssignedWorkout(user.authToken, id)
      .then((res) => {
        const workouts = res.data[0].workouts.map((value) => {
          return {
            id: value.workout._id,
            category: `${textCapitalize(value.workout.category)}`,
            logo: value.workout.logo,
            name: `${textCapitalize(value.workout.name)}`,
            calories: value.workout.calories,
          };
        });
        setIsLoading(false);
        setTableData(workouts);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    setRefresh(false);
    // eslint-disable-next-line
  }, [refresh]);

  const handelRemove = async (workout) => {
    await trainerRemoveWorkout(user.authToken, id, workout)
      .then((res) => {
        setRefresh(true);
        handleClick({
          severity: "success",
          message: "User Deleted Successfully",
        });
      })
      .catch((error) => {
        setRefresh(true);
        handleClick({
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
  const handleClick = (newState) => {
    setSnackBarState({ ...snackBarState, open: true, ...newState });
  };
  const handleClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };

  return (
    <Box
      sx={{
        height: { xs: `calc(100vh - 60px)`, sm: `calc(100vh - 200px)` },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        pb={2}
        sx={{ fontSize: { xs: "24px", sm: "28px" } }}
      >
        {`Workout Assigned for ${name}`}
      </Typography>
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
      <DataGrid
        disableSelectionOnClick
        disableColumnSelector
        disableDensitySelector
        rows={tableData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        backgroundColor={theme.palette.grey[50]}
        sx={{ boxShadow: "0 0 12px #ccc" }}
        loading={isLoading}
      />
    </Box>
  );
};

export default RemoveWorkoutTrainee;
