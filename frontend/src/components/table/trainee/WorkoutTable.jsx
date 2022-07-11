import { useEffect, useState } from "react";
import { Avatar, useTheme, Button } from "@mui/material";
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
    traineeGetAssignedWorkout(user.authToken).then((res) => {
      const workout = res.data.workouts.map((value) => {
        return {
          id: value.workout._id,
          logo: value.workout.logo,
          calories: value.workout.calories,
          name: `${textCapitalize(value.workout.name)}`,
        };
      });
      setWorkoutList(workout);
    });
    setIsLoading(false);

    // eslint-disable-next-line
  }, []);

  return (
    <>
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
    </>
  );
};

export default WorkoutTable;
