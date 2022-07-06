import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  useTheme,
  Alert,
  Slide,
  Snackbar,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Link as NavLink } from "react-router-dom";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import { calculateAge } from "../../../utils/calculateAge";
import { stringToAvatar } from "../../../utils/generateAvatarLogo";
import { adminDeleteUserDetails, adminViewUsers } from "../../../apis/admin";

function UserTable({ action }) {
  const [tableData, setTableData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
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
    adminViewUsers(user.authToken)
      .then((res) => {
        const Users = res.data.map((user) => {
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
        setTableData(Users);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    setRefresh(false);
    // eslint-disable-next-line
  }, [refresh]);

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
        loading={isLoading}
      />
    </>
  );
}

export default UserTable;
