import { useEffect, useState } from "react";
import {
  Avatar,
  useTheme,
  Button,
  Snackbar,
  Alert,
  Slide,
  Stack,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Link as NavLink } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import {
  adminDeleteWorkoutDetails,
  adminViewWorkouts,
} from "../../../apis/admin";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import cardio from "../../../assets/cardio.png";

function WorkoutTable({ action }) {
  const { user } = useSelector((state) => state.user);
  const [tableData, setTableData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  const columns = [
    { field: "id", headerName: "Id", hide: true, allowSearch: false },
    { field: "category", headerName: "Category", width: 80 },
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
      width: 60,
    },

    {
      field: "name",
      headerName: "Name",
      width: 120,
    },
    { field: "calories", headerName: "Calories per minute", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => {
        if (action === "view") {
          return (
            <>
              <Button
                size="small"
                to={`/admin/view-workout/${params.id}`}
                variant="contained"
                component={NavLink}
                sx={{ fontSize: "14px", textTransform: "capitalize" }}
              >
                View
              </Button>
            </>
          );
        } else if (action === "edit") {
          return (
            <>
              <Button
                size="small"
                to={`/admin/edit-workout/${params.id}`}
                variant="contained"
                component={NavLink}
                sx={{ fontSize: "14px", textTransform: "capitalize" }}
              >
                Edit
              </Button>
            </>
          );
        } else if (action === "delete") {
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
                  handelDelete(params.id);
                }}
              >
                Delete
              </Button>
            </>
          );
        }
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    adminViewWorkouts(user.authToken, search, filter, page)
      .then((res) => {
        const { workouts, totalWorkouts } = res.data;
        const Workouts = workouts.map((workout) => {
          return {
            id: workout._id,
            category: `${textCapitalize(workout.category)}`,
            name: `${textCapitalize(workout.name)}`,
            calories: workout.calories,
            logo: workout.logo ? workout.logo : null,
          };
        });
        setIsLoading(false);
        setRowCount(totalWorkouts);
        setTableData(Workouts);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    setRefresh(false);
    // eslint-disable-next-line
  }, [refresh, search, filter, page]);

  const handelDelete = async (id) => {
    await adminDeleteWorkoutDetails(user.authToken, id)
      .then((res) => {
        setRefresh(true);
        handleClick({
          severity: "success",
          message: "Workout Deleted Successfully",
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

      <Stack direction="row" spacing={3} justifyContent="flex-end" marginY={2}>
        <OutlinedInput
          size="small"
          autoComplete="off"
          id="search"
          type="text"
          value={search}
          name="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search by workout name"
          inputProps={{}}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            size="small"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Fliter by category</em>
            </MenuItem>
            <MenuItem value="strength">Strength</MenuItem>
            <MenuItem value="cardio">Cardio</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <DataGrid
        disableColumnMenu
        disableSelectionOnClick
        pagination
        paginationMode="server"
        rowCount={rowCount}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        rowsPerPageOptions={[10]}
        pageSize={10}
        rows={tableData}
        columns={columns}
        loading={isLoading}
        backgroundColor={theme.palette.grey[50]}
        sx={{ boxShadow: "0 0 12px #ccc" }}
      />
    </>
  );
}

export default WorkoutTable;
