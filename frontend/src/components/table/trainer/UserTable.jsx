import { useEffect, useState } from "react";
import { Avatar, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Link as NavLink } from "react-router-dom";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import { calculateAge } from "../../../utils/calculateAge";
import { stringToAvatar } from "../../../utils/generateAvatarLogo";
import { trainerViewTrainees } from "../../../apis/trainer";

function UserTable({ action }) {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();

  const columns = [
    { field: "id", headerName: "Id", hide: true, allowSearch: false },
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
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    { field: "gender", headerName: "Gender", flex: 1, allowSearch: false },
    { field: "age", headerName: "Age", flex: 1, allowSearch: false },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        if (action === "view") {
          return (
            <>
              <Button
                size="small"
                to={`/trainer/view-trainee/${params.id}`}
                variant="contained"
                component={NavLink}
                sx={{ fontSize: "12px", textTransform: "capitalize" }}
              >
                View
              </Button>
            </>
          );
        } else if (action === "assign") {
          return (
            <>
              <Button
                size="small"
                to={`/trainer/assign-workout/${params.id}`}
                variant="contained"
                component={NavLink}
                sx={{ fontSize: "12px", textTransform: "capitalize" }}
              >
                Assign Workout
              </Button>
            </>
          );
        } else if (action === "remove") {
          return (
            <>
              <Button
                size="small"
                color="error"
                to={`/trainer/remove-workout/${params.id}`}
                variant="contained"
                component={NavLink}
                sx={{ fontSize: "12px", textTransform: "capitalize" }}
              >
                Remove Workout
              </Button>
            </>
          );
        }
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    trainerViewTrainees(user.authToken)
      .then((res) => {
        const trainees = res.data.map((user) => {
          return {
            id: user._id,
            avatar: user.avatar,
            name: `${textCapitalize(user.firstName)} ${textCapitalize(
              user.lastName
            )}`,
            gender: user.gender,
            age: calculateAge(user.dob),
          };
        });
        setTableData(trainees);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  return (
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
  );
}

export default UserTable;
