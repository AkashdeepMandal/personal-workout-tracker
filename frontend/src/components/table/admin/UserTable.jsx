import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  useTheme,
  Alert,
  Slide,
  Snackbar,
  OutlinedInput,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Link as NavLink } from "react-router-dom";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import { calculateAge } from "../../../utils/calculateAge";
import { stringToAvatar } from "../../../utils/generateAvatarLogo";
import { adminDeleteUserDetails, adminViewUsers } from "../../../apis/admin";

function UserTable({ action }) {
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
    { field: "role", headerName: "Role" },
    {
      field: "avatar",
      headerName: "Avatar",
      renderCell: (params) => {
        return (
          <>
            <Avatar
              {...stringToAvatar(params.row.name)}
              src={buildImage(params.value)}
            />
          </>
        );
      },
      allowSearch: false,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "gender", headerName: "Gender", width: 100, allowSearch: false },
    { field: "age", headerName: "Age", width: 90, allowSearch: false },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 150,
      allowSearch: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        if (action === "view") {
          return (
            <>
              <Button
                size="small"
                to={`/admin/view-user/${params.id}`}
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
                to={`/admin/edit-user/${params.id}`}
                variant="contained"
                component={NavLink}
                sx={{
                  fontSize: "14px",
                  textTransform: "capitalize",
                }}
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
    adminViewUsers(user.authToken, search, filter, page)
      .then((res) => {
        const { users, totalUsers } = res.data;
        const Users = users.map((user) => {
          return {
            id: user._id,
            role: `${textCapitalize(user.role)}`,
            avatar: user.avatar,
            name: `${textCapitalize(user.firstName)} ${textCapitalize(
              user.lastName
            )}`,
            email: user.email,
            gender: user.gender,
            contactNumber: user.contactNumber,
            address: user.address,
            age: calculateAge(user.dob),
          };
        });
        setIsLoading(false);
        setRowCount(totalUsers);
        setTableData(Users);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    setRefresh(false);
    // eslint-disable-next-line
  }, [refresh, search, filter, page]);

  const handelDelete = async (id) => {
    await adminDeleteUserDetails(user.authToken, id)
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
    <>
      {action === "delete" && (
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
      )}
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
          placeholder="Search by name or e-mail"
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
              <em>Fliter by role</em>
            </MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="trainer">Trainer</MenuItem>
            <MenuItem value="trainee">Trainee</MenuItem>
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

export default UserTable;
